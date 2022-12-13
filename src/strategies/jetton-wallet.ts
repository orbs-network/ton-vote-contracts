import { getHttpEndpoint } from "@orbs-network/ton-gateway";
import { Vote } from "../ton-vote-client";
import { TonClient4, Address, serializeStack } from "ton";
import { StateSnapshot } from "../model/state";

export async function jettonWalletBalance(snapshot: StateSnapshot, vote: Vote) : Promise<[boolean, string]> {
	const endpoint = await getHttpEndpoint();

	const client4 = new TonClient4({ endpoint });
	let res = await client4.runMethod(snapshot.Proposals[vote.proposalId].snapshotLogicalTime, Address.parse(vote.voter), 'get_wallet_address');

	if (res.exitCode !== 0) {
		return [false, 'failed to get jetton wallet address'];
	}

	const voterJettonWalletAddress = serializeStack(res.result).toString();

	res = await client4.runMethod(snapshot.Proposals[vote.proposalId].snapshotLogicalTime, Address.parse(voterJettonWalletAddress), 'get_wallet_data');

	if (res.exitCode !== 0) {
		return [false, 'failed to get jetton wallet data'];
	}

	// TODO: fixme
	const voterJettonWalletData = serializeStack(res.result).toString();

	return [true, voterJettonWalletData];
}
