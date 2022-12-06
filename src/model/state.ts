import _ from "lodash";
import fs from "fs";
import { EventTypes, ContractName } from "../ethereum/types";
import { getIpFromHex, toNumber, normalizeAddress } from "../helpers";
import { findAllEventsCoveringRange } from "./find";
import { defaultServiceConfiguration } from "../config";
import * as Logger from "../logger";
import {
  DaoMetadata,
  Proposal,
  Vote,
  Result,
  PublicKey,
  Strategy,
} from "../ton-vote-client";

const NUM_STANDBYS = 5;
const NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME = 1656399600; //breaking change time set
export { NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME };

export interface StateSnapshot {
  CurrentRefTime: number; // primary, everything is by time
  CurrentRefBlock: number;
  Daos: { [DaoId: string]: DaoMetadata };
  Proposals: { [ProposalId: string]: Proposal };
  Votes: { [ProposalId: string]: { [VoterId: PublicKey]: Vote } };
  Results: { [ProposalId: string]: Result };
  Strategies: { [strategyId: string]: Strategy };

  EventsStats: {
    LastUpdateBlock: number;
    TotalEventsProcessed: number;
    EventCount: {
      [EventName: string]: {
        Count: number;
      };
    };
  };
  PageStartRefTime: number;
  PageEndRefTime: number;
  CurrentCommittee: {
    EthAddress: string;
    Weight: number;
    IdentityType: number;
    Name: string;
    EnterTime: number;
    EffectiveStake: number;
  }[];
  CurrentCandidates: { EthAddress: string; IsStandby: boolean; Name: string }[];
  CurrentTopology: {
    EthAddress: string;
    OrbsAddress: string;
    Ip: string;
    Port: number;
    Name: string;
  }[]; // Port overridden by processor
  CommitteeSets: {
    RefTime: number; // primary
    RefBlock: number;
    CommitteeEthAddresses: string[];
  }[];
  CommitteeEvents: {
    RefTime: number; // primary
    RefBlock: number;
    Committee: CommitteeMember[];
  }[];
  LastPageCommitteeEvents: {
    RefTime: number; // primary
    RefBlock: number;
    Committee: CommitteeMember[];
  }[];
  LastCommitteeEvent: CommitteeMember[];
  CurrentEffectiveStake: { [EthAddress: string]: number }; // in ORBS
  CurrentDetailedStake: {
    [EthAddress: string]: {
      SelfStake: number; // in ORBS
      DelegatedStake: number; // in ORBS
    };
  };
  CurrentIp: { [EthAddress: string]: string };
  CurrentOrbsAddress: { [EthAddress: string]: string };
  CurrentElectionsStatus: {
    [EthAddress: string]: {
      LastUpdateTime: number;
      ReadyToSync: boolean;
      ReadyForCommittee: boolean;
      TimeToStale: number;
    };
  };
  CurrentRegistrationData: {
    [EthAddress: string]: {
      Name: string;
      Website: string;
      Metadata: { [Key: string]: string };
      RegistrationTime: number;
    };
  };
  CurrentCertification: {
    [EthAddress: string]: boolean;
  };
  CurrentVirtualChains: {
    [VirtualChainId: string]: {
      Expiration: number;
      RolloutGroup: string;
      IdentityType: number;
      Tier: string;
      GenesisRefTime: number;
      Owner: string;
      Name: string;
      Rate: string;
    };
  };
  SubscriptionEvents: {
    [VirtualChainId: string]: {
      RefTime: number;
      Data: {
        Status: "active" | "expired";
        Tier: string;
        RolloutGroup: string;
        IdentityType: number;
      };
    }[];
  };
  ProtocolVersionEvents: {
    [RolloutGroup: string]: {
      RefTime: number;
      Data: { Version: number };
    }[];
  };
  CurrentImageVersions: {
    [RolloutGroup: string]: { [ImageName: string]: string };
  };
  CurrentImageVersionsUpdater: {
    [RolloutGroup: string]: {
      [ImageName: string]: {
        LastPollTime: number;
        PendingVersion: string;
        PendingVersionTime: number;
      };
    };
  };
  CurrentContractAddress: { [t in ContractName]?: string };
  ContractAddressChanges: {
    RefTime: number;
    ContractName: ContractName;
    Address: string;
  }[];
  CurrentVersion: string;
}

export type StateConfiguration = {
  EthereumGenesisContract: string;
  ElectionsStaleUpdateSeconds: number;
};

export const defaultStateConfiguration: StateConfiguration = {
  EthereumGenesisContract: defaultServiceConfiguration.EthereumGenesisContract,
  ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
};

export class State {
  private snapshot: StateSnapshot = {
    CurrentRefTime: 0,
    CurrentRefBlock: 0,

    Daos: {},
    Proposals: {},
    Votes: {},
    Results: {},

    EventsStats: {
      LastUpdateBlock: 0,
      TotalEventsProcessed: 0,
      EventCount: {},
    },
    PageStartRefTime: 0,
    PageEndRefTime: 0,
    CurrentCommittee: [],
    CurrentCandidates: [],
    CurrentTopology: [],
    CommitteeSets: [],
    CommitteeEvents: [],
    LastPageCommitteeEvents: [],
    LastCommitteeEvent: [],
    CurrentEffectiveStake: {},
    CurrentDetailedStake: {},
    CurrentIp: {},
    CurrentOrbsAddress: {},
    CurrentElectionsStatus: {},
    CurrentRegistrationData: {},
    CurrentCertification: {},
    CurrentVirtualChains: {},
    SubscriptionEvents: {},
    ProtocolVersionEvents: {
      main: [],
      canary: [],
    },
    CurrentImageVersions: {
      main: {},
      canary: {},
    },
    CurrentImageVersionsUpdater: {
      main: {},
      canary: {},
    },
    CurrentContractAddress: {},
    ContractAddressChanges: [],
    CurrentVersion: "",
  };

  constructor(private config = defaultStateConfiguration) {
    this.snapshot.CurrentContractAddress["contractRegistry"] =
      config.EthereumGenesisContract;
    try {
      this.snapshot.CurrentVersion = fs
        .readFileSync("./version")
        .toString()
        .trim();
    } catch (err) {
      Logger.log(`Cound not find version: ${err.message}`);
    }
  }

  getSnapshot(): StateSnapshot {
    return this.snapshot;
  }

  applyNewTimeRef(time: number, block: number) {
    this.snapshot.CurrentRefTime = time;
    this.snapshot.CurrentRefBlock = block;
    this.snapshot.PageEndRefTime = time;

    // before any state changes
    const committeeEvent = calcNewCommitteeEvent(time, block, this.snapshot);
    const newCommitteeSet = calcCommitteeArraySet(committeeEvent.Committee);
    const prevCommitteeSet = calcCommitteeArraySet(
      this.snapshot.LastCommitteeEvent
    );

    // see if the committee has changed
    if (
      !_.isEqual(committeeEvent.Committee, this.snapshot.LastCommitteeEvent)
    ) {
      this.snapshot.CommitteeEvents.push(committeeEvent);
      updateLastPageCommitteeEvents(time, this.snapshot, committeeEvent);
      this.snapshot.LastCommitteeEvent = _.cloneDeep(committeeEvent.Committee);
    }

    // see if the committee set has changed
    if (
      !_.isEqual(
        stringArrToObj(newCommitteeSet),
        stringArrToObj(prevCommitteeSet)
      )
    ) {
      // ignore order
      this.snapshot.CommitteeSets.push({
        RefBlock: committeeEvent.RefBlock,
        RefTime: committeeEvent.RefTime,
        CommitteeEthAddresses: newCommitteeSet,
      });
    }

    // state sections with special business logic
    calcStaleElectionsUpdates(time, this.snapshot, this.config);
    this.snapshot.CurrentCandidates = calcCandidates(this.snapshot);
    this.snapshot.CurrentTopology = calcTopology(time, this.snapshot);
  }

  applyNewContractAddressUpdated(
    time: number,
    event: EventTypes["ContractAddressUpdated"]
  ) {
    this.snapshot.CurrentContractAddress[event.returnValues.contractName] =
      event.returnValues.addr;
    this.snapshot.ContractAddressChanges.push({
      RefTime: time,
      ContractName: event.returnValues.contractName,
      Address: event.returnValues.addr,
    });
  }

  applyNewCommitteeChange(time: number, event: EventTypes["CommitteeChange"]) {
    const EthAddress = normalizeAddress(event.returnValues.addr);
    this.snapshot.CurrentEffectiveStake[EthAddress] = orbitonsToOrbs(
      event.returnValues.weight
    );

    // current committee
    const previous = _.remove(
      this.snapshot.CurrentCommittee,
      (node) => node.EthAddress == EthAddress
    );
    if (event.returnValues.inCommittee) {
      this.snapshot.CurrentCommittee.push({
        EthAddress,
        Weight: 0,
        IdentityType: event.returnValues.certification ? 1 : 0,
        Name: this.snapshot.CurrentRegistrationData[EthAddress]?.Name ?? "",
        EnterTime: previous[0]?.EnterTime ?? time,
        EffectiveStake: this.snapshot.CurrentEffectiveStake[EthAddress],
      });
    }

    if (time < NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME) {
      fixCommitteeWeights(
        this.snapshot.CurrentCommittee,
        this.snapshot.CurrentEffectiveStake
      );
    } else {
      fixCommitteeWeightsNew(
        this.snapshot.CurrentCommittee,
        this.snapshot.CurrentEffectiveStake
      );
    }

    this.snapshot.CurrentCommittee = _.sortBy(
      this.snapshot.CurrentCommittee,
      (node) => node.EthAddress
    );
    this.snapshot.CurrentCommittee = _.sortBy(
      this.snapshot.CurrentCommittee,
      (node) => -1 * node.Weight
    );
  }

  applyNewStakeChanged(_time: number, event: EventTypes["StakeChanged"]) {
    const EthAddress = normalizeAddress(event.returnValues.addr);
    this.snapshot.CurrentEffectiveStake[EthAddress] = orbitonsToOrbs(
      event.returnValues.effectiveStake
    );
    if (this.snapshot.CurrentEffectiveStake[EthAddress] == 0) {
      delete this.snapshot.CurrentEffectiveStake[EthAddress];
    }
    this.snapshot.CurrentDetailedStake[EthAddress] = {
      SelfStake: orbitonsToOrbs(event.returnValues.selfDelegatedStake),
      DelegatedStake: orbitonsToOrbs(event.returnValues.delegatedStake),
    };
    if (
      this.snapshot.CurrentDetailedStake[EthAddress].SelfStake == 0 &&
      this.snapshot.CurrentDetailedStake[EthAddress].DelegatedStake == 0
    ) {
      delete this.snapshot.CurrentDetailedStake[EthAddress];
    }
  }

  applyNewGuardianDataUpdated(
    _time: number,
    event: EventTypes["GuardianDataUpdated"]
  ) {
    const EthAddress = normalizeAddress(event.returnValues.guardian);
    const OrbsAddress = normalizeAddress(event.returnValues.orbsAddr);
    const IpAddress = getIpFromHex(event.returnValues.ip);
    if (event.returnValues.isRegistered) {
      this.snapshot.CurrentOrbsAddress[EthAddress] = OrbsAddress;
      this.snapshot.CurrentIp[EthAddress] = IpAddress;
      this.snapshot.CurrentRegistrationData[EthAddress] = {
        Name: event.returnValues.name,
        Website: event.returnValues.website,
        Metadata:
          this.snapshot.CurrentRegistrationData[EthAddress]?.Metadata ?? {},
        RegistrationTime: toNumber(event.returnValues.registrationTime),
      };
    } else {
      delete this.snapshot.CurrentOrbsAddress[EthAddress];
      delete this.snapshot.CurrentIp[EthAddress];
      delete this.snapshot.CurrentRegistrationData[EthAddress];
    }
  }

  applyNewGuardianMetadataChanged(
    _time: number,
    event: EventTypes["GuardianMetadataChanged"]
  ) {
    const EthAddress = normalizeAddress(event.returnValues.guardian);
    const metadata =
      this.snapshot.CurrentRegistrationData[EthAddress]?.Metadata;
    if (metadata)
      metadata[event.returnValues.key] = event.returnValues.newValue;
  }

  applyNewGuardianStatusUpdated(
    time: number,
    event: EventTypes["GuardianStatusUpdated"]
  ) {
    const EthAddress = normalizeAddress(event.returnValues.guardian);
    this.snapshot.CurrentElectionsStatus[EthAddress] = {
      LastUpdateTime: time,
      ReadyToSync: event.returnValues.readyToSync,
      ReadyForCommittee: event.returnValues.readyForCommittee,
      TimeToStale: this.config.ElectionsStaleUpdateSeconds,
    };
  }

  applyNewGuardianCertificationUpdate(
    _time: number,
    event: EventTypes["GuardianCertificationUpdate"]
  ) {
    const EthAddress = normalizeAddress(event.returnValues.guardian);
    this.snapshot.CurrentCertification[EthAddress] =
      event.returnValues.isCertified;
  }

  applyNewSubscriptionChanged(
    time: number,
    event: EventTypes["SubscriptionChanged"]
  ) {
    const eventBody = {
      Tier: event.returnValues.tier,
      RolloutGroup: event.returnValues.deploymentSubset,
      IdentityType: event.returnValues.isCertified ? 1 : 0,
      GenesisRefTime: toNumber(event.returnValues.genRefTime),
      Owner: event.returnValues.owner,
      Name: event.returnValues.name,
      Rate: event.returnValues.rate,
    };
    this.snapshot.CurrentVirtualChains[event.returnValues.vcId] = {
      Expiration: toNumber(event.returnValues.expiresAt),
      ...eventBody,
    };
    const existingEvents =
      this.snapshot.SubscriptionEvents[event.returnValues.vcId] ?? [];
    const noFutureEvents = _.filter(
      existingEvents,
      (event) => event.RefTime <= time
    );
    noFutureEvents.push({
      RefTime: time,
      Data: { Status: "active", ...eventBody },
    });
    noFutureEvents.push({
      RefTime: toNumber(event.returnValues.expiresAt),
      Data: { Status: "expired", ...eventBody },
    });
    this.snapshot.SubscriptionEvents[event.returnValues.vcId] = noFutureEvents;
  }

  applyNewProtocolVersionChanged(
    time: number,
    event: EventTypes["ProtocolVersionChanged"]
  ) {
    const rolloutGroup = event.returnValues.deploymentSubset;
    const existingEvents = this.snapshot.ProtocolVersionEvents[rolloutGroup];
    const noFutureEvents = _.filter(
      existingEvents,
      (event) => event.RefTime <= time
    );
    noFutureEvents.push({
      RefTime: toNumber(event.returnValues.fromTimestamp),
      Data: { Version: toNumber(event.returnValues.nextVersion) },
    });
    this.snapshot.ProtocolVersionEvents[rolloutGroup] = noFutureEvents;
  }

  applyNewImageVersion(
    rolloutGroup: string,
    imageName: string,
    imageVersion: string
  ) {
    this.snapshot.CurrentImageVersions[rolloutGroup][imageName] = imageVersion;
  }

  applyNewImageVersionPollTime(
    time: number,
    rolloutGroup: string,
    imageName: string
  ) {
    const updaterStats = this.snapshot.CurrentImageVersionsUpdater[
      rolloutGroup
    ][imageName] ?? {
      LastPollTime: 0,
      PendingVersion: "",
      PendingVersionTime: 0,
    };
    this.snapshot.CurrentImageVersionsUpdater[rolloutGroup][imageName] = {
      ...updaterStats,
      LastPollTime: time,
    };
  }

  // defaults in place to show how to clear a pending update
  applyNewImageVersionPendingUpdate(
    rolloutGroup: string,
    imageName: string,
    pendingVersion = "",
    pendingTime = 0
  ) {
    const updaterStats = this.snapshot.CurrentImageVersionsUpdater[
      rolloutGroup
    ][imageName] ?? {
      LastPollTime: 0,
      PendingVersion: "",
      PendingVersionTime: 0,
    };
    this.snapshot.CurrentImageVersionsUpdater[rolloutGroup][imageName] = {
      ...updaterStats,
      PendingVersion: pendingVersion,
      PendingVersionTime: pendingTime,
    };
  }

  applyNewEventsProcessed(block: number, events: string[]) {
    if (block <= this.snapshot.EventsStats.LastUpdateBlock) {
      Logger.error(
        ` applyEventsStats : already applied stats for block ${block}, events count ${events}  `
      );
    }
    events.map((eventName) => {
      const count = this.snapshot.EventsStats.EventCount[eventName]?.Count ?? 0;
      this.snapshot.EventsStats.EventCount[eventName] = {
        Count: count + 1,
      };
    });
    this.snapshot.EventsStats.TotalEventsProcessed += events.length;
  }
}

type CommiteeNodes = { EthAddress: string; Weight: number; Name: string }[];
type CandidateNodes = {
  EthAddress: string;
  IsStandby: boolean;
  Name: string;
}[];
type TopologyNodes = {
  EthAddress: string;
  OrbsAddress: string;
  Ip: string;
  Port: number;
  Name: string;
}[];
type CommitteeMember = {
  EthAddress: string;
  OrbsAddress: string;
  Weight: number;
  IdentityType: number;
  EffectiveStake: number;
};

type CommiteeEvent = {
  RefTime: number;
  RefBlock: number;
  Committee: CommitteeMember[];
};

function calcCandidates(snapshot: StateSnapshot): CandidateNodes {
  const allRegistered = _.clone(snapshot.CurrentOrbsAddress);
  for (const EthAddress of Object.keys(allRegistered)) {
    if (!snapshot.CurrentElectionsStatus[EthAddress]?.ReadyToSync)
      delete allRegistered[EthAddress];
  }
  for (const node of snapshot.CurrentCommittee)
    delete allRegistered[node.EthAddress];
  let res = Object.keys(allRegistered).map((EthAddress) => {
    return {
      EthAddress,
      IsStandby: false,
      Name: snapshot.CurrentRegistrationData[EthAddress]?.Name ?? "",
    };
  });
  res = _.sortBy(res, (node) => node.EthAddress);
  res = _.sortBy(
    res,
    (node) => -1 * snapshot.CurrentEffectiveStake[node.EthAddress] ?? 0
  );
  res = _.sortBy(res, (node) =>
    snapshot.CurrentElectionsStatus[node.EthAddress]?.TimeToStale > 0 ? 1 : 2
  );
  for (let i = 0; i < Math.min(NUM_STANDBYS, res.length); i++)
    res[i].IsStandby = true;
  return res;
}

function calcTopology(time: number, snapshot: StateSnapshot): TopologyNodes {
  const inTopology: { [EthAddress: string]: boolean } = {}; // EthAddress -> true

  // take all committee members in last 12 hours
  const committeesInLast12Hours = findAllEventsCoveringRange(
    snapshot.CommitteeEvents,
    time - 12 * 60 * 60,
    time
  );
  for (const committeeEvent of committeesInLast12Hours) {
    const commitee = (committeeEvent as CommiteeEvent).Committee;
    for (const node of commitee as { EthAddress: string }[]) {
      inTopology[node.EthAddress] = true;
    }
  }

  // take last standbys
  for (const node of snapshot.CurrentCandidates) {
    if (node.IsStandby) inTopology[node.EthAddress] = true;
  }

  // done
  const res = Object.keys(inTopology).map((EthAddress) => ({
    EthAddress,
    OrbsAddress: snapshot.CurrentOrbsAddress[EthAddress],
    Ip: snapshot.CurrentIp[EthAddress],
    Port: 0,
    Name: snapshot.CurrentRegistrationData[EthAddress]?.Name ?? "",
  }));

  // remove nodes with missing OrbsAddress or Ip (not supposed to happen)
  _.remove(res, ({ OrbsAddress, Ip }) => !OrbsAddress || !Ip);

  return _.sortBy(res, (node) => node.EthAddress);
}

function fixCommitteeWeights(
  committee: CommiteeNodes,
  stake: { [EthAddress: string]: number }
): void {
  const totalStake = _.sum(
    _.map(committee, (node) => stake[node.EthAddress] ?? 0)
  );
  for (const node of committee) {
    node.Weight = Math.max(
      stake[node.EthAddress] ?? 0,
      Math.round(totalStake / committee.length)
    );
  }
}

function fixCommitteeWeightsNew(
  committee: CommiteeNodes,
  stake: { [EthAddress: string]: number }
): void {
  const totalStake = _.sum(
    _.map(committee, (node) => stake[node.EthAddress] ?? 0)
  );
  for (const node of committee) {
    node.Weight = Math.max(
      stake[node.EthAddress] ?? 0,
      Math.round(totalStake / ((2 / 3) * committee.length))
    );
  }
}

function orbitonsToOrbs(stake: string): number {
  return Number(BigInt(stake) / BigInt(1e18));
}

function calcNewCommitteeEvent(
  time: number,
  block: number,
  snapshot: StateSnapshot
): CommiteeEvent {
  return {
    RefTime: time,
    RefBlock: block,
    Committee: snapshot.CurrentCommittee.map(
      ({ EthAddress, Weight, IdentityType, EffectiveStake }) => ({
        EthAddress,
        OrbsAddress: snapshot.CurrentOrbsAddress[EthAddress],
        Weight,
        IdentityType,
        EffectiveStake,
      })
    ),
  };
}

function updateLastPageCommitteeEvents(
  time: number,
  snapshot: StateSnapshot,
  committee: CommiteeEvent
) {
  snapshot.LastPageCommitteeEvents.push(committee);
  const oldestTime = time - 24 * 60 * 60; // last page currently 24 hours or at least one event
  while (
    snapshot.LastPageCommitteeEvents.length > 1 &&
    snapshot.LastPageCommitteeEvents[0].RefTime < oldestTime
  ) {
    snapshot.LastPageCommitteeEvents.shift();
  }
}

function stringArrToObj(arr: string[]): { [k: string]: boolean } {
  const result: { [k: string]: boolean } = {};
  arr.forEach((value) => {
    result[value] = true;
  });
  return result;
}

function calcCommitteeArraySet(member: CommitteeMember[]): string[] {
  return member.map((m) => m.EthAddress);
}

function calcStaleElectionsUpdates(
  time: number,
  snapshot: StateSnapshot,
  config: StateConfiguration
) {
  // check who's stale
  for (const status of Object.values(snapshot.CurrentElectionsStatus)) {
    status.TimeToStale =
      config.ElectionsStaleUpdateSeconds - (time - status.LastUpdateTime);
    if (status.TimeToStale < 0) status.TimeToStale = 0;
    if (status.ReadyToSync != true) status.TimeToStale = 0;
  }

  // all committee members are always not stale
  for (const node of snapshot.CurrentCommittee) {
    if (snapshot.CurrentElectionsStatus[node.EthAddress]) {
      snapshot.CurrentElectionsStatus[node.EthAddress].TimeToStale =
        config.ElectionsStaleUpdateSeconds;
    }
  }
}
