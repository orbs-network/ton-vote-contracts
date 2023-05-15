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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
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

export type CreateDao = {
    $$type: 'CreateDao';
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

export function storeCreateDao(src: CreateDao) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(446717501, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadCreateDao(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 446717501) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'CreateDao' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function loadTupleCreateDao(source: TupleReader) {
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'CreateDao' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function storeTupleCreateDao(source: CreateDao) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    return builder.build();
}

function dictValueParserCreateDao(): DictionaryValue<CreateDao> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDao(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDao(src.loadRef().beginParse());
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

export type SetCreateDaoFee = {
    $$type: 'SetCreateDaoFee';
    newCreateDaoFee: bigint;
}

export function storeSetCreateDaoFee(src: SetCreateDaoFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3466008403, 32);
        b_0.storeUint(src.newCreateDaoFee, 64);
    };
}

export function loadSetCreateDaoFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3466008403) { throw Error('Invalid prefix'); }
    let _newCreateDaoFee = sc_0.loadUintBig(64);
    return { $$type: 'SetCreateDaoFee' as const, newCreateDaoFee: _newCreateDaoFee };
}

function loadTupleSetCreateDaoFee(source: TupleReader) {
    let _newCreateDaoFee = source.readBigNumber();
    return { $$type: 'SetCreateDaoFee' as const, newCreateDaoFee: _newCreateDaoFee };
}

function storeTupleSetCreateDaoFee(source: SetCreateDaoFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newCreateDaoFee);
    return builder.build();
}

function dictValueParserSetCreateDaoFee(): DictionaryValue<SetCreateDaoFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetCreateDaoFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetCreateDaoFee(src.loadRef().beginParse());
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

export type CreateProposal = {
    $$type: 'CreateProposal';
    body: Params;
}

export function storeCreateProposal(src: CreateProposal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(716721105, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadCreateProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 716721105) { throw Error('Invalid prefix'); }
    let _body = loadParams(sc_0);
    return { $$type: 'CreateProposal' as const, body: _body };
}

function loadTupleCreateProposal(source: TupleReader) {
    const _body = loadTupleParams(source.readTuple());
    return { $$type: 'CreateProposal' as const, body: _body };
}

function storeTupleCreateProposal(source: CreateProposal) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleParams(source.body));
    return builder.build();
}

function dictValueParserCreateProposal(): DictionaryValue<CreateProposal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateProposal(src)).endCell());
        },
        parse: (src) => {
            return loadCreateProposal(src.loadRef().beginParse());
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
        b_0.storeUint(3598355482, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadSendProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3598355482) { throw Error('Invalid prefix'); }
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
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description };
}

function loadTupleParams(source: TupleReader) {
    let _proposalStartTime = source.readBigNumber();
    let _proposalEndTime = source.readBigNumber();
    let _proposalSnapshotTime = source.readBigNumber();
    let _votingSystem = source.readString();
    let _votingPowerStrategies = source.readString();
    let _title = source.readString();
    let _description = source.readString();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description };
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
        b_0.storeUint(4087233874, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4087233874) { throw Error('Invalid prefix'); }
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
        errors: Registry_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateDao | SetCreateDaoFee | SendToDaoSetFwdMsgFee | SetRegistryAdmin | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDao') {
            body = beginCell().store(storeCreateDao(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCreateDaoFee') {
            body = beginCell().store(storeSetCreateDaoFee(message)).endCell();
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
    
    async getCreateDaoFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('createDaoFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}