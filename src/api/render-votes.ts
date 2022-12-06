import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Vote } from "../ton-vote-client";

export function renderVotes(snapshot: StateSnapshot, proposalId: string) {
  if (!(proposalId in snapshot.Votes)) {
    return {
      code: 404,
      body: `proposalId ${proposalId} not found`,
    };
  }

  return {
    code: 200,
    body: Object.values(snapshot.Votes[proposalId]),
  };
}

export function submitVote(snapshot: StateSnapshot, vote: Vote) {
  if (!(vote.proposalId in snapshot.Votes)) {
    return {
      code: 404,
      body: `ProposalId ${vote.proposalId} not exist`,
    };
  }

  snapshot.Votes[vote.proposalId][vote.voter] = vote;

  return {
    code: 201,
    body: updateVote(vote),
  };
}

async function updateVote(vote: Vote) {
  throw Error("Not Implemented");
}
