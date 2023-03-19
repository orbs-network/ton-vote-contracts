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
const helpers_1 = require("./helpers");
const ton_1 = require("ton");
const chai_1 = require("chai");
const buffer_1 = require("buffer");
const ton_access_1 = require("@orbs-network/ton-access");
const BLOCK_TIME = 10000;
const DEPLOYER_MIN_TON = 1;
const SEND_MSG_VALUE = .1;
const OP_NEW_DAO = 0x1;
function buildMessage(op, query_id, eitherBit = false, amount = 0) {
    if (op == null)
        return (0, ton_1.beginCell)().endCell();
    let cell = (0, ton_1.beginCell)()
        .storeUint(op, 32)
        .storeUint(query_id, 64)
        .storeCoins((0, ton_1.toNano)(amount.toFixed(2)))
        .storeUint(0, 256) // validator_pubkey
        .storeUint(0, 32) // stake_at
        .storeUint(0, 32) // max_factor
        .storeUint(0, 256); // adnl_addr
    if (eitherBit) {
        cell.storeRef((0, ton_1.beginCell)().storeUint(0, 256).endCell()); // signature
    }
    return cell.endCell();
}
function parseTxDetails(data) {
    const currentContract = data["inMessage"]["destination"];
    let boc = ton_1.Cell.fromBoc(buffer_1.Buffer.from(data.data, "base64"));
    const wc = ton_1.Address.parse(currentContract.toString()).workChain;
    return (0, ton_1.parseTransaction)(wc, boc[0].beginParse());
}
function deployContract(client, walletContract, privateKey, contract_class, contractParams = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        let contract = contract_class.fromInit(...Object.values(contractParams));
        if (yield client.isContractDeployed(contract.address)) {
            console.log(`contract: ${contract.address.toFriendly()} already Deployed`);
            return contract;
        }
        const seqno = yield walletContract.getSeqNo();
        const transfer = walletContract.createTransfer({
            secretKey: privateKey,
            seqno: seqno,
            sendMode: 1 + 2,
            order: new ton_1.InternalMessage({
                to: contract.address,
                value: (0, ton_1.toNano)(0.5),
                bounce: false,
                body: new ton_1.CommonMessageInfo({
                    stateInit: new ton_1.StateInit({ data: contract.source.initialData, code: contract.source.initialCode }),
                    body: null,
                }),
            }),
        });
        yield client.sendExternalMessage(walletContract, transfer);
        yield (0, helpers_1.waitForContractToBeDeployed)(client, contract.address);
        console.log(`- Deploy transaction sent successfully (registry contract) to -> ${contract.address.toFriendly()} [seqno:${seqno}]`);
        yield (0, helpers_1.sleep)(BLOCK_TIME);
        return contract;
    });
}
function sendMsg(client, walletContract, privateKey, dest, msg_value, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let seqno = yield walletContract.getSeqNo();
        console.log(`send message to ${dest.toFriendly()}`);
        const transfer = walletContract.createTransfer({
            secretKey: privateKey,
            seqno: seqno,
            sendMode: 1 + 2,
            order: new ton_1.InternalMessage({
                to: dest,
                value: (0, ton_1.toNano)(msg_value),
                bounce: true,
                body: new ton_1.CommonMessageInfo({
                    body: new ton_1.CellMessage(payload)
                }),
            }),
        });
        try {
            yield client.sendExternalMessage(walletContract, transfer);
        }
        catch (e) {
            return false;
        }
        console.log(`- transaction sent successfully to ${dest.toFriendly()} [wallet seqno:${seqno}]`);
        yield (0, helpers_1.sleep)(BLOCK_TIME);
        return true;
    });
}
describe("e2e test suite", () => {
    let balance;
    let newBalance;
    let res;
    //   let registryContract: Registry;
    //   let daoContract: Dao;
    let proposalDeployerContract;
    let deployWallet;
    let deployWalletKey;
    let payload;
    let client;
    let daoSettings;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        const endpoint = yield (0, ton_access_1.getHttpEndpoint)({ network: "testnet" });
        client = new ton_1.TonClient({ endpoint });
        deployWalletKey = yield (0, helpers_1.initDeployKey)("");
        deployWallet = yield (0, helpers_1.initWallet)(client, deployWalletKey.publicKey);
        console.log(`deployer contract address: ${deployWallet.address.toFriendly()}`);
        balance = parseFloat((0, ton_1.fromNano)((yield client.getBalance(deployWallet.address)).toNumber()));
        if (balance < DEPLOYER_MIN_TON) {
            throw `Deploy wallet balance is too small (${balance}), please send at least ${DEPLOYER_MIN_TON} coins to ${deployWallet.address.toFriendly()}`;
        }
    }));
    it("Deploy Registry contract", () => __awaiter(void 0, void 0, void 0, function* () {
        registryContract = yield deployContract(client, deployWallet, deployWalletKey.secretKey, Registry);
    }));
    it.only("Deploy proposal deployer contract", () => __awaiter(void 0, void 0, void 0, function* () {
        let proposalDeployer_id = 0;
        let next_child_id = 0;
        proposalDeployerContract = yield deployContract(client, deployWallet, deployWalletKey.secretKey, proposalDeployerContract, { owner: deployWallet.address });
        res = yield client.callGetMethod(proposalDeployerContract.address, 'owner');
        console.log(res);
        (0, chai_1.expect)(bytesToAddress(res.stack[0][1].bytes).toFriendly()).to.eq(deployWallet.address.toFriendly());
        // res = await client.callGetMethod(proposalDeployerContract.address, 'get_proposalDeployer_id');
        // expect(Number(res.stack[0][1])).to.eq(proposalDeployer_id);
        // res = await client.callGetMethod(proposalDeployerContract.address, 'get_next_child_id');
        // expect(Number(res.stack[0][1])).to.eq(next_child_id);
    }));
    it("Deploy new Dao contract", () => __awaiter(void 0, void 0, void 0, function* () {
        res = yield client.callGetMethod(registryContract.address, 'get_next_dao_id');
        let next_dao_id = Number(res.stack[0][1]);
        daoSettings = (0, ton_1.beginCell)().storeUint(0, 64).endCell();
        payload = (0, ton_1.beginCell)().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
        res = yield sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);
        res = yield client.callGetMethod(registryContract.address, 'get_next_dao_id');
        (0, chai_1.expect)(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
    }));
    it("Get tx", () => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield client.getTransactions(registryContract.address, { limit: 500 });
        console.log(transactions);
        // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
        // let next_dao_id = Number(res.stack[0][1]);
        // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
        // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);
        // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
        // expect(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
    }));
    it("Read get_next_dao_id from registry", () => __awaiter(void 0, void 0, void 0, function* () {
        daoSettings = (0, ton_1.beginCell)().storeUint(0, 64).endCell();
        daoContract = Dao.create(registryContract, 0, deployWallet.address, daoSettings);
        let daoAddr;
        payload = (0, ton_1.beginCell)().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
        res = yield sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);
    }));
});
function bytesToAddress(bufferB64) {
    const buff = buffer_1.Buffer.from(bufferB64, "base64");
    let c2 = ton_1.Cell.fromBoc(buff);
    return c2[0].beginParse().readAddress();
}
