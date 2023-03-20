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

 type Metadata_init_args = {
    $$type: 'Metadata_init_args';
    avatar: string;
    name: string;
    about: string;
    website: string;
    terms: string;
    twitter: string;
    github: string;
    hide: boolean;
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
        b_2.storeStringRefTail(src.twitter);
        b_2.storeStringRefTail(src.github);
        b_2.storeBit(src.hide);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Metadata_init(avatar: string, name: string, about: string, website: string, terms: string, twitter: string, github: string, hide: boolean) {
    const __code = Cell.fromBase64('te6ccgECIwEABYYAART/APSkE/S88sgLAQIBYgIDAX7QAdDTAwFxsMABkX+RcOIB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJVFBTA28E+GEC+GIEAgEgCgsDoO1E0NQB+GPSAAGOK9QB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AHSADAQaBBnbBiOkfgo1wsKgwm68uCJ2zwI0VUG4lUX2zwwIQUGAYJwIddJwh+VMCDXCx/eApJbf+ABghCUapi2uo6i0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8f+AwcAcAqsj4QwHMfwHKAFVwyFAIzxbJUAjMyFAGzxbJUAXMyMhQBc8WyVAEzMhQA88WyVjMyFjPFskBzMjIUATPFslQA8zIUAXPFslQBMwSygDJAczJAczJ7VQBGn/4QnBYA4BCAW1t2zwIAc7IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZQA/oCcAHKaCNusyVus7GXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIAwNAgEgGRoCASAODwIBIBUWAp+21N2omhqAPwx6QAAxxXqAOgA6gDoAOoA6GoA6ADqAOgA6gDoAOoYaGoA6ADqAOgA6QAYCDQIM7YMR0j8FGuFhUGE3XlwRO2eBGiqg3FtnkCEQAgFiERIACBBnXwcCnqoG7UTQ1AH4Y9IAAY4r1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAdIAMBBoEGdsGI6R+CjXCwqDCbry4InbPAjRVQbi2zwhEwKb9dqJoagD8MekAAMcV6gDoAOoA6ADqAOhqAOgA6gDoAOoA6ADqGGhqAOgA6gDoAOkAGAg0CDO2DEdI/BRrhYVBhN15cETtngRoqoNxbZ5IRQABGxxAAYXXwcCn7fznaiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQIRcCn7c6XaiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQIRgACBAnXwcACBBXXwcCASAbHAIBbh4fAp+0+32omhqAPwx6QAAxxXqAOgA6gDoAOoA6GoA6ADqAOgA6gDoAOoYaGoA6ADqAOgA6QAYCDQIM7YMR0j8FGuFhUGE3XlwRO2eBGiqg3FtnkCEdALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJAABF8HAp+ufvaiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQCEgAp+sV3aiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQCEiAAgQN18HAFLUAdAB1AHQAdQB0NQB0AHUAdAB1AHQAdQw0NQB0AHUAdAB0gAwEGgQZwAIEEdfBw==');
    const __system = Cell.fromBase64('te6cckECJQEABZAAAQHAAQEFoDu3AgEU/wD0pBP0vPLICwMCAWIdBAIBIA8FAgEgCwYCAW4JBwKfrFd2omhqAPwx6QAAxxXqAOgA6gDoAOoA6GoA6ADqAOgA6gDoAOoYaGoA6ADqAOgA6QAYCDQIM7YMR0j8FGuFhUGE3XlwRO2eBGiqg3FtnkAkCAAIEEdfBwKfrn72omhqAPwx6QAAxxXqAOgA6gDoAOoA6GoA6ADqAOgA6gDoAOoYaGoA6ADqAOgA6QAYCDQIM7YMR0j8FGuFhUGE3XlwRO2eBGiqg3FtnkAkCgAIEDdfBwIBIA0MALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJACn7T7faiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQJA4ABF8HAgEgFRACASATEQKftzpdqJoagD8MekAAMcV6gDoAOoA6ADqAOhqAOgA6gDoAOoA6ADqGGhqAOgA6gDoAOkAGAg0CDO2DEdI/BRrhYVBhN15cETtngRoqoNxbZ5AkEgAIEFdfBwKft/OdqJoagD8MekAAMcV6gDoAOoA6ADqAOhqAOgA6gDoAOoA6ADqGGhqAOgA6gDoAOkAGAg0CDO2DEdI/BRrhYVBhN15cETtngRoqoNxbZ5AkFAAIECdfBwIBIBsWAgFiGRcCm/XaiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eSQYAAYXXwcCnqoG7UTQ1AH4Y9IAAY4r1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAdIAMBBoEGdsGI6R+CjXCwqDCbry4InbPAjRVQbi2zwkGgAEbHECn7bU3aiaGoA/DHpAADHFeoA6ADqAOgA6gDoagDoAOoA6ADqAOgA6hhoagDoAOoA6ADpABgINAgztgxHSPwUa4WFQYTdeXBE7Z4EaKqDcW2eQJBwACBBnXwcBftAB0NMDAXGwwAGRf5Fw4gH6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IlUUFMDbwT4YQL4Yh4DoO1E0NQB+GPSAAGOK9QB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AHSADAQaBBnbBiOkfgo1wsKgwm68uCJ2zwI0VUG4lUX2zwwJCAfAKrI+EMBzH8BygBVcMhQCM8WyVAIzMhQBs8WyVAFzMjIUAXPFslQBMzIUAPPFslYzMhYzxbJAczIyFAEzxbJUAPMyFAFzxbJUATMEsoAyQHMyQHMye1UAYJwIddJwh+VMCDXCx/eApJbf+ABghCUapi2uo6i0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8f+AwcCEBGn/4QnBYA4BCAW1t2zwiAc7IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJzxZQA/oCcAHKaCNusyVus7GXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAIwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABS1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAdIAMBBoEGeVlium');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMetadata_init_args({ $$type: 'Metadata_init_args', avatar, name, about, website, terms, twitter, github, hide })(builder);
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

export class Metadata implements Contract {
    
    static async init(avatar: string, name: string, about: string, website: string, terms: string, twitter: string, github: string, hide: boolean) {
        return await Metadata_init(avatar, name, about, website, terms, twitter, github, hide);
    }
    
    static async fromInit(avatar: string, name: string, about: string, website: string, terms: string, twitter: string, github: string, hide: boolean) {
        const init = await Metadata_init(avatar, name, about, website, terms, twitter, github, hide);
        const address = contractAddress(0, init);
        return new Metadata(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Metadata(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Metadata_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getAvatar(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('avatar', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getName(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('name', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getAbout(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('about', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getWebsite(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('website', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getTerms(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('terms', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getTwitter(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('twitter', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGithub(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('github', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getHide(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('hide', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}