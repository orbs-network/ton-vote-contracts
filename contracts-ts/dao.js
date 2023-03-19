"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = void 0;
const ton_1 = require("ton");
const helpers_1 = require("../tests/helpers");
class WalletV3SigningMessage {
    constructor(args) {
        this.order = args.order;
        this.sendMode = args.sendMode;
        if (args.timeout !== undefined && args.timeout !== null) {
            this.timeout = args.timeout;
        }
        else {
            this.timeout = Math.floor(Date.now() / 1e3) + 60; // Default timeout: 60 seconds
        }
        if (args.seqno !== undefined && args.seqno !== null) {
            this.seqno = args.seqno;
        }
        else {
            this.seqno = 0;
        }
        if (args.walletId !== null && args.walletId !== undefined) {
            this.walletId = args.walletId;
        }
        else {
            this.walletId = 698983191;
        }
    }
    writeTo(cell) {
        cell.bits.writeUint(this.walletId, 32);
        if (this.seqno === 0) {
            for (let i = 0; i < 32; i++) {
                cell.bits.writeBit(1);
            }
        }
        else {
            cell.bits.writeUint(this.timeout, 32);
        }
        cell.bits.writeUint(this.seqno, 32);
        cell.bits.writeUint8(0); // Simple order
        // Write order
        if (this.order) {
            cell.bits.writeUint8(this.sendMode);
            let orderCell = new ton_1.Cell();
            this.order.writeTo(orderCell);
            cell.refs.push(orderCell);
        }
    }
}
class Dao {
    constructor(initialCode, initialData, workchain = 0) {
        this.source = { initialCode: initialCode, initialData: initialData, workchain: 0 };
        this.address = (0, ton_1.contractAddress)({ initialCode: initialCode, initialData: initialData, workchain: workchain });
    }
    static create(registry, daoId, owner, daoSettings) {
        // Build initial code and data
        let initialCode = this.daoCode()[0];
        let initialData = new ton_1.Cell();
        initialData.bits.writeAddress(registry.address);
        initialData.bits.writeUint(daoId, 64);
        initialData.bits.writeUint(0, 64); // next_proposal_id
        initialData.bits.writeAddress(owner);
        initialData.withReference(daoSettings);
        initialData.withReference(this.proposalCode()[0]);
        return new Dao(initialCode, initialData, 0);
    }
    static daoCode() {
        const code = (0, helpers_1.compileFuncToB64)(["contracts/imports/stdlib.fc", "contracts/dao.fc"]);
        return ton_1.Cell.fromBoc(code);
    }
    static proposalCode() {
        const code = (0, helpers_1.compileFuncToB64)(["contracts/imports/stdlib.fc", "contracts/proposal.fc"]);
        return ton_1.Cell.fromBoc(code);
    }
}
exports.Dao = Dao;
