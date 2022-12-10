import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Vote } from "../ton-vote-client";
import { StateManager } from "../model/manager";
import {verifySignature} from "../helpers";

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

export function submitVote(state: StateManager, vote: Vote) {
  if (!(vote.proposalId in snapshot.Propo)) {
    return {
      code: 404,
      body: `ProposalId ${vote.proposalId} not exist`,
    };
  }

  if (vote.voterSignature === null) {
    return {
      code: 400,
      body: "Missing voterSignature",
    };
  }

  let res = verifySignature(
      Object.assign({}, vote, { voterSignature: undefined }),
	    vote.voterSignature || "",
	    vote.voter
  );

	if (!res) {
	  return {
	    code: 400,
	    body: "Bad signature",
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
