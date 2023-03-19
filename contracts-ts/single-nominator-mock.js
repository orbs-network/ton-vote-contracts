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
exports.SingleNominatorMock = void 0;
const ton_1 = require("ton");
const ton_contract_executor_1 = require("ton-contract-executor");
const helpers_1 = require("../test/helpers");
class SingleNominatorMock {
    constructor(contract, myAddress, balance) {
        this.contract = contract;
        this.address = myAddress;
        contract.setC7Config({
            balance: balance,
            myself: myAddress,
        });
    }
    sendInternalMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contract.sendInternalMessage(message);
        });
    }
    static getCode() {
        const nominatorCode = (0, helpers_1.compileFuncToB64)(["test/contracts/stdlib.fc", "test/contracts/test-config-param.fc", "contracts/single-nominator.fc"]);
        return ton_1.Cell.fromBoc(nominatorCode);
    }
    static Create(balance = (0, ton_1.toNano)(10), owner, validator, workchain = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeCell = SingleNominatorMock.getCode()[0];
            const dataCell = (0, ton_1.beginCell)().storeAddress(owner).storeAddress(validator).endCell();
            const contract = yield ton_contract_executor_1.SmartContract.fromCell(codeCell, dataCell, {
                getMethodsMutate: true,
                debug: true,
            });
            const myAddress = (0, ton_1.contractAddress)({ workchain: workchain, initialCode: codeCell, initialData: dataCell });
            return new SingleNominatorMock(contract, myAddress, balance);
        });
    }
}
exports.SingleNominatorMock = SingleNominatorMock;
