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
        b_0.storeUint(319521755, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadCreateProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 319521755) { throw Error('Invalid prefix'); }
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
    proposalType: bigint;
    votingPowerStrategy: bigint;
}

export function storeParams(src: Params) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.proposalStartTime, 64);
        b_0.storeUint(src.proposalEndTime, 64);
        b_0.storeUint(src.proposalSnapshotTime, 64);
        b_0.storeUint(src.proposalType, 8);
        b_0.storeUint(src.votingPowerStrategy, 8);
    };
}

export function loadParams(slice: Slice) {
    let sc_0 = slice;
    let _proposalStartTime = sc_0.loadUintBig(64);
    let _proposalEndTime = sc_0.loadUintBig(64);
    let _proposalSnapshotTime = sc_0.loadUintBig(64);
    let _proposalType = sc_0.loadUintBig(8);
    let _votingPowerStrategy = sc_0.loadUintBig(8);
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, proposalType: _proposalType, votingPowerStrategy: _votingPowerStrategy };
}

function loadTupleParams(source: TupleReader) {
    let _proposalStartTime = source.readBigNumber();
    let _proposalEndTime = source.readBigNumber();
    let _proposalSnapshotTime = source.readBigNumber();
    let _proposalType = source.readBigNumber();
    let _votingPowerStrategy = source.readBigNumber();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, proposalType: _proposalType, votingPowerStrategy: _votingPowerStrategy };
}

function storeTupleParams(source: Params) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.proposalStartTime);
    builder.writeNumber(source.proposalEndTime);
    builder.writeNumber(source.proposalSnapshotTime);
    builder.writeNumber(source.proposalType);
    builder.writeNumber(source.votingPowerStrategy);
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
        b_0.storeUint(2228075895, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2228075895) { throw Error('Invalid prefix'); }
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

 type Dao_init_args = {
    $$type: 'Dao_init_args';
    registry: Address;
    daoIndex: bigint;
}

function initDao_init_args(src: Dao_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.registry);
        b_0.storeInt(src.daoIndex, 257);
    };
}

async function Dao_init(registry: Address, daoIndex: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDao_init_args({ $$type: 'Dao_init_args', registry, daoIndex })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Dao_errors: { [key: number]: { message: string } } = {
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
    8704: { message: `already initialized` },
    25952: { message: `ended` },
    56772: { message: `not started` },
    63162: { message: `low message value` },
}

export class Dao implements Contract {
    
    static async init(registry: Address, daoIndex: bigint) {
        return await Dao_init(registry, daoIndex);
    }
    
    static async fromInit(registry: Address, daoIndex: bigint) {
        const init = await Dao_init(registry, daoIndex);
        const address = contractAddress(0, init);
        return new Dao(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Dao(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Dao_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DaoInit | SetOwner | SetProposalOwner | SetMetadata | FwdMsg | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DaoInit') {
            body = beginCell().store(storeDaoInit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetOwner') {
            body = beginCell().store(storeSetOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetProposalOwner') {
            body = beginCell().store(storeSetProposalOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMetadata') {
            body = beginCell().store(storeSetMetadata(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FwdMsg') {
            body = beginCell().store(storeFwdMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRegistry(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('registry', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getProposalOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('proposalOwner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMetadata(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('metadata', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDaoIndex(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('daoIndex', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}