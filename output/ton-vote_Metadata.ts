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
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Metadata_init(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean) {
    const __code = Cell.fromBase64('te6ccgECLwEABIUAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGds88uCCyPhDAcx/AcoAVZDbPMntVCsEBQIBIAoLAYoBkjB/4HAh10nCH5UwINcLH96CEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAGAcDIUArPFslQCszIUAjPFslQB8zIyFAHzxbJUAbMyFAFzxbJUATMyFADzxbJWMzIyFADzxbJWMzIUAPPFslYzFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQJATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAcByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABOINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsoAyQHMyQHMAgEgHB0CASAMDQIBIA4PAgEgERICEbT7e2ebZ42UMCsQALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJAAAikCASATFAIBWBUWABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWVTYkZwODhSZEQ4OWhoOVU4UkZyRHdXWlhVRFNzREFKYnc5NjJXYmFWOWJEggAhGufu2ebZ42UMArFwIBYhgZAAIlAg+iu2zzbPGyhisaAg+ih2zzbPGyhisbAAImAAIiAgEgHh8CEbudLbPNs8bKGCssAgFYICECAWIkJQIRr1Ntnm2eNlDAKyICEa/67Z5tnjZQwCsjAAIoAAIhAgEgJicCDfW2ebZ42UMrKgIPpFe2ebZ42UMrKAIPpA22ebZ42UMrKQACJAACIAACIwH07UTQ1AH4Y9IAAY5r1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSADAQihCJbBrg+CgtAAInAR7XCwqDCbry4InbPArRVQguANLUAdAB1AHQAdQB0NQB0AHUAdAB1AHQAdQw0NQB0AHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAMBCKEIk=');
    const __system = Cell.fromBase64('te6cckECMQEABI8AAQHAAQEFoDu3AgEU/wD0pBP0vPLICwMCAWInBAIBIBYFAgEgEgYCASAPBwIBWA0IAgFiCwkCD6KHbPNs8bKGLgoAAiICD6K7bPNs8bKGLgwAAiYCEa5+7Z5tnjZQwC4OAAIlAgEgERAAdbJu40NWlwZnM6Ly9RbWVTYkZwODhSZEQ4OWhoOVU4UkZyRHdXWlhVRFNzREFKYnc5NjJXYmFWOWJEggABGwr7tRNDSAAGACASAUEwC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAhG0+3tnm2eNlDAuFQACKQIBIBkXAhG7nS2zzbPGyhguGAACJwIBICIaAgFiHRsCDfW2ebZ42UMuHAACIwIBICAeAg+kDbZ5tnjZQy4fAAIgAg+kV7Z5tnjZQy4hAAIkAgFYJSMCEa/67Z5tnjZQwC4kAAIhAhGvU22ebZ42UMAuJgACKAOa0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRnbPPLggsj4QwHMfwHKAFWQ2zzJ7VQuKigBwMhQCs8WyVAKzMhQCM8WyVAHzMjIUAfPFslQBszIUAXPFslQBMzIUAPPFslYzMjIUAPPFslYzMhQA88WyVjMUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBCkATiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLKAMkBzMkBzAGKAZIwf+BwIddJwh+VMCDXCx/eghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwKwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwsAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AC0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB9O1E0NQB+GPSAAGOa9QB0AHUAdAB1AHQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gAwEIoQiWwa4PgoLwEe1wsKgwm68uCJ2zwK0VUIMADS1AHQAdQB0AHUAdDUAdAB1AHQAdQB0AHUMNDUAdAB1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSADAQihCJUAWePw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMetadata_init_args({ $$type: 'Metadata_init_args', avatar, name, about, website, terms, telegram, github, jetton, nft, hide })(builder);
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
]

const Metadata_getters: ABIGetter[] = [
    {"name":"avatar","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"name","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"about","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"website","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"terms","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"telegram","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"github","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"jetton","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"nft","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"hide","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const Metadata_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Metadata implements Contract {
    
    static async init(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean) {
        return await Metadata_init(avatar, name, about, website, terms, telegram, github, jetton, nft, hide);
    }
    
    static async fromInit(avatar: string, name: string, about: string, website: string, terms: string, telegram: string, github: string, jetton: Address, nft: Address, hide: boolean) {
        const init = await Metadata_init(avatar, name, about, website, terms, telegram, github, jetton, nft, hide);
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
    
    async getTelegram(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('telegram', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGithub(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('github', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getJetton(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('jetton', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getNft(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('nft', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getHide(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('hide', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}