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

export type CreateNewProposalDeployer = {
    $$type: 'CreateNewProposalDeployer';
    newProposalDeployer: SendParameters;
}

export function storeCreateNewProposalDeployer(src: CreateNewProposalDeployer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(463537042, 32);
        b_0.store(storeSendParameters(src.newProposalDeployer));
    };
}

export function loadCreateNewProposalDeployer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 463537042) { throw Error('Invalid prefix'); }
    let _newProposalDeployer = loadSendParameters(sc_0);
    return { $$type: 'CreateNewProposalDeployer' as const, newProposalDeployer: _newProposalDeployer };
}

function loadTupleCreateNewProposalDeployer(source: TupleReader) {
    const _newProposalDeployer = loadTupleSendParameters(source.readTuple());
    return { $$type: 'CreateNewProposalDeployer' as const, newProposalDeployer: _newProposalDeployer };
}

function storeTupleCreateNewProposalDeployer(source: CreateNewProposalDeployer) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleSendParameters(source.newProposalDeployer));
    return builder.build();
}

function dictValueParserCreateNewProposalDeployer(): DictionaryValue<CreateNewProposalDeployer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateNewProposalDeployer(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNewProposalDeployer(src.loadRef().beginParse());
        }
    }
}

export type DaoInit = {
    $$type: 'DaoInit';
    owner: Address;
    metadata: Address;
}

export function storeDaoInit(src: DaoInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1650244310, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadDaoInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1650244310) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'DaoInit' as const, owner: _owner, metadata: _metadata };
}

function loadTupleDaoInit(source: TupleReader) {
    let _owner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'DaoInit' as const, owner: _owner, metadata: _metadata };
}

function storeTupleDaoInit(source: DaoInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
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

export type Params = {
    $$type: 'Params';
    proposal_start_time: bigint;
    proposal_end_time: bigint;
    proposal_snapshot_time: bigint;
    proposal_type: bigint;
    voting_power_strategy: bigint;
}

export function storeParams(src: Params) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.proposal_start_time, 64);
        b_0.storeUint(src.proposal_end_time, 64);
        b_0.storeUint(src.proposal_snapshot_time, 64);
        b_0.storeUint(src.proposal_type, 8);
        b_0.storeUint(src.voting_power_strategy, 8);
    };
}

export function loadParams(slice: Slice) {
    let sc_0 = slice;
    let _proposal_start_time = sc_0.loadUintBig(64);
    let _proposal_end_time = sc_0.loadUintBig(64);
    let _proposal_snapshot_time = sc_0.loadUintBig(64);
    let _proposal_type = sc_0.loadUintBig(8);
    let _voting_power_strategy = sc_0.loadUintBig(8);
    return { $$type: 'Params' as const, proposal_start_time: _proposal_start_time, proposal_end_time: _proposal_end_time, proposal_snapshot_time: _proposal_snapshot_time, proposal_type: _proposal_type, voting_power_strategy: _voting_power_strategy };
}

function loadTupleParams(source: TupleReader) {
    let _proposal_start_time = source.readBigNumber();
    let _proposal_end_time = source.readBigNumber();
    let _proposal_snapshot_time = source.readBigNumber();
    let _proposal_type = source.readBigNumber();
    let _voting_power_strategy = source.readBigNumber();
    return { $$type: 'Params' as const, proposal_start_time: _proposal_start_time, proposal_end_time: _proposal_end_time, proposal_snapshot_time: _proposal_snapshot_time, proposal_type: _proposal_type, voting_power_strategy: _voting_power_strategy };
}

function storeTupleParams(source: Params) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.proposal_start_time);
    builder.writeNumber(source.proposal_end_time);
    builder.writeNumber(source.proposal_snapshot_time);
    builder.writeNumber(source.proposal_type);
    builder.writeNumber(source.voting_power_strategy);
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
        b_0.storeUint(4276568927, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4276568927) { throw Error('Invalid prefix'); }
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

export type CreateDao = {
    $$type: 'CreateDao';
    owner: Address;
    metadata: Address;
}

export function storeCreateDao(src: CreateDao) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2756304371, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.metadata);
    };
}

export function loadCreateDao(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2756304371) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _metadata = sc_0.loadAddress();
    return { $$type: 'CreateDao' as const, owner: _owner, metadata: _metadata };
}

function loadTupleCreateDao(source: TupleReader) {
    let _owner = source.readAddress();
    let _metadata = source.readAddress();
    return { $$type: 'CreateDao' as const, owner: _owner, metadata: _metadata };
}

function storeTupleCreateDao(source: CreateDao) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
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

 type Proposal_init_args = {
    $$type: 'Proposal_init_args';
    owner: Address;
    index: bigint;
}

function initProposal_init_args(src: Proposal_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.index, 257);
    };
}

async function Proposal_init(owner: Address, index: bigint) {
    const __code = Cell.fromBase64('te6ccgECFAEAA8QAART/APSkE/S88sgLAQIBYgIDAX7QAdDTAwFxsMABkX+RcOIB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJVFBTA28E+GEC+GIEAgEgDA0EnO1E0NQB+GPSAAGOu/go1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAYEBAdcAWQLRAds84w1VFts8MBESBQYCznAh10nCH5UwINcLH94Cklt/4CGCEP7nQ1+6jjQx0x8BghD+50NfuvLggdM/0z/TP9MH0wdVQGwVNTWBC6EIwAAHwAAXsAXAABWwFvL0ECN/4CGCEDSAIx264wIBghCUapi2uuMCMHAHCACEyPhDAcx/AcoAVWBQdiDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WFMsfEss/yz/LPxLLB8sHye1UAE4x0x8BghA0gCMduvLggdQB0DEwggDdxPgjJrzy9IFlYPgjJbny9H8BRNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8nbPH8JARp/+EJwWAOAQgFtbds8CgHOyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WUAP6AnABymgjbrMlbrOxlzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAODwC5vd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkA5u4bD7UTQ1AH4Y9IAAY67+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkBgQEB1wBZAtEB2zzjDds8gREhADm7hR3tRNDUAfhj0gABjrv4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQGBAQHXAFkC0QHbPOMN2zyBESEwAIEFZfBgAKcFRwACAAavpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQHTH9M/0z/TP9MH0wdVYGwXAARfBg==');
    const __system = Cell.fromBase64('te6cckECFgEAA84AAQHAAQEFoGJdAgEU/wD0pBP0vPLICwMCAWILBAIBIAYFALm93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQCASAJBwObuFHe1E0NQB+GPSAAGOu/go1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAYEBAdcAWQLRAds84w3bPIFRQIAARfBgObuGw+1E0NQB+GPSAAGOu/go1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJAYEBAdcAWQLRAds84w3bPIFRQKAAgQVl8GAX7QAdDTAwFxsMABkX+RcOIB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJVFBTA28E+GEC+GIMBJztRNDUAfhj0gABjrv4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgiQGBAQHXAFkC0QHbPOMNVRbbPDAVFA4NAITI+EMBzH8BygBVYFB2INdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxYUyx8Syz/LP8s/EssHywfJ7VQCznAh10nCH5UwINcLH94Cklt/4CGCEP7nQ1+6jjQx0x8BghD+50NfuvLggdM/0z/TP9MH0wdVQGwVNTWBC6EIwAAHwAAXsAXAABWwFvL0ECN/4CGCEDSAIx264wIBghCUapi2uuMCMHATDwFE0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8fxABGn/4QnBYA4BCAW1t2zwRAc7IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZQA/oCcAHKaCNusyVus7GXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABOMdMfAYIQNIAjHbry4IHUAdAxMIIA3cT4Iya88vSBZWD4IyW58vR/AGr6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkB0x/TP9M/0z/TB9MHVWBsFwAKcFRwACDQwfLX');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProposal_init_args({ $$type: 'Proposal_init_args', owner, index })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Proposal_errors: { [key: number]: { message: string } } = {
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
    25952: { message: `ended` },
    56772: { message: `not started` },
}

export class Proposal implements Contract {
    
    static async init(owner: Address, index: bigint) {
        return await Proposal_init(owner, index);
    }
    
    static async fromInit(owner: Address, index: bigint) {
        const init = await Proposal_init(owner, index);
        const address = contractAddress(0, init);
        return new Proposal(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Proposal(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Proposal_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ProposalInit | Comment | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposalInit') {
            body = beginCell().store(storeProposalInit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Comment') {
            body = beginCell().store(storeComment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getIndex(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('index', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}