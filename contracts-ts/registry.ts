import {Address, Cell, Contract, contractAddress, ContractSource, InternalMessage, Message, TonClient} from "ton";
import {compileFuncToB64} from "../tests/helpers";

export type Maybe<T> = T | null | undefined;

class WalletV3SigningMessage implements Message {

    readonly timeout: number;
    readonly seqno: number;
    readonly walletId: number;
    readonly order: Message | null;
    readonly sendMode: number;

    constructor(args: { timeout?: Maybe<number>, seqno: Maybe<number>, walletId?: number, sendMode: number, order: Message | null }) {
        this.order = args.order;
        this.sendMode = args.sendMode;
        if (args.timeout !== undefined && args.timeout !== null) {
            this.timeout = args.timeout;
        } else {
            this.timeout = Math.floor(Date.now() / 1e3) + 60; // Default timeout: 60 seconds
        }
        if (args.seqno !== undefined && args.seqno !== null) {
            this.seqno = args.seqno;
        } else {
            this.seqno = 0;
        }
        if (args.walletId !== null && args.walletId !== undefined) {
            this.walletId = args.walletId;
        } else {
            this.walletId = 698983191;
        }
    }

    writeTo(cell: Cell) {
        cell.bits.writeUint(this.walletId, 32);
        if (this.seqno === 0) {
            for (let i = 0; i < 32; i++) {
                cell.bits.writeBit(1);
            }
        } else {
            cell.bits.writeUint(this.timeout, 32);
        }
        cell.bits.writeUint(this.seqno, 32);
        cell.bits.writeUint8(0); // Simple order

        // Write order
        if (this.order) {
            cell.bits.writeUint8(this.sendMode);
            let orderCell = new Cell();
            this.order.writeTo(orderCell);
            cell.refs.push(orderCell);
        }
    }
}

export class Registry implements Contract {

    readonly address: Address;
    readonly source: ContractSource;
    
    constructor(initialCode: Cell, initialData: Cell, workchain = 0) {
        this.source = {initialCode: initialCode, initialData: initialData, workchain: 0} as ContractSource;
        this.address = contractAddress({initialCode: initialCode, initialData: initialData, workchain: workchain});
    }

    static create(content = new Cell()) {
        // Build initial code and data
        let initialCode = this.registryCode()[0];
        let initialData = new Cell();
        initialData.bits.writeUint(0, 64);
        initialData.withReference(content);
        initialData.withReference(this.daoCode()[0]);
        initialData.withReference(this.proposalCode()[0]);

        return new Registry(initialCode, initialData, 0);
    }

    static registryCode(): Cell[] {
        const code: string = compileFuncToB64(["contracts/imports/stdlib.fc", "contracts/registry.fc"]);
        return Cell.fromBoc(code);
    }

    static daoCode(): Cell[] {
        const code: string = compileFuncToB64(["contracts/imports/stdlib.fc", "contracts/dao.fc"]);
        return Cell.fromBoc(code);
    }

    static proposalCode(): Cell[] {
        const code: string = compileFuncToB64(["contracts/imports/stdlib.fc", "contracts/proposal.fc"]);
        return Cell.fromBoc(code);
    }

}
