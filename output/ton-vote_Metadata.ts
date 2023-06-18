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
    dns: string;
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
        b_2.storeStringRefTail(src.dns);
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
    let _dns = sc_2.loadStringRefTail();
    return { $$type: 'MetadataState' as const, avatar: _avatar, name: _name, about: _about, website: _website, terms: _terms, telegram: _telegram, github: _github, jetton: _jetton, nft: _nft, hide: _hide, dns: _dns };
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
    let _dns = source.readString();
    return { $$type: 'MetadataState' as const, avatar: _avatar, name: _name, about: _about, website: _website, terms: _terms, telegram: _telegram, github: _github, jetton: _jetton, nft: _nft, hide: _hide, dns: _dns };
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
    builder.writeString(source.dns);
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

 type Metadata_init_args = {
    $$type: 'Metadata_init_args';
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
    dns: string;
}

function initMetadata_init_args(src: Metadata_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.avatar);
        b_0.storeStringRefTail(src.name);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.about);
        b_1.storeStringRefTail(src.website);
        b_1.storeStringRefTail(src.terms);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.telegram);
        b_2.storeStringRefTail(src.github);
        b_2.storeAddress(src.jetton);
        b_2.storeAddress(src.nft);
        b_2.storeBit(src.hide);
        b_2.storeStringRefTail(src.dns);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Metadata_init(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean, dns: string) {
    const __code = Cell.fromBase64('te6ccgECFAEAA/EAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGts88uCCyPhDAcx/AcoAVaDbPMntVAwEBQIBIAoLAaQBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwBgHAyFALzxbJUAvMyFAJzxbJUAjMyMhQCM8WyVAHzMhQBs8WyVAFzMhQBM8WyVADzMjIUAPPFslYzMhQA88WyVjMWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADCQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwHAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAXiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhTKAMhQA88WyVjMyQHMyQHMAhG9eK7Z5tnjZdwMDQIBIBARAfTtRNDUAfhj0gABjm3UAdAB1AHQAdQB0NQB0AHUAdAB1AHQAdQw0NQB0AHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA1DDQEJsQmmwb4A4AFlR6mFR6mFR6mFOpASL4KNcLCoMJuvLgids8C9FVCQ8A1tQB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDUMNAQmxCaALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgSEwARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1ZS1VnNWE2RHM0aGhXUHVtelozR2IzR1B6ODZ1ZG12UmRxSDdrd1VObnY0dIIA==');
    const __system = Cell.fromBase64('te6cckECFgEAA/sAAQHAAQEFoDu3AgEU/wD0pBP0vPLICwMCAWIMBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtWUtVZzVhNkRzNGhoV1B1bXpaM0diM0dQejg2dWRtdlJkcUg3a3dVTm52NHSCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAhG9eK7Z5tnjZdwTCwAWVHqYVHqYVHqYU6kDmtAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUa2zzy4ILI+EMBzH8BygBVoNs8ye1UEw8NAcDIUAvPFslQC8zIUAnPFslQCMzIyFAIzxbJUAfMyFAGzxbJUAXMyFAEzxbJUAPMyMhQA88WyVjMyFADzxbJWMxYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMOAF4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUygDIUAPPFslYzMkBzMkBzAGkAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcBABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8EQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wASAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAfTtRNDUAfhj0gABjm3UAdAB1AHQAdQB0NQB0AHUAdAB1AHQAdQw0NQB0AHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA1DDQEJsQmmwb4BQBIvgo1wsKgwm68uCJ2zwL0VUJFQDW1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANQw0BCbEJrDtO+a');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMetadata_init_args({ $$type: 'Metadata_init_args', avatar, name, about, website, terms, telegram, github, jetton, nft, hide, dns })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Metadata_errors: { [key: number]: { message: string } } = {
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
}

const Metadata_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MetadataState","header":null,"fields":[{"name":"avatar","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"about","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}},{"name":"terms","type":{"kind":"simple","type":"string","optional":false}},{"name":"telegram","type":{"kind":"simple","type":"string","optional":false}},{"name":"github","type":{"kind":"simple","type":"string","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"hide","type":{"kind":"simple","type":"bool","optional":false}},{"name":"dns","type":{"kind":"simple","type":"string","optional":false}}]},
]

const Metadata_getters: ABIGetter[] = [
    {"name":"state","arguments":[],"returnType":{"kind":"simple","type":"MetadataState","optional":false}},
]

const Metadata_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Metadata implements Contract {
    
    static async init(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean, dns: string) {
        return await Metadata_init(avatar, name, about, website, terms, telegram, github, jetton, nft, hide, dns);
    }
    
    static async fromInit(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean, dns: string) {
        const init = await Metadata_init(avatar, name, about, website, terms, telegram, github, jetton, nft, hide, dns);
        const address = contractAddress(0, init);
        return new Metadata(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Metadata(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Metadata_types,
        getters: Metadata_getters,
        receivers: Metadata_receivers,
        errors: Metadata_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
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
        const result = loadTupleMetadataState(source);
        return result;
    }
    
}