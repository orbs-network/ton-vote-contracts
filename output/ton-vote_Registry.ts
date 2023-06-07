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

export type RouteDeployAndInitDao = {
    $$type: 'RouteDeployAndInitDao';
    prodMsgValue: bigint;
    devMsgValue: bigint;
    prodRegistry: Address;
    devRegistry: Address;
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

export function storeRouteDeployAndInitDao(src: RouteDeployAndInitDao) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(739290419, 32);
        b_0.storeUint(src.prodMsgValue, 64);
        b_0.storeUint(src.devMsgValue, 64);
        b_0.storeAddress(src.prodRegistry);
        b_0.storeAddress(src.devRegistry);
        b_0.storeAddress(src.owner);
        let b_1 = new Builder();
        b_1.storeAddress(src.proposalOwner);
        b_1.storeAddress(src.metadata);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRouteDeployAndInitDao(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 739290419) { throw Error('Invalid prefix'); }
    let _prodMsgValue = sc_0.loadUintBig(64);
    let _devMsgValue = sc_0.loadUintBig(64);
    let _prodRegistry = sc_0.loadAddress();
    let _devRegistry = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _proposalOwner = sc_1.loadAddress();
    let _metadata = sc_1.loadAddress();
    return { $$type: 'RouteDeployAndInitDao' as const, prodMsgValue: _prodMsgValue, devMsgValue: _devMsgValue, prodRegistry: _prodRegistry, devRegistry: _devRegistry, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function loadTupleRouteDeployAndInitDao(source: TupleReader) {
    let _prodMsgValue = source.readBigNumber();
    let _devMsgValue = source.readBigNumber();
    let _prodRegistry = source.readAddress();
    let _devRegistry = source.readAddress();
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'RouteDeployAndInitDao' as const, prodMsgValue: _prodMsgValue, devMsgValue: _devMsgValue, prodRegistry: _prodRegistry, devRegistry: _devRegistry, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata };
}

function storeTupleRouteDeployAndInitDao(source: RouteDeployAndInitDao) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.prodMsgValue);
    builder.writeNumber(source.devMsgValue);
    builder.writeAddress(source.prodRegistry);
    builder.writeAddress(source.devRegistry);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    return builder.build();
}

function dictValueParserRouteDeployAndInitDao(): DictionaryValue<RouteDeployAndInitDao> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRouteDeployAndInitDao(src)).endCell());
        },
        parse: (src) => {
            return loadRouteDeployAndInitDao(src.loadRef().beginParse());
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

export type SetNewDaoFwdMsgFee = {
    $$type: 'SetNewDaoFwdMsgFee';
    newDaosfwdMsgFee: bigint;
}

export function storeSetNewDaoFwdMsgFee(src: SetNewDaoFwdMsgFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(60181454, 32);
        b_0.storeUint(src.newDaosfwdMsgFee, 64);
    };
}

export function loadSetNewDaoFwdMsgFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 60181454) { throw Error('Invalid prefix'); }
    let _newDaosfwdMsgFee = sc_0.loadUintBig(64);
    return { $$type: 'SetNewDaoFwdMsgFee' as const, newDaosfwdMsgFee: _newDaosfwdMsgFee };
}

function loadTupleSetNewDaoFwdMsgFee(source: TupleReader) {
    let _newDaosfwdMsgFee = source.readBigNumber();
    return { $$type: 'SetNewDaoFwdMsgFee' as const, newDaosfwdMsgFee: _newDaosfwdMsgFee };
}

function storeTupleSetNewDaoFwdMsgFee(source: SetNewDaoFwdMsgFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newDaosfwdMsgFee);
    return builder.build();
}

function dictValueParserSetNewDaoFwdMsgFee(): DictionaryValue<SetNewDaoFwdMsgFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetNewDaoFwdMsgFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetNewDaoFwdMsgFee(src.loadRef().beginParse());
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

export type RegistryContractState = {
    $$type: 'RegistryContractState';
    registryId: bigint;
    nextDaoId: bigint;
    admin: Address;
    deployAndInitDaoFee: bigint;
    newDaosfwdMsgFee: bigint;
}

export function storeRegistryContractState(src: RegistryContractState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.registryId, 32);
        b_0.storeUint(src.nextDaoId, 32);
        b_0.storeAddress(src.admin);
        b_0.storeUint(src.deployAndInitDaoFee, 64);
        b_0.storeUint(src.newDaosfwdMsgFee, 64);
    };
}

export function loadRegistryContractState(slice: Slice) {
    let sc_0 = slice;
    let _registryId = sc_0.loadUintBig(32);
    let _nextDaoId = sc_0.loadUintBig(32);
    let _admin = sc_0.loadAddress();
    let _deployAndInitDaoFee = sc_0.loadUintBig(64);
    let _newDaosfwdMsgFee = sc_0.loadUintBig(64);
    return { $$type: 'RegistryContractState' as const, registryId: _registryId, nextDaoId: _nextDaoId, admin: _admin, deployAndInitDaoFee: _deployAndInitDaoFee, newDaosfwdMsgFee: _newDaosfwdMsgFee };
}

function loadTupleRegistryContractState(source: TupleReader) {
    let _registryId = source.readBigNumber();
    let _nextDaoId = source.readBigNumber();
    let _admin = source.readAddress();
    let _deployAndInitDaoFee = source.readBigNumber();
    let _newDaosfwdMsgFee = source.readBigNumber();
    return { $$type: 'RegistryContractState' as const, registryId: _registryId, nextDaoId: _nextDaoId, admin: _admin, deployAndInitDaoFee: _deployAndInitDaoFee, newDaosfwdMsgFee: _newDaosfwdMsgFee };
}

function storeTupleRegistryContractState(source: RegistryContractState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.registryId);
    builder.writeNumber(source.nextDaoId);
    builder.writeAddress(source.admin);
    builder.writeNumber(source.deployAndInitDaoFee);
    builder.writeNumber(source.newDaosfwdMsgFee);
    return builder.build();
}

function dictValueParserRegistryContractState(): DictionaryValue<RegistryContractState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRegistryContractState(src)).endCell());
        },
        parse: (src) => {
            return loadRegistryContractState(src.loadRef().beginParse());
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
    fwdMsgFee: bigint;
}

export function storeDaoInit(src: DaoInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3971512043, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.proposalOwner);
        b_0.storeAddress(src.metadata);
        b_0.storeUint(src.fwdMsgFee, 64);
    };
}

export function loadDaoInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3971512043) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _proposalOwner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    let _fwdMsgFee = sc_0.loadUintBig(64);
    return { $$type: 'DaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata, fwdMsgFee: _fwdMsgFee };
}

function loadTupleDaoInit(source: TupleReader) {
    let _owner = source.readAddress();
    let _proposalOwner = source.readAddress();
    let _metadata = source.readAddress();
    let _fwdMsgFee = source.readBigNumber();
    return { $$type: 'DaoInit' as const, owner: _owner, proposalOwner: _proposalOwner, metadata: _metadata, fwdMsgFee: _fwdMsgFee };
}

function storeTupleDaoInit(source: DaoInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.proposalOwner);
    builder.writeAddress(source.metadata);
    builder.writeNumber(source.fwdMsgFee);
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
    4600: { message: `Only admin can set the create dao fee` },
    8645: { message: `Only admin can set the dao fwd msg fee` },
    23452: { message: `Only admin can set new registry admin` },
    46336: { message: `Below min fee for create dao` },
    51893: { message: `Only registry can change fwd msg fee` },
    56012: { message: `Only admin can set the new dao fwd msg fee` },
    60173: { message: `Below min fee for dao forward message` },
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
    {"name":"RouteDeployAndInitDao","header":739290419,"fields":[{"name":"prodMsgValue","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"devMsgValue","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prodRegistry","type":{"kind":"simple","type":"address","optional":false}},{"name":"devRegistry","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployAndInitDao","header":3378223972,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendDaoInit","header":3367586747,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetDeployAndInitDaoFee","header":2828439833,"fields":[{"name":"newDeployAndInitDaoFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetNewDaoFwdMsgFee","header":60181454,"fields":[{"name":"newDaosfwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SendToDaoSetFwdMsgFee","header":1477819782,"fields":[{"name":"daoId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newFwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetRegistryAdmin","header":3335943114,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RegistryContractState","header":null,"fields":[{"name":"registryId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nextDaoId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"deployAndInitDaoFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newDaosfwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetOwner","header":3266583875,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetProposalOwner","header":3504586358,"fields":[{"name":"newProposalOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetFwdMsgFee","header":4109608450,"fields":[{"name":"newFwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetMetadata","header":3660550271,"fields":[{"name":"newMetadata","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"FwdMsg","header":1690551268,"fields":[{"name":"fwdMsg","type":{"kind":"simple","type":"SendParameters","optional":false}}]},
    {"name":"DaoInit","header":3971512043,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}},{"name":"fwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DaoContractState","header":null,"fields":[{"name":"registry","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"address","optional":false}},{"name":"daoIndex","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fwdMsgFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const Registry_getters: ABIGetter[] = [
    {"name":"state","arguments":[],"returnType":{"kind":"simple","type":"RegistryContractState","optional":false}},
    {"name":"nextDaoId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"daoAddress","arguments":[{"name":"daoId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Registry_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeployAndInitDao"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetDeployAndInitDaoFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetNewDaoFwdMsgFee"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployAndInitDao | SetDeployAndInitDaoFee | SetNewDaoFwdMsgFee | SendToDaoSetFwdMsgFee | SetRegistryAdmin | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployAndInitDao') {
            body = beginCell().store(storeDeployAndInitDao(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeployAndInitDaoFee') {
            body = beginCell().store(storeSetDeployAndInitDaoFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetNewDaoFwdMsgFee') {
            body = beginCell().store(storeSetNewDaoFwdMsgFee(message)).endCell();
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
    
    async getState(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('state', builder.build())).stack;
        const result = loadTupleRegistryContractState(source);
        return result;
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
    
}