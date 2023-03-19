"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitVote = exports.renderVotes = void 0;
const helpers_1 = require("../helpers");
const jetton_wallet_1 = require("../strategies/jetton-wallet");
function renderVotes(snapshot, proposalId) {
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
exports.renderVotes = renderVotes;
function submitVote(state, snapshot, vote) {
    return __awaiter(this, void 0, void 0, function* () {
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
        if (
        // TODO: FIXME
        (0, helpers_1.verifySignature)(
        // !verifySignature(
        Object.assign({}, vote, { voterSignature: undefined }), vote.voterSignature || "", vote.voter)) {
            return {
                code: 400,
                body: "Bad signature",
            };
        }
        let [ok, res] = verifyVoteParams(snapshot, vote);
        console.log(res);
        if (!ok) {
            return {
                code: 400,
                body: res,
            };
        }
        [ok, res] = yield getVotingPower(snapshot, vote); // TODO: FIXME error codes
        if (!ok) {
            return {
                code: 400,
                body: res,
            };
        }
        vote.votingPower = res;
        state.submitVote(vote);
        return {
            code: 200,
            body: vote.votingPower,
        };
    });
}
exports.submitVote = submitVote;
function verifyVoteParams(snapshot, vote) {
    console.log(snapshot.Proposals[vote.proposalId]);
    switch (snapshot.Proposals[vote.proposalId].votingType) {
        case "single":
        case "basic":
            // should have 1 selection
            if (vote.selection.length != 1)
                return [
                    false,
                    "incorrect selection length, on single and basic votes length should be 1",
                ];
            // selection should be choosen from proposal's choices and should have weight 100 (exactly 1 selection from the list)
            if (!snapshot.Proposals[vote.proposalId].choices.find((obj) => obj.choiceId == vote.selection[0].choiceId &&
                vote.selection[0].weight === 100))
                return [false, `wrong selection for proposal id ${vote.proposalId}`];
            return [true, ""];
        default:
            return [false, "not supported"];
    }
}
function getVotingPower(snapshot, vote) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: multicall
        console.log('getVotingPower');
        switch (snapshot.Proposals[vote.proposalId].strategyId) {
            case "jetton-wallet":
                return yield (0, jetton_wallet_1.jettonWalletBalance)(snapshot, vote);
            case "test-only":
                console.log('test-only here');
                return [true, Math.floor(Math.random() * 100).toString()];
            default:
                return [false, "not supported voting power strategy"];
        }
        // return [false, "unexpected error while calculating voting power"];
    });
}
