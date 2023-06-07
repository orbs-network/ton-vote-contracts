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
    hide: boolean;
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
        b_1.storeBit(src.hide);
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
    let _hide = sc_1.loadBit();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum, hide: _hide };
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
    let _hide = source.readBoolean();
    return { $$type: 'Params' as const, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum, hide: _hide };
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
    builder.writeBoolean(source.hide);
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
        b_0.storeUint(1008560988, 32);
        b_0.store(storeParams(src.body));
    };
}

export function loadProposalInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1008560988) { throw Error('Invalid prefix'); }
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

export type Vote = {
    $$type: 'Vote';
    comment: string;
}

export function storeVote(src: Vote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2084703906, 32);
        b_0.storeStringRefTail(src.comment);
    };
}

export function loadVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2084703906) { throw Error('Invalid prefix'); }
    let _comment = sc_0.loadStringRefTail();
    return { $$type: 'Vote' as const, comment: _comment };
}

function loadTupleVote(source: TupleReader) {
    let _comment = source.readString();
    return { $$type: 'Vote' as const, comment: _comment };
}

function storeTupleVote(source: Vote) {
    let builder = new TupleBuilder();
    builder.writeString(source.comment);
    return builder.build();
}

function dictValueParserVote(): DictionaryValue<Vote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVote(src)).endCell());
        },
        parse: (src) => {
            return loadVote(src.loadRef().beginParse());
        }
    }
}

export type UpdateProposal = {
    $$type: 'UpdateProposal';
    updateParams: Params;
}

export function storeUpdateProposal(src: UpdateProposal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(817223820, 32);
        b_0.store(storeParams(src.updateParams));
    };
}

export function loadUpdateProposal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 817223820) { throw Error('Invalid prefix'); }
    let _updateParams = loadParams(sc_0);
    return { $$type: 'UpdateProposal' as const, updateParams: _updateParams };
}

function loadTupleUpdateProposal(source: TupleReader) {
    const _updateParams = loadTupleParams(source.readTuple());
    return { $$type: 'UpdateProposal' as const, updateParams: _updateParams };
}

function storeTupleUpdateProposal(source: UpdateProposal) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleParams(source.updateParams));
    return builder.build();
}

function dictValueParserUpdateProposal(): DictionaryValue<UpdateProposal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateProposal(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProposal(src.loadRef().beginParse());
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
    hide: boolean;
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
        b_1.storeBit(src.hide);
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
    let _hide = sc_1.loadBit();
    return { $$type: 'ProposalContractState' as const, proposalDeployer: _proposalDeployer, id: _id, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum, hide: _hide };
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
    let _hide = source.readBoolean();
    return { $$type: 'ProposalContractState' as const, proposalDeployer: _proposalDeployer, id: _id, proposalStartTime: _proposalStartTime, proposalEndTime: _proposalEndTime, proposalSnapshotTime: _proposalSnapshotTime, votingSystem: _votingSystem, votingPowerStrategies: _votingPowerStrategies, title: _title, description: _description, quorum: _quorum, hide: _hide };
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
    builder.writeBoolean(source.hide);
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

 type Proposal_init_args = {
    $$type: 'Proposal_init_args';
    proposalDeployer: Address;
    id: bigint;
}

function initProposal_init_args(src: Proposal_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.proposalDeployer);
        b_0.storeInt(src.id, 257);
    };
}

async function Proposal_init(proposalDeployer: Address, id: bigint) {
    const __code = Cell.fromBase64('te6ccgECFwEABFwAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGts88uCCDwQFAgEgDQ4E7gGSMH/gcCHXScIflTAg1wsf3iCCEDwda1y6jr8w0x8BghA8HWtcuvLggds8bBk5OTk5OTmBC6EMwACTCsAAkjpw4pMIwACSOHDiGvL0gRFN+EJSwMcF8vQQZ3/gIIIQfEIOorrjAiCCEDC12Iy64wKCEJRqmLa6CQYHCADOyPhDAcx/AcoAVaBQuiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhjLHxbLPxTLPxLLP8hYzxbJAczIWM8WyQHMyMhQA88WyVjMyFADzxbJWMzIUATPFslQA8zKAMkBzMntVABMMNMfAYIQfEIOorry4IHUAdAxMIIAzG74Iyq+lPgjKbuRcOLy9H8BkjDTHwGCEDC12Iy68uCB2zxsGTk5OTk5OYIA714swwCTC8MAkjtw4pMJwwCSOXDiGvL0gRFN+EJS0McF8vSBItv4I1ALuxry9H8JAViOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAoAWNM/0z/TP9QB0AHUAdAB1AHQAdQB0NQB0AHUAdAB0gAwEDkQOBA3EDYQNRA0ATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRvXiu2ebZ42XcDxACASATFAHU7UTQ1AH4Y9IAAY5S+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9M/0z/TP9QB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB0gAwEEsQShBJEEgQRxBGEEVsG+D4KNcLCoMJuvLgiREAFlR6mFR6mFR6mFOpAVb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8EgAccFMAiwiLCIsIiwiLCHAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAIBSBUWABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVJvWlhNVUpjYVhLYzM2U3BBeTZKUjJ6b2d3SzNwZXh6NXNLb1hHSlpHTG1Fgg');
    const __system = Cell.fromBase64('te6cckECGQEABGYAAQHAAQEFoGJdAgEU/wD0pBP0vPLICwMCAWIMBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUm9aWE1VSmNhWEtjMzZTcEF5NkpSMnpvZ3dLM3BleHo1c0tvWEdKWkdMbUWCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAhG9eK7Z5tnjZdwWCwAWVHqYVHqYVHqYU6kDetAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUa2zzy4IIWDg0Azsj4QwHMfwHKAFWgULog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYyx8Wyz8Uyz8Syz/IWM8WyQHMyFjPFskBzMjIUAPPFslYzMhQA88WyVjMyFAEzxbJUAPMygDJAczJ7VQE7gGSMH/gcCHXScIflTAg1wsf3iCCEDwda1y6jr8w0x8BghA8HWtcuvLggds8bBk5OTk5OTmBC6EMwACTCsAAkjpw4pMIwACSOHDiGvL0gRFN+EJSwMcF8vQQZ3/gIIIQfEIOorrjAiCCEDC12Iy64wKCEJRqmLa6FRQTDwFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAQATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBEByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAGSMNMfAYIQMLXYjLry4IHbPGwZOTk5OTk5ggDvXizDAJMLwwCSO3DikwnDAJI5cOIa8vSBEU34QlLQxwXy9IEi2/gjUAu7GvL0fxUATDDTHwGCEHxCDqK68uCB1AHQMTCCAMxu+CMqvpT4Iym7kXDi8vR/AFjTP9M/0z/UAdAB1AHQAdQB0AHUAdDUAdAB1AHQAdIAMBA5EDgQNxA2EDUQNAHU7UTQ1AH4Y9IAAY5S+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9M/0z/TP9QB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB0gAwEEsQShBJEEgQRxBGEEVsG+D4KNcLCoMJuvLgiRcBVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwYABxwUwCLCIsIiwiLCIsIcIuEzpQ=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProposal_init_args({ $$type: 'Proposal_init_args', proposalDeployer, id })(builder);
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
    8923: { message: `Update proposals is possible only before start time` },
    52334: { message: `Incative proposal` },
    61278: { message: `Propsal was not initialized yet` },
}

const Proposal_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Params","header":null,"fields":[{"name":"proposalStartTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalEndTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalSnapshotTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votingSystem","type":{"kind":"simple","type":"string","optional":false}},{"name":"votingPowerStrategies","type":{"kind":"simple","type":"string","optional":false}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"quorum","type":{"kind":"simple","type":"string","optional":false}},{"name":"hide","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ProposalInit","header":1008560988,"fields":[{"name":"body","type":{"kind":"simple","type":"Params","optional":false}}]},
    {"name":"Vote","header":2084703906,"fields":[{"name":"comment","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateProposal","header":817223820,"fields":[{"name":"updateParams","type":{"kind":"simple","type":"Params","optional":false}}]},
    {"name":"ProposalContractState","header":null,"fields":[{"name":"proposalDeployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"proposalStartTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalEndTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"proposalSnapshotTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votingSystem","type":{"kind":"simple","type":"string","optional":false}},{"name":"votingPowerStrategies","type":{"kind":"simple","type":"string","optional":false}},{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"quorum","type":{"kind":"simple","type":"string","optional":false}},{"name":"hide","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const Proposal_getters: ABIGetter[] = [
    {"name":"state","arguments":[],"returnType":{"kind":"simple","type":"ProposalContractState","optional":false}},
]

const Proposal_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ProposalInit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Vote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateProposal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Proposal implements Contract {
    
    static async init(proposalDeployer: Address, id: bigint) {
        return await Proposal_init(proposalDeployer, id);
    }
    
    static async fromInit(proposalDeployer: Address, id: bigint) {
        const init = await Proposal_init(proposalDeployer, id);
        const address = contractAddress(0, init);
        return new Proposal(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Proposal(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Proposal_types,
        getters: Proposal_getters,
        receivers: Proposal_receivers,
        errors: Proposal_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ProposalInit | Vote | UpdateProposal | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposalInit') {
            body = beginCell().store(storeProposalInit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Vote') {
            body = beginCell().store(storeVote(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProposal') {
            body = beginCell().store(storeUpdateProposal(message)).endCell();
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
        const result = loadTupleProposalContractState(source);
        return result;
    }
    
}