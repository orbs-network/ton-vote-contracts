import { EventData } from "web3-eth-contract";
import { State, StateSnapshot, StateConfiguration } from "./state";
import { EventTypes } from "../ethereum/types";
import { DaoMetadata, Proposal } from "../ton-vote-client";

export class StateManager {
  private current: State;

  applyNewEvents(block: number, time: number, events: EventData[]) {
    for (const event of events) {
      switch (event.event) {
        case "ContractAddressUpdated":
          this.current.applyNewContractAddressUpdated(
            time,
            event as EventTypes["ContractAddressUpdated"]
          );
          break;
        case "CommitteeChange":
          this.current.applyNewCommitteeChange(
            time,
            event as EventTypes["CommitteeChange"]
          );
          break;
        case "SubscriptionChanged":
          this.current.applyNewSubscriptionChanged(
            time,
            event as EventTypes["SubscriptionChanged"]
          );
          break;
        case "ProtocolVersionChanged":
          this.current.applyNewProtocolVersionChanged(
            time,
            event as EventTypes["ProtocolVersionChanged"]
          );
          break;
        case "GuardianDataUpdated":
          this.current.applyNewGuardianDataUpdated(
            time,
            event as EventTypes["GuardianDataUpdated"]
          );
          break;
        case "GuardianStatusUpdated":
          this.current.applyNewGuardianStatusUpdated(
            time,
            event as EventTypes["GuardianStatusUpdated"]
          );
          break;
        case "StakeChanged":
          this.current.applyNewStakeChanged(
            time,
            event as EventTypes["StakeChanged"]
          );
          break;
        case "GuardianMetadataChanged":
          this.current.applyNewGuardianMetadataChanged(
            time,
            event as EventTypes["GuardianMetadataChanged"]
          );
          break;
        case "GuardianCertificationUpdate":
          this.current.applyNewGuardianCertificationUpdate(
            time,
            event as EventTypes["GuardianCertificationUpdate"]
          );
          break;
      }
    }
    this.current.applyNewEventsProcessed(
      block,
      events.map((e) => e.event)
    );
  }

  constructor(private config: StateConfiguration) {
    this.current = new State(this.config);
  }

  insertDao(daoMetadata: DaoMetadata) {
    return this.current.insertDao(daoMetadata);
  }

  updateDao(daoMetadata: DaoMetadata) {
    return this.current.updateDao(daoMetadata);
  }

  insertNewProposal(proposal: Proposal) {
    return this.current.insertNewProposal(proposal);
  }

  applyNewTimeRef(time: number, block: number) {
    this.current.applyNewTimeRef(time, block);
  }

  applyNewImageVersion(
    rolloutGroup: string,
    imageName: string,
    imageVersion: string
  ) {
    this.current.applyNewImageVersion(rolloutGroup, imageName, imageVersion);
  }

  applyNewImageVersionPollTime(
    time: number,
    rolloutGroup: string,
    imageName: string
  ) {
    this.current.applyNewImageVersionPollTime(time, rolloutGroup, imageName);
  }

  applyNewImageVersionPendingUpdate(
    rolloutGroup: string,
    imageName: string,
    pendingVersion = "",
    pendingTime = 0
  ) {
    this.current.applyNewImageVersionPendingUpdate(
      rolloutGroup,
      imageName,
      pendingVersion,
      pendingTime
    );
  }

  getCurrentSnapshot(): StateSnapshot {
    return this.current.getSnapshot();
  }

  getHistoricSnapshot(containingTime: number): StateSnapshot {
    const latestAvailableRefTime = this.current.getSnapshot().CurrentRefTime;
    if (latestAvailableRefTime < containingTime) {
      throw new Error(
        `Latest available RefTime ${latestAvailableRefTime} is earlier than requested time ${containingTime}.`
      );
    }
    // TODO: improve to a more efficient implementation that only returns a subset of events
    return this.current.getSnapshot();
  }
}
