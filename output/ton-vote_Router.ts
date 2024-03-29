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

 type Router_init_args = {
    $$type: 'Router_init_args';
}

function initRouter_init_args(src: Router_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Router_init() {
    const __code = Cell.fromBase64('te6ccgECEgEABCEAART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UBAUCAVgODwE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zwGA7ABkjB/4HAh10nCH5UwINcLH94gghAsEK0zuo8IMNs8bBfbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwBwgJAAJtAejTHwGCECwQrTO68uCB0z/TP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AoB9HBwVHQyyFUgghDJW5tkUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQRxA5bW0QRhBFCwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwMAJT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECcQJhAlECQQIwL02zxwA3AGyFUgghDJW5tkUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskUbW0QRhBF2zwMDAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgQEQARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1RZHNaQktGb0I0b0Fyc2tlOEN3MWYyR3I5eURhb0pNTXhCaXFpN3U1VUhwcIIA==');
    const __system = Cell.fromBase64('te6cckECFAEABCsAAQHAAQEFoa4HAgEU/wD0pBP0vPLICwMCAWIJBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbVFkc1pCS0ZvQjRvQXJza2U4Q3cxZjJHcjl5RGFvSk1NeEJpcWk3dTVVSHBwggABGwr7tRNDSAAGAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAKS0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCMMj4QwHMfwHKAMntVBIKA7ABkjB/4HAh10nCH5UwINcLH94gghAsEK0zuo8IMNs8bBfbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwEAwLATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA4B9HBwVHQyyFUgghDJW5tkUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQRxA5bW0QRhBFDQL02zxwA3AGyFUgghDJW5tkUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskUbW0QRhBF2zwODgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAPAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAejTHwGCECwQrTO68uCB0z/TP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0BEAlPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQJxAmECUQJBAjATTtRNDUAfhj0gAwkW3g+CjXCwqDCbry4InbPBMAAm0MKTMY');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRouter_init_args({ $$type: 'Router_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Router_errors: { [key: number]: { message: string } } = {
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

const Router_types: ABIType[] = [
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

const Router_getters: ABIGetter[] = [
]

const Router_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"RouteDeployAndInitDao"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Router implements Contract {
    
    static async init() {
        return await Router_init();
    }
    
    static async fromInit() {
        const init = await Router_init();
        const address = contractAddress(0, init);
        return new Router(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Router(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Router_types,
        getters: Router_getters,
        receivers: Router_receivers,
        errors: Router_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: RouteDeployAndInitDao | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RouteDeployAndInitDao') {
            body = beginCell().store(storeRouteDeployAndInitDao(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}