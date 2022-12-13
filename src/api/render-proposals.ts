import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Proposal, Result} from "../ton-vote-client";
import { verifySignature } from "../helpers";
import { StateManager } from "../model/manager";
import BN  from 'bn.js';

export function renderProposal(snapshot: StateSnapshot, proposalId: string) {
  return snapshot.Proposals[proposalId];
}

export function renderProposalResult(
  state: StateManager,
  snapshot: StateSnapshot,
  proposalId: string
) {
  if (!(proposalId in snapshot.Proposals)) {
    return {
      code: 400,
      body: `proposal ${proposalId} not exists`
    }
	}

	let proposal = snapshot.Proposals[proposalId];

	// proposal was ended and result was updated, no need to update result just return result
  if (proposalId in snapshot.Results && proposal.timestamp + proposal.duration < snapshot.Results[proposalId].timestamp) return snapshot.Results[proposalId];

	let result : Result = {
		daoId: snapshot.Proposals[proposalId].daoId,
		proposalId: proposalId,
		timestamp: Date.now(),
		percentage: calcResult(snapshot, proposalId)
	};

	state.updateResult(result, proposalId);
  return result;
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

export function insertNewProposal(
  state: StateManager,
  snapshot: StateSnapshot,
  proposal: Proposal
) {
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


function calcResult(snapshot: StateSnapshot, proposalId: string ) {

	let votes = Object.values(snapshot.Votes[proposalId]);
	let choices = Object.values(snapshot.Proposals[proposalId].choices);
	let result = new Array(choices.length).fill(new BN(0));

	for (let i = 0; i < votes.length; i++) {
		for (let j = 0; j < choices.length; j++) {
			// TODO: add validation
			// if (!(votes[i].votingPower)) ; // TODO: error
			// verify: weight < 1, votingPower is not null, selection[j] === choices[j]
			result[j] += new BN(votes[i].votingPower || 0).mul(new BN(votes[i].selection[j].weight));
			// .mul(votes[i].selection[j].weight)
		}
	}

	const sum = result.reduce((acc, item) => acc.add(item), new BN(0));
	return result.reduce((obj, item) => {
		obj[item] = item.div(sum).mult(100);
		return obj;
	}, {});
}
