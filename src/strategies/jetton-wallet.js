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
exports.jettonWalletBalance = void 0;
const ton_gateway_1 = require("@orbs-network/ton-gateway");
const ton_1 = require("ton");
function jettonWalletBalance(snapshot, vote) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = yield (0, ton_gateway_1.getHttpEndpoint)();
        const client4 = new ton_1.TonClient4({ endpoint });
        let res = yield client4.runMethod(snapshot.Proposals[vote.proposalId].snapshotLogicalTime, ton_1.Address.parse(vote.voter), "get_wallet_address");
        if (res.exitCode !== 0) {
            return [false, "failed to get jetton wallet address"];
        }
        const voterJettonWalletAddress = (0, ton_1.serializeStack)(res.result).toString();
        res = yield client4.runMethod(snapshot.Proposals[vote.proposalId].snapshotLogicalTime, ton_1.Address.parse(voterJettonWalletAddress), "get_wallet_data");
        if (res.exitCode !== 0) {
            return [false, "failed to get jetton wallet data"];
        }
        // TODO: fixme
        const voterJettonWalletData = (0, ton_1.serializeStack)(res.result).toString();
        return [true, voterJettonWalletData];
    });
}
exports.jettonWalletBalance = jettonWalletBalance;
