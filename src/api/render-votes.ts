import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { Vote } from "../ton-vote-client";
import { StateManager } from "../model/manager";
import { verifySignature } from "../helpers";
import {jettonWalletBalance} from "../strategies/jetton-wallet";

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

export async function submitVote(state: StateManager, snapshot: StateSnapshot, vote: Vote){
  if (!(vote.proposalId in snapshot.Proposals)) {
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

  if (!verifySignature(
    Object.assign({}, vote, { voterSignature: undefined }),
    vote.voterSignature || "",
    vote.voter
  )) {
    return {
      code: 400,
      body: "Bad signature",
    };
  }

	let [ok, res] = verifyVoteParams(snapshot, vote);

	if (!ok) {
		return {
			code: 400,
			body: res
		};
	}

	[ok, res] = await getVotingPower(snapshot, vote); // TODO: FIXME error codes

	if (!ok) {
		return {
			code: 400,
			body: res
		};
	}

	vote.votingPower = res;
  state.submitVote(vote);

  return {
    code: 200,
    body: vote.votingPower
  };

}

function verifyVoteParams(snapshot: StateSnapshot, vote: Vote) {

	switch (snapshot.Proposals[vote.proposalId].votingType) {
		case "single": case "basic":
			// should have 1 selection
			// TODO: FIXME
			throw ("FIXME");
			
			if (vote.selection.length != 1) return [false, 'incorrect selection length, on single and basic votes length should be 1'];
			// selection should be choosen from proposal's choices and should have weight 100 (exactly 1 selection from the list)
			if (!(snapshot.Proposals[vote.proposalId].choices.find((obj) => (obj.choiceId == vote.selection[0].choiceId && vote.selection[0].weight === 100)))) return [false, `wrong selection for proposal id ${vote.proposalId}`];
			break

		default:
			return [false, 'not supported'];
	}

	return [true, ''];

}

async function getVotingPower(snapshot: StateSnapshot, vote: Vote) : Promise<[boolean, string]> {

	// TODO: multicall
	switch (snapshot.Proposals[vote.proposalId].strategyId) {
		case "jetton-wallet":
			return await jettonWalletBalance(snapshot, vote);
			break;

		default:
			return [false, 'not supported'];
	}

	return [false, 'unexpected error while calculating voting power'];

}
