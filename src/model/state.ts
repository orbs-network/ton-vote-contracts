import _ from "lodash";
import fs from "fs";
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

export interface StateSnapshot {
  Daos: { [DaoId: string]: DaoMetadata };
  Proposals: { [ProposalId: string]: Proposal };
  Votes: { [ProposalId: string]: { [VoterId: PublicKey]: Vote } };
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
    CurrentVersion: ''
  };

  constructor(private config = defaultStateConfiguration) {
    try {
      this.snapshot.CurrentVersion = fs
        .readFileSync("./version")
        .toString()
        .trim();
    } catch (err : any) {
      Logger.log(`Cound not find version: ${err.message}`);
    }
  }

  getSnapshot(): StateSnapshot {
    return this.snapshot;
  }

  getNewId(keys: string[]) {
    const ids = keys.map((id) => Number(id));
    return ids.length === 0 ? "0" : String(Math.max(...ids) + 1);
  }

  insertDao(daoMetadata: DaoMetadata) {
    daoMetadata.daoId = this.getNewId(Object.keys(this.snapshot.Daos));
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
    proposal.proposalId = this.getNewId(Object.keys(this.snapshot.Proposals));
    this.snapshot.Proposals[proposal.proposalId] = proposal;
    writeFile(this.config.ProposalsJsonPath, this.snapshot.Proposals);
    return proposal.proposalId;
  }

  submitVote(vote: Vote) {
    if (vote.proposalId in this.snapshot.Votes) {
	    this.snapshot.Votes[vote.proposalId] = {};
    }
    this.snapshot.Votes[vote.proposalId][vote.voter] = vote;
    writeFile(this.config.VotesJsonPath, this.snapshot.Votes);
    return vote.voter;
  }

	updateResult(result: Result, proposalId: string) {
    this.snapshot.Results[proposalId] = result;
    writeFile(this.config.ResultsJsonPath, this.snapshot.Results);
	}

}
