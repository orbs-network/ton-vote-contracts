import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type DeployAndInitDao = {
    $$type: 'DeployAndInitDao';
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

export function storeDeployAndInitDao(src: DeployAndInitDao) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3378223972, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadDeployAndInitDao(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3378223972) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'DeployAndInitDao' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function loadTupleDeployAndInitDao(source: TupleReader) {
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'DeployAndInitDao' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function storeTupleDeployAndInitDao(source: DeployAndInitDao) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    return builder.build();
}

function dictValueParserDeployAndInitDao(): DictionaryValue<DeployAndInitDao> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployAndInitDao(src)).endCell());
        },
        parse: (src) => {
            return loadDeployAndInitDao(src.loadRef().beginParse());
        }
    }
}

export type SendDaoInit = {
    $$type: 'SendDaoInit';
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

export function storeSendDaoInit(src: SendDaoInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3367586747, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadSendDaoInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3367586747) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'SendDaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function loadTupleSendDaoInit(source: TupleReader) {
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'SendDaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function storeTupleSendDaoInit(source: SendDaoInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    return builder.build();
}

function dictValueParserSendDaoInit(): DictionaryValue<SendDaoInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendDaoInit(src)).endCell());
        },
        parse: (src) => {
            return loadSendDaoInit(src.loadRef().beginParse());
        }
    }
}

export type SetDeployAndInitDaoFee = {
    $$type: 'SetDeployAndInitDaoFee';
    newDeployAndInitDaoFee: bigint;
}

export function storeSetDeployAndInitDaoFee(src: SetDeployAndInitDaoFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2828439833, 32);
        b_0.storeUint(src.newDeployAndInitDaoFee, 64);
    };
}

export function loadSetDeployAndInitDaoFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2828439833) { throw Error('Invalid prefix'); }
    let _newDeployAndInitDaoFee = sc_0.loadUintBig(64);
    return { $$type: 'SetDeployAndInitDaoFee' as const, newDeployAndInitDaoFee: _newDeployAndInitDaoFee };
}

function loadTupleSetDeployAndInitDaoFee(source: TupleReader) {
    let _newDeployAndInitDaoFee = source.readBigNumber();
    return { $$type: 'SetDeployAndInitDaoFee' as const, newDeployAndInitDaoFee: _newDeployAndInitDaoFee };
}

function storeTupleSetDeployAndInitDaoFee(source: SetDeployAndInitDaoFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newDeployAndInitDaoFee);
    return builder.build();
}

function dictValueParserSetDeployAndInitDaoFee(): DictionaryValue<SetDeployAndInitDaoFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeployAndInitDaoFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeployAndInitDaoFee(src.loadRef().beginParse());
        }
    }
}

export type SendToDaoSetFwdMsgFee = {
    $$type: 'SendToDaoSetFwdMsgFee';
    daoId: bigint;
    newFwdMsgFee: bigint;
}

export function storeSendToDaoSetFwdMsgFee(src: SendToDaoSetFwdMsgFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1477819782, 32);
        b_0.storeUint(src.daoId, 32);
        b_0.storeUint(src.newFwdMsgFee, 64);
    };
}

export function loadSendToDaoSetFwdMsgFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1477819782) { throw Error('Invalid prefix'); }
    let _daoId = sc_0.loadUintBig(32);
    let _newFwdMsgFee = sc_0.loadUintBig(64);
    return { $$type: 'SendToDaoSetFwdMsgFee' as const, daoId: _daoId, newFwdMsgFee: _newFwdMsgFee };
}

function loadTupleSendToDaoSetFwdMsgFee(source: TupleReader) {
    let _daoId = source.readBigNumber();
    let _newFwdMsgFee = source.readBigNumber();
    return { $$type: 'SendToDaoSetFwdMsgFee' as const, daoId: _daoId, newFwdMsgFee: _newFwdMsgFee };
}

function storeTupleSendToDaoSetFwdMsgFee(source: SendToDaoSetFwdMsgFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.daoId);
    builder.writeNumber(source.newFwdMsgFee);
    return builder.build();
}

function dictValueParserSendToDaoSetFwdMsgFee(): DictionaryValue<SendToDaoSetFwdMsgFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendToDaoSetFwdMsgFee(src)).endCell());
        },
        parse: (src) => {
            return loadSendToDaoSetFwdMsgFee(src.loadRef().beginParse());
        }
    }
}

export type SetRegistryAdmin = {
    $$type: 'SetRegistryAdmin';
    newAdmin: Address;
}

export function storeSetRegistryAdmin(src: SetRegistryAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3335943114, 32);
        b_0.storeAddress(src.newAdmin);
    };
}

export function loadSetRegistryAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3335943114) { throw Error('Invalid prefix'); }
    let _newAdmin = sc_0.loadAddress();
    return { $$type: 'SetRegistryAdmin' as const, newAdmin: _newAdmin };
}

function loadTupleSetRegistryAdmin(source: TupleReader) {
    let _newAdmin = source.readAddress();
    return { $$type: 'SetRegistryAdmin' as const, newAdmin: _newAdmin };
}

function storeTupleSetRegistryAdmin(source: SetRegistryAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newAdmin);
    return builder.build();
}

function dictValueParserSetRegistryAdmin(): DictionaryValue<SetRegistryAdmin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetRegistryAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadSetRegistryAdmin(src.loadRef().beginParse());
        }
    }
}

export type SetOwner = {
    $$type: 'SetOwner';
    newOwner: Address;
}

export function storeSetOwner(src: SetOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3266583875, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadSetOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3266583875) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'SetOwner' as const, newOwner: _newOwner };
}

function loadTupleSetOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'SetOwner' as const, newOwner: _newOwner };
}

function storeTupleSetOwner(source: SetOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserSetOwner(): DictionaryValue<SetOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetOwner(src)).endCell());
        },
        parse: (src) => {
            return loadSetOwner(src.loadRef().beginParse());
        }
    }
}

export type SetProposalOwner = {
    $$type: 'SetProposalOwner';
    newProposalOwner: Address;
}

export function storeSetProposalOwner(src: SetProposalOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3504586358, 32);
        b_0.storeAddress(src.newProposalOwner);
    };
}

export function loadSetProposalOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3504586358) { throw Error('Invalid prefix'); }
    let _newProposalOwner = sc_0.loadAddress();
    return { $$type: 'SetProposalOwner' as const, newProposalOwner: _newProposalOwner };
}

function loadTupleSetProposalOwner(source: TupleReader) {
    let _newProposalOwner = source.readAddress();
    return { $$type: 'SetProposalOwner' as const, newProposalOwner: _newProposalOwner };
}

function storeTupleSetProposalOwner(source: SetProposalOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newProposalOwner);
    return builder.build();
}

function dictValueParserSetProposalOwner(): DictionaryValue<SetProposalOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetProposalOwner(src)).endCell());
        },
        parse: (src) => {
            return loadSetProposalOwner(src.loadRef().beginParse());
        }
    }
}

export type SetFwdMsgFee = {
    $$type: 'SetFwdMsgFee';
    newFwdMsgFee: bigint;
}

export function storeSetFwdMsgFee(src: SetFwdMsgFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4109608450, 32);
        b_0.storeUint(src.newFwdMsgFee, 64);
    };
}

export function loadSetFwdMsgFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4109608450) { throw Error('Invalid prefix'); }
    let _newFwdMsgFee = sc_0.loadUintBig(64);
    return { $$type: 'SetFwdMsgFee' as const, newFwdMsgFee: _newFwdMsgFee };
}

function loadTupleSetFwdMsgFee(source: TupleReader) {
    let _newFwdMsgFee = source.readBigNumber();
    return { $$type: 'SetFwdMsgFee' as const, newFwdMsgFee: _newFwdMsgFee };
}

function storeTupleSetFwdMsgFee(source: SetFwdMsgFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newFwdMsgFee);
    return builder.build();
}

function dictValueParserSetFwdMsgFee(): DictionaryValue<SetFwdMsgFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetFwdMsgFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetFwdMsgFee(src.loadRef().beginParse());
        }
    }
}

export type SetMetadata = {
    $$type: 'SetMetadata';
    newMetadata: Address;
}

export function storeSetMetadata(src: SetMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3660550271, 32);
        b_0.storeAddress(src.newMetadata);
    };
}

export function loadSetMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3660550271) { throw Error('Invalid prefix'); }
    let _newMetadata = sc_0.loadAddress();
    return { $$type: 'SetMetadata' as const, newMetadata: _newMetadata };
}

function loadTupleSetMetadata(source: TupleReader) {
    let _newMetadata = source.readAddress();
    return { $$type: 'SetMetadata' as const, newMetadata: _newMetadata };
}

function storeTupleSetMetadata(source: SetMetadata) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newMetadata);
    return builder.build();
}

function dictValueParserSetMetadata(): DictionaryValue<SetMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadSetMetadata(src.loadRef().beginParse());
        }
    }
}

export type FwdMsg = {
    $$type: 'FwdMsg';
    fwdMsg: SendParameters;
}

export function storeFwdMsg(src: FwdMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1690551268, 32);
        b_0.store(storeSendParameters(src.fwdMsg));
    };
}

export function loadFwdMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1690551268) { throw Error('Invalid prefix'); }
    let _fwdMsg = loadSendParameters(sc_0);
    return { $$type: 'FwdMsg' as const, fwdMsg: _fwdMsg };
}

function loadTupleFwdMsg(source: TupleReader) {
    const _fwdMsg = loadTupleSendParameters(source.readTuple());
    return { $$type: 'FwdMsg' as const, fwdMsg: _fwdMsg };
}

function storeTupleFwdMsg(source: FwdMsg) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSendParameters(source.fwdMsg));
    return builder.build();
}

function dictValueParserFwdMsg(): DictionaryValue<FwdMsg> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFwdMsg(src)).endCell());
        },
        parse: (src) => {
            return loadFwdMsg(src.loadRef().beginParse());
        }
    }
}

export type DaoInit = {
    $$type: 'DaoInit';
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

export function storeDaoInit(src: DaoInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(444810285, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadDaoInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 444810285) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'DaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function loadTupleDaoInit(source: TupleReader) {
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'DaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function storeTupleDaoInit(source: DaoInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    return builder.build();
}

function dictValueParserDaoInit(): DictionaryValue<DaoInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDaoInit(src)).endCell());
        },
        parse: (src) => {
            return loadDaoInit(src.loadRef().beginParse());
        }
    }
}

export type DaoContractState = {
    $$type: 'DaoContractState';
    registry: Address;
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
    daoIndex: bigint;
    fwdMsgFee: bigint;
}

export function storeDaoContractState(src: DaoContractState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.registry);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        let b_1 = new Builder();
        b_1.storeAddress(src.metadata);
        b_1.storeUint(src.daoIndex, 32);
        b_1.storeUint(src.fwdMsgFee, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDaoContractState(slice: Slice) {
    let sc_0 = slice;
    let _registry = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _metadata = sc_1.loadAddress();
    let _daoIndex = sc_1.loadUintBig(32);
    let _fwdMsgFee = sc_1.loadUintBig(64);
    return { $$type: 'DaoContractState' as const, registry: _registry, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata, daoIndex: _daoIndex, fwdMsgFee: _fwdMsgFee };
}

function loadTupleDaoContractState(source: TupleReader) {
    let _registry = source.readAddress();
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    let _daoIndex = source.readBigNumber();
    let _fwdMsgFee = source.readBigNumber();
    return { $$type: 'DaoContractState' as const, registry: _registry, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata, daoIndex: _daoIndex, fwdMsgFee: _fwdMsgFee };
}

function storeTupleDaoContractState(source: DaoContractState) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.registry);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    builder.writeNumber(source.daoIndex);
    builder.writeNumber(source.fwdMsgFee);
    return builder.build();
}

function dictValueParserDaoContractState(): DictionaryValue<DaoContractState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDaoContractState(src)).endCell());
        },
        parse: (src) => {
            return loadDaoContractState(src.loadRef().beginParse());
        }
    }
}

export type DeployAndInitProposal = {
    $$type: 'DeployAndInitProposal';
    body: Params;
}

export function storeDeployAndInitProposal(src: DeployAndInitProposal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2615508727, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadDeployAndInitProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2615508727) { throw Error('Invalid prefix'); }
    let _body = loadParams(sc_0);
    return { $$type: 'DeployAndInitProposal' as const, body: _body };
}

function loadTupleDeployAndInitProposal(source: TupleReader) {
    const _body = loadTupleParams(source.readTuple());
    return { $$type: 'DeployAndInitProposal' as const, body: _body };
}

function storeTupleDeployAndInitProposal(source: DeployAndInitProposal) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleParams(source.body));
    return builder.build();
}

function dictValueParserDeployAndInitProposal(): DictionaryValue<DeployAndInitProposal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployAndInitProposal(src)).endCell());
        },
        parse: (src) => {
            return loadDeployAndInitProposal(src.loadRef().beginParse());
        }
    }
}

export type SendProposalInit = {
    $$type: 'SendProposalInit';
    body: Params;
}

export function storeSendProposalInit(src: SendProposalInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3664955103, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadSendProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3664955103) { throw Error('Invalid prefix'); }
    let _body = loadParams(sc_0);
    return { $$type: 'SendProposalInit' as const, body: _body };
}

function loadTupleSendProposalInit(source: TupleReader) {
    const _body = loadTupleParams(source.readTuple());
    return { $$type: 'SendProposalInit' as const, body: _body };
}

function storeTupleSendProposalInit(source: SendProposalInit) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleParams(source.body));
    return builder.build();
}

function dictValueParserSendProposalInit(): DictionaryValue<SendProposalInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendProposalInit(src)).endCell());
        },
        parse: (src) => {
            return loadSendProposalInit(src.loadRef().beginParse());
        }
    }
}

export type Params = {
    $$type: 'Params';
    proposalStartTime: bigint;
    proposalEndTime: bigint;
    proposalSnapshotTime: bigint;
    votingSystem: string;
    votingPowerStrategies: string;
    title: string;
    description: string;
    quorum: string;
}

export function storeParams(src: Params) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.proposalStartTime, 64);
        b_0.storeUint(src.proposalEndTime, 64);
        b_0.storeUint(src.proposalSnapshotTime, 64);
        b_0.storeStringRefTail(src.votingSystem);
        b_0.storeStringRefTail(src.votingPowerStrategies);
        b_0.storeStringRefTail(src.title);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.description);
        b_1.storeStringRefTail(src.quorum);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadParams(slice: Slice) {
    let sc_0 = slice;
    let _proposalStartTime = sc_0.loadUintBig(64);
    let _proposalEndTime = sc_0.loadUintBig(64);
    let _proposalSnapshotTime = sc_0.loadUintBig(64);
    let _votingSystem = sc_0.loadStringRefTail();
    let _votingPowerStrategies = sc_0.loadStringRefTail();
    let _title = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _description = sc_1.loadStringRefTail();
    let _quorum = sc_1.loadStringRefTail();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum };
}

function loadTupleParams(source: TupleReader) {
    let _proposalStartTime = source.readBigNumber();
    let _proposalEndTime = source.readBigNumber();
    let _proposalSnapshotTime = source.readBigNumber();
    let _votingSystem = source.readString();
    let _votingPowerStrategies = source.readString();
    let _title = source.readString();
    let _description = source.readString();
    let _quorum = source.readString();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum };
}

function storeTupleParams(source: Params) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.proposalStartTime);
    builder.writeNumber(source.proposalEndTime);
    builder.writeNumber(source.proposalSnapshotTime);
    builder.writeString(source.votingSystem);
    builder.writeString(source.votingPowerStrategies);
    builder.writeString(source.title);
    builder.writeString(source.description);
    builder.writeString(source.quorum);
    return builder.build();
}

function dictValueParserParams(): DictionaryValue<Params> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeParams(src)).endCell());
        },
        parse: (src) => {
            return loadParams(src.loadRef().beginParse());
        }
    }
}

export type ProposalInit = {
    $$type: 'ProposalInit';
    body: Params;
}

export function storeProposalInit(src: ProposalInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3444668425, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3444668425) { throw Error('Invalid prefix'); }
    let _body = loadParams(sc_0);
    return { $$type: 'ProposalInit' as const, body: _body };
}

function loadTupleProposalInit(source: TupleReader) {
    const _body = loadTupleParams(source.readTuple());
    return { $$type: 'ProposalInit' as const, body: _body };
}

function storeTupleProposalInit(source: ProposalInit) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleParams(source.body));
    return builder.build();
}

function dictValueParserProposalInit(): DictionaryValue<ProposalInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProposalInit(src)).endCell());
        },
        parse: (src) => {
            return loadProposalInit(src.loadRef().beginParse());
        }
    }
}

export type ProposalContractState = {
    $$type: 'ProposalContractState';
    proposalDeployer: Address;
    id: bigint;
    proposalStartTime: bigint;
    proposalEndTime: bigint;
    proposalSnapshotTime: bigint;
    votingSystem: string;
    votingPowerStrategies: string;
    title: string;
    description: string;
    quorum: string;
}

export function storeProposalContractState(src: ProposalContractState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.proposalDeployer);
        b_0.storeUint(src.id, 32);
        b_0.storeUint(src.proposalStartTime, 64);
        b_0.storeUint(src.proposalEndTime, 64);
        b_0.storeUint(src.proposalSnapshotTime, 64);
        b_0.storeStringRefTail(src.votingSystem);
        b_0.storeStringRefTail(src.votingPowerStrategies);
        b_0.storeStringRefTail(src.title);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.description);
        b_1.storeStringRefTail(src.quorum);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadProposalContractState(slice: Slice) {
    let sc_0 = slice;
    let _proposalDeployer = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(32);
    let _proposalStartTime = sc_0.loadUintBig(64);
    let _proposalEndTime = sc_0.loadUintBig(64);
    let _proposalSnapshotTime = sc_0.loadUintBig(64);
    let _votingSystem = sc_0.loadStringRefTail();
    let _votingPowerStrategies = sc_0.loadStringRefTail();
    let _title = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _description = sc_1.loadStringRefTail();
    let _quorum = sc_1.loadStringRefTail();
    return { $$type: 'ProposalContractState' as const, proposalDeployer: _proposalDeployer, id: _id, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum };
}

function loadTupleProposalContractState(source: TupleReader) {
    let _proposalDeployer = source.readAddress();
    let _id = source.readBigNumber();
    let _proposalStartTime = source.readBigNumber();
    let _proposalEndTime = source.readBigNumber();
    let _proposalSnapshotTime = source.readBigNumber();
    let _votingSystem = source.readString();
    let _votingPowerStrategies = source.readString();
    let _title = source.readString();
    let _description = source.readString();
    let _quorum = source.readString();
    return { $$type: 'ProposalContractState' as const, proposalDeployer: _proposalDeployer, id: _id, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum };
}

function storeTupleProposalContractState(source: ProposalContractState) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.proposalDeployer);
    builder.writeNumber(source.id);
    builder.writeNumber(source.proposalStartTime);
    builder.writeNumber(source.proposalEndTime);
    builder.writeNumber(source.proposalSnapshotTime);
    builder.writeString(source.votingSystem);
    builder.writeString(source.votingPowerStrategies);
    builder.writeString(source.title);
    builder.writeString(source.description);
    builder.writeString(source.quorum);
    return builder.build();
}

function dictValueParserProposalContractState(): DictionaryValue<ProposalContractState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProposalContractState(src)).endCell());
        },
        parse: (src) => {
            return loadProposalContractState(src.loadRef().beginParse());
        }
    }
}

export type MetadataState = {
    $$type: 'MetadataState';
    avatar: string;
    name: string;
    about: string;
    website: string;
    terms: string;
    telegram: string;
    github: string;
    jetton: Address;
    nft: Address;
    hide: boolean;
}

export function storeMetadataState(src: MetadataState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.avatar);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.about);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.website);
        b_1.storeStringRefTail(src.terms);
        b_1.storeStringRefTail(src.telegram);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.github);
        b_2.storeAddress(src.jetton);
        b_2.storeAddress(src.nft);
        b_2.storeBit(src.hide);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMetadataState(slice: Slice) {
    let sc_0 = slice;
    let _avatar = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _about = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _website = sc_1.loadStringRefTail();
    let _terms = sc_1.loadStringRefTail();
    let _telegram = sc_1.loadStringRefTail();
    let sc_2 = sc_1.loadRef().beginParse();
    let _github = sc_2.loadStringRefTail();
    let _jetton = sc_2.loadAddress();
    let _nft = sc_2.loadAddress();
    let _hide = sc_2.loadBit();
    return { $$type: 'MetadataState' as const, avatar: _avatar, name: _name, about: _about, website: _website, terms: _terms, telegram: _telegram, github: _github, jetton: _jetton, nft: _nft, hide: _hide };
}

function loadTupleMetadataState(source: TupleReader) {
    let _avatar = source.readString();
    let _name = source.readString();
    let _about = source.readString();
    let _website = source.readString();
    let _terms = source.readString();
    let _telegram = source.readString();
    let _github = source.readString();
    let _jetton = source.readAddress();
    let _nft = source.readAddress();
    let _hide = source.readBoolean();
    return { $$type: 'MetadataState' as const, avatar: _avatar, name: _name, about: _about, website: _website, terms: _terms, telegram: _telegram, github: _github, jetton: _jetton, nft: _nft, hide: _hide };
}

function storeTupleMetadataState(source: MetadataState) {
    let builder = new TupleBuilder();
    builder.writeString(source.avatar);
    builder.writeString(source.name);
    builder.writeString(source.about);
    builder.writeString(source.website);
    builder.writeString(source.terms);
    builder.writeString(source.telegram);
    builder.writeString(source.github);
    builder.writeAddress(source.jetton);
    builder.writeAddress(source.nft);
    builder.writeBoolean(source.hide);
    return builder.build();
}

function dictValueParserMetadataState(): DictionaryValue<MetadataState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMetadataState(src)).endCell());
        },
        parse: (src) => {
            return loadMetadataState(src.loadRef().beginParse());
        }
    }
}

 type Registry_init_args = {
    $$type: 'Registry_init_args';
    registryId: bigint;
}

function initRegistry_init_args(src: Registry_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.registryId, 257);
    };
}

async function Registry_init(registryId: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRegistry_init_args({ $$type: 'Registry_init_args', registryId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Registry_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2977: { message: `Already initialized` },
    4429: { message: `Invalid sender` },
    23452: { message: `Only admin can set new registry admin` },
    46336: { message: `Below min fee for create dao` },
    51893: { message: `Only registry can change fwd msg fee` },
    52512: { message: `Only admin can set dao fwd msg fee` },
    60173: { message: `Below min fee for dao forward message` },
    62925: { message: `Only admin can set create dao fee` },
}

const Registry_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployAndInitDao","header":3378223972,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendDaoInit","header":3367586747,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetDeployAndInitDaoFee","header":2828439833,"fields":[{"name":"newDeployAndInitDaoFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SendToDaoSetFwdMsgFee","header":1477819782,"fields":[{"name":"daoId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newFwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetRegistryAdmin","header":3335943114,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetOwner","header":3266583875,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetProposalOwner","header":3504586358,"fields":[{"name":"newProposalOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetFwdMsgFee","header":4109608450,"fields":[{"name":"newFwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetMetadata","header":3660550271,"fields":[{"name":"newMetadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"FwdMsg","header":1690551268,"fields":[{"name":"fwdMsg","type":{"kind":"simple","type":"SendParameters","optional":false}}]},
    {"name":"DaoInit","header":444810285,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DaoContractState","header":null,"fields":[{"name":"registry","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}},{"name":"daoIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployAndInitProposal","header":2615508727,"fields":[{"name":"body","type":{"kind":"simple","type":"Params","optional":false}}]},
    {"name":"SendProposalInit","header":3664955103,"fields":[{"name":"body","type":{"kind":"simple","type":"Params","optional":false}}]},
    {"name":"Params","header":null,"fields":[{"name":"proposalStartTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalEndTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalSnapshotTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votingSystem","type":{"kind":"simple","type":"string","optional":false}},{"name":"votingPowerStrategies","type":{"kind":"simple","type":"string","optional":false}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"quorum","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"ProposalInit","header":3444668425,"fields":[{"name":"body","type":{"kind":"simple","type":"Params","optional":false}}]},
    {"name":"ProposalContractState","header":null,"fields":[{"name":"proposalDeployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"proposalStartTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalEndTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalSnapshotTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votingSystem","type":{"kind":"simple","type":"string","optional":false}},{"name":"votingPowerStrategies","type":{"kind":"simple","type":"string","optional":false}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"quorum","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MetadataState","header":null,"fields":[{"name":"avatar","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"about","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}},{"name":"terms","type":{"kind":"simple","type":"string","optional":false}},{"name":"telegram","type":{"kind":"simple","type":"string","optional":false}},{"name":"github","type":{"kind":"simple","type":"string","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"hide","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const Registry_getters: ABIGetter[] = [
    {"name":"nextDaoId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"daoAddress","arguments":[{"name":"daoId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"registryId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"deployAndInitDaoFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Registry_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeployAndInitDao"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetDeployAndInitDaoFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendToDaoSetFwdMsgFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetRegistryAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Registry implements Contract {
    
    static async init(registryId: bigint) {
        return await Registry_init(registryId);
    }
    
    static async fromInit(registryId: bigint) {
        const init = await Registry_init(registryId);
        const address = contractAddress(0, init);
        return new Registry(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Registry(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Registry_types,
        getters: Registry_getters,
        receivers: Registry_receivers,
        errors: Registry_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployAndInitDao | SetDeployAndInitDaoFee | SendToDaoSetFwdMsgFee | SetRegistryAdmin | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployAndInitDao') {
            body = beginCell().store(storeDeployAndInitDao(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeployAndInitDaoFee') {
            body = beginCell().store(storeSetDeployAndInitDaoFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendToDaoSetFwdMsgFee') {
            body = beginCell().store(storeSendToDaoSetFwdMsgFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetRegistryAdmin') {
            body = beginCell().store(storeSetRegistryAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getNextDaoId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('nextDaoId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDaoAddress(provider: ContractProvider, daoId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(daoId);
        let source = (await provider.get('daoAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getRegistryId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('registryId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getAdmin(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('admin', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDeployAndInitDaoFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('deployAndInitDaoFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}