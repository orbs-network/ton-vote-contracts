"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const helpers_1 = require("./helpers");
const ton_1 = require("ton");
const ton_access_1 = require("@orbs-network/ton-access");
const proposal_1 = require("./proposal");
const config_1 = require("./config");
const process = __importStar(require("process"));
const MIN_TON = 0.1;
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new ton_1.TonClient({ endpoint: yield (0, ton_access_1.getHttpEndpoint)() });
        const contract = proposal_1.Proposal.create(config_1.START_EPOCH, config_1.END_EPOCH, config_1.SNAPSHOT_EPOCH);
        let deployWalletKey = yield (0, helpers_1.initDeployKey)("");
        let deployWallet = yield (0, helpers_1.initWallet)(client, deployWalletKey.publicKey);
        if (yield client.isContractDeployed(contract.address)) {
            console.log(`contract: ${contract.address.toFriendly()} already Deployed`);
            return contract;
        }
        const balance = yield client.getBalance(deployWallet.address);
        if (balance.lte((0, ton_1.toNano)(MIN_TON))) {
            throw `insufficient funds to deploy single contract wallet have only ${balance}`;
        }
        const seqno = yield deployWallet.getSeqNo();
        const transfer = deployWallet.createTransfer({
            secretKey: deployWalletKey.secretKey,
            seqno: seqno,
            sendMode: 1 + 2,
            order: new ton_1.InternalMessage({
                to: contract.address,
                value: (0, ton_1.toNano)(MIN_TON),
                bounce: false,
                body: new ton_1.CommonMessageInfo({
                    stateInit: new ton_1.StateInit({ data: contract.source.initialData, code: contract.source.initialCode }),
                    body: null,
                }),
            }),
        });
        yield client.sendExternalMessage(deployWallet, transfer);
        let isDeployed = yield (0, helpers_1.waitForContractToBeDeployed)(client, contract.address);
        if (!isDeployed) {
            throw `sfailed to deploy contract`;
        }
        console.log(`- Deploy transaction sent successfully to -> ${contract.address.toFriendly()} [seqno:${seqno}]`);
        yield (0, helpers_1.sleep)(10000);
        return contract;
    });
}
deploy()
    .then(() => {
    console.log("Done");
    process.exit(0);
})
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
