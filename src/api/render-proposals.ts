import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Proposal } from "../ton-vote-client";
import {verifySignature} from "../helpers";
import { StateManager } from "../model/manager";

export function renderProposal(snapshot: StateSnapshot, proposalId: string) {
  return snapshot.Proposals[proposalId];
}

export function renderProposalResult(
  snapshot: StateSnapshot,
  proposalId: string
) {
  if (proposalId in snapshot.Results) return snapshot.Results[proposalId];

  throw new Error("Not Implemented");
  return snapshot.Results[proposalId];
}

export function renderActiveProposals(snapshot: StateSnapshot, daoId: string) {
  _.filter(
    snapshot.Proposals,
    (proposal) =>
      daoId in proposal && proposal.timestamp + proposal.duration < Date.now()
  );
}

export function renderEndedProposals(snapshot: StateSnapshot, daoId: string) {
  _.filter(
    snapshot.Proposals,
    (proposal) =>
      daoId in proposal && proposal.timestamp + proposal.duration >= Date.now()
  );
}

export function insertNewProposal(state: StateManager, snapshot: StateSnapshot, proposal: Proposal) {

  if (!(proposal.daoId in snapshot.Daos)) {
    return {
      code: 400,
      body: `daoId ${proposal.daoId} was not found`,
    };
  }

  let res = verifySignature(
      Object.assign({}, proposal, { proposerSignature: undefined }),
	    proposal.proposerSignature,
	    proposal.proposer
  );

	if (!res) {
	  return {
	    code: 400,
	    body: "Bad signature",
	  };
	}

	const newProposalId = state.insertNewProposal(proposal);

  return {
    code: 200,
    body: newProposalId,
  };

}

