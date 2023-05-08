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

export type SetDeployDaoCost = {
    $$type: 'SetDeployDaoCost';
    newdeployDaoCost: bigint;
}

export function storeSetDeployDaoCost(src: SetDeployDaoCost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(139449144, 32);
        b_0.storeUint(src.newdeployDaoCost, 64);
    };
}

export function loadSetDeployDaoCost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 139449144) { throw Error('Invalid prefix'); }
    let _newdeployDaoCost = sc_0.loadUintBig(64);
    return { $$type: 'SetDeployDaoCost' as const, newdeployDaoCost: _newdeployDaoCost };
}

function loadTupleSetDeployDaoCost(source: TupleReader) {
    let _newdeployDaoCost = source.readBigNumber();
    return { $$type: 'SetDeployDaoCost' as const, newdeployDaoCost: _newdeployDaoCost };
}

function storeTupleSetDeployDaoCost(source: SetDeployDaoCost) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newdeployDaoCost);
    return builder.build();
}

function dictValueParserSetDeployDaoCost(): DictionaryValue<SetDeployDaoCost> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeployDaoCost(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeployDaoCost(src.loadRef().beginParse());
        }
    }
}

export type SendSetDeployDaoCostToDao = {
    $$type: 'SendSetDeployDaoCostToDao';
    daoId: bigint;
    newdeployDaoCost: bigint;
}

export function storeSendSetDeployDaoCostToDao(src: SendSetDeployDaoCostToDao) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1875065082, 32);
        b_0.storeUint(src.daoId, 32);
        b_0.storeUint(src.newdeployDaoCost, 64);
    };
}

export function loadSendSetDeployDaoCostToDao(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1875065082) { throw Error('Invalid prefix'); }
    let _daoId = sc_0.loadUintBig(32);
    let _newdeployDaoCost = sc_0.loadUintBig(64);
    return { $$type: 'SendSetDeployDaoCostToDao' as const, daoId: _daoId, newdeployDaoCost: _newdeployDaoCost };
}

function loadTupleSendSetDeployDaoCostToDao(source: TupleReader) {
    let _daoId = source.readBigNumber();
    let _newdeployDaoCost = source.readBigNumber();
    return { $$type: 'SendSetDeployDaoCostToDao' as const, daoId: _daoId, newdeployDaoCost: _newdeployDaoCost };
}

function storeTupleSendSetDeployDaoCostToDao(source: SendSetDeployDaoCostToDao) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.daoId);
    builder.writeNumber(source.newdeployDaoCost);
    return builder.build();
}

function dictValueParserSendSetDeployDaoCostToDao(): DictionaryValue<SendSetDeployDaoCostToDao> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendSetDeployDaoCostToDao(src)).endCell());
        },
        parse: (src) => {
            return loadSendSetDeployDaoCostToDao(src.loadRef().beginParse());
        }
    }
}

export type SetDeployRegistryCost = {
    $$type: 'SetDeployRegistryCost';
    newDeployRegistryCost: bigint;
}

export function storeSetDeployRegistryCost(src: SetDeployRegistryCost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(84216113, 32);
        b_0.storeUint(src.newDeployRegistryCost, 64);
    };
}

export function loadSetDeployRegistryCost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 84216113) { throw Error('Invalid prefix'); }
    let _newDeployRegistryCost = sc_0.loadUintBig(64);
    return { $$type: 'SetDeployRegistryCost' as const, newDeployRegistryCost: _newDeployRegistryCost };
}

function loadTupleSetDeployRegistryCost(source: TupleReader) {
    let _newDeployRegistryCost = source.readBigNumber();
    return { $$type: 'SetDeployRegistryCost' as const, newDeployRegistryCost: _newDeployRegistryCost };
}

function storeTupleSetDeployRegistryCost(source: SetDeployRegistryCost) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newDeployRegistryCost);
    return builder.build();
}

function dictValueParserSetDeployRegistryCost(): DictionaryValue<SetDeployRegistryCost> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeployRegistryCost(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeployRegistryCost(src.loadRef().beginParse());
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

export type Comment = {
    $$type: 'Comment';
    body: string;
}

export function storeComment(src: Comment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(880812829, 32);
        b_0.storeStringRefTail(src.body);
    };
}

export function loadComment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 880812829) { throw Error('Invalid prefix'); }
    let _body = sc_0.loadStringRefTail();
    return { $$type: 'Comment' as const, body: _body };
}

function loadTupleComment(source: TupleReader) {
    let _body = source.readString();
    return { $$type: 'Comment' as const, body: _body };
}

function storeTupleComment(source: Comment) {
    let builder = new TupleBuilder();
    builder.writeString(source.body);
    return builder.build();
}

function dictValueParserComment(): DictionaryValue<Comment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeComment(src)).endCell());
        },
        parse: (src) => {
            return loadComment(src.loadRef().beginParse());
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
    10109: { message: `Low message value` },
    11226: { message: `Only admin can set new registry admin or on before creating daos` },
    42508: { message: `Only admin can change deploy registry cost` },
    48136: { message: `Only registry can change deploy cost` },
    61210: { message: `Only admin can change deploy dao cost` },
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateDao | SetDeployRegistryCost | SendSetDeployDaoCostToDao | SetRegistryAdmin | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDao') {
            body = beginCell().store(storeCreateDao(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeployRegistryCost') {
            body = beginCell().store(storeSetDeployRegistryCost(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendSetDeployDaoCostToDao') {
            body = beginCell().store(storeSendSetDeployDaoCostToDao(message)).endCell();
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
    
    async getDeployRegistryCost(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('deployRegistryCost', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}