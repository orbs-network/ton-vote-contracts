import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Proposal } from "../ton-vote-client";

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

export function renderNewProposal(snapshot: StateSnapshot, proposal: Proposal) {
  if (proposal.proposalId in snapshot.Proposals) {
    return {
      code: 403,
      body: `proposalId ${proposal.proposalId} already exists`,
    };
  }
  snapshot.Proposals.proposalId = proposal;

  return {
    code: 200,
    body: registerNewProposal(proposal),
  };
}

async function registerNewProposal(proposal: Proposal) {
  throw Error("Not Implemented");
  return true;
}
