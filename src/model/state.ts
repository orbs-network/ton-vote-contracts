import _ from "lodash";
import fs, { readFileSync } from 'fs'
import * as Logger from "../logger";
import {
  DaoMetadata,
  Proposal,
  Vote,
  Result,
  PublicKey,
  Strategy,
} from "../ton-vote-client";
import { writeFile } from "../helpers";
import * as crypto from "crypto";


export interface StateSnapshot {
  Daos: { [DaoId: string]: DaoMetadata };
  Proposals: { [ProposalId: string]: Proposal };
  Votes: { [ProposalId: string]: { [VoterId in PublicKey]: Vote } };
  Results: { [ProposalId: string]: Result };
  Strategies: { [strategyId: string]: Strategy };
  CurrentVersion: string;
}

export type StateConfiguration = {
  DaosJsonPath: string;
  ProposalsJsonPath: string;
  VotesJsonPath: string;
  ResultsJsonPath: string;
  StrategiesJsonPath: string;
};

export const defaultStateConfiguration: StateConfiguration = {
  DaosJsonPath: "./db/daos.json",
  ProposalsJsonPath: "./db/proposals.json",
  VotesJsonPath: "./db/votes.json",
  ResultsJsonPath: "./db/results.json",
  StrategiesJsonPath: "./db/strategies.json",
};

export class State {
  private snapshot: StateSnapshot = {
    Daos: {},
    Proposals: {},
    Votes: {},
    Results: {},
    Strategies: {},
    CurrentVersion: "",
  };

  constructor(private config = defaultStateConfiguration) {
    this.loadSnapshot(config);

    // try {
    // } catch (err) {
    //   Logger.log(`Failed to load snapshot: ${err.message}`);
    // }

  }

  loadSnapshot(config = defaultStateConfiguration) {

    this.snapshot.CurrentVersion = fs
      .readFileSync("./version")
      .toString()
      .trim();

    this.snapshot.Daos = JSON.parse(readFileSync(config.DaosJsonPath).toString());
    this.snapshot.Proposals = JSON.parse(readFileSync(config.ProposalsJsonPath).toString());
    this.snapshot.Votes = JSON.parse(readFileSync(config.VotesJsonPath).toString());
    this.snapshot.Results = JSON.parse(readFileSync(config.ResultsJsonPath)?.toString());
    this.snapshot.Strategies = JSON.parse(readFileSync(config.StrategiesJsonPath)?.toString());
  }

  getSnapshot(): StateSnapshot {
    return this.snapshot;
  }

  getNewId(keys: string[]) {
    const ids = keys.map((id) => Number(id));
    return ids.length === 0 ? "0" : String(Math.max(...ids) + 1);
  }

  // TODO: sort objects before write
  insertDao(daoMetadata: DaoMetadata) {
    daoMetadata.daoId = crypto.randomBytes(16).readUInt16BE().toString();
    this.snapshot.Daos[daoMetadata.daoId] = daoMetadata;
    writeFile(this.config.DaosJsonPath, this.snapshot.Daos);
    return daoMetadata.daoId;
  }

  updateDao(daoMetadata: DaoMetadata) {
    if (daoMetadata.daoId === null) {
      Logger.log(`daoId should be provided`);
      return false;
    }

    if (!(daoMetadata.daoId in this.snapshot.Daos)) {
      Logger.log(`daoId ${daoMetadata.daoId} was not found`);
      return false;
    }

    this.snapshot.Daos[daoMetadata.daoId] = daoMetadata;
    writeFile(this.config.DaosJsonPath, this.snapshot.Daos);
    return true;
  }

  insertNewProposal(proposal: Proposal) {
    proposal.proposalId = crypto.randomBytes(16).readUInt16BE().toString(); // this.getNewId(Object.keys(this.snapshot.Proposals));
    this.snapshot.Proposals[proposal.proposalId] = proposal;
    writeFile(this.config.ProposalsJsonPath, this.snapshot.Proposals);
    return proposal.proposalId;
  }

  submitVote(vote: Vote) {
    if (!(vote.proposalId in this.snapshot.Votes)) {
      this.snapshot.Votes[vote.proposalId] = {};
    }

    Object.assign(this.snapshot.Votes[vote.proposalId], { [vote.voter]: vote })
    writeFile(this.config.VotesJsonPath, this.snapshot.Votes);
    return vote.voter;
  }

  updateResult(result: Result, proposalId: string) {
    this.snapshot.Results[proposalId] = result;
    writeFile(this.config.ResultsJsonPath, this.snapshot.Results);
  }
}
