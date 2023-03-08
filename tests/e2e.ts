import { waitForContractToBeDeployed, sleep, initWallet, initDeployKey } from "./helpers";
import { Registry } from "../contracts-ts/registry";
import { Dao } from "../contracts-ts/dao";
import { Proxy } from "../contracts-ts/proxy";
import { Address, CellMessage, CommonMessageInfo, InternalMessage, TonClient, TonClient4, WalletContract, 
        toNano, StateInit, beginCell, fromNano, Cell, parseTransaction} from "ton";

import {waitForSeqno, compileFuncToB64} from "./helpers";
import { expect } from "chai";
import {Buffer} from "buffer";
import { getHttpEndpoint } from "@orbs-network/ton-access";

import BigNumber from "bignumber.js";
import _ from "lodash";


const elector = Address.parse("Ef8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0vF");

const BLOCK_TIME = 10000;
const DEPLOYER_MIN_TON = 1;
const SEND_MSG_VALUE = .1;

const OP_NEW_DAO = 0x1;


function buildMessage(op: number | null, query_id: number, eitherBit = false, amount = 0) {
  if (op == null) return beginCell().endCell();

  let cell = beginCell()
  				.storeUint(op, 32)
  				.storeUint(query_id, 64)
  				.storeCoins(toNano(amount.toFixed(2)))
				.storeUint(0, 256) // validator_pubkey
				.storeUint(0, 32) // stake_at
				.storeUint(0, 32) // max_factor
				.storeUint(0, 256) // adnl_addr

  if (eitherBit) {
	  cell.storeRef(beginCell().storeUint(0, 256).endCell()) // signature
  }

  return cell.endCell();
}

function parseTxDetails(data: any) {
    const currentContract = data["inMessage"]["destination"];
    let boc = Cell.fromBoc(Buffer.from(data.data, "base64"));
    const wc = Address.parse(currentContract.toString()).workChain;
    return parseTransaction(wc, boc[0].beginParse());
}

async function deployContract(
  client: TonClient,
  walletContract: WalletContract,
  privateKey: Buffer,
  contract: any,
  contractParams: any = undefined
) {
  contract = contract.create(...Object.values(contractParams));
  
  if (await client.isContractDeployed(contract.address)) {
    console.log(`contract: ${contract.address.toFriendly()} already Deployed`);
    return contract;
  }

  const seqno = await walletContract.getSeqNo();
  const transfer = walletContract.createTransfer({
    secretKey: privateKey,
    seqno: seqno,
    sendMode: 1 + 2,
    order: new InternalMessage({
      to: contract.address,
      value: toNano(0.5),
      bounce: false,
      body: new CommonMessageInfo({
        stateInit: new StateInit({ data: contract.source.initialData, code: contract.source.initialCode }),
        body: null,
      }),
    }),
  });

  await client.sendExternalMessage(walletContract, transfer);
  await waitForContractToBeDeployed(client, contract.address);
  console.log(`- Deploy transaction sent successfully (registry contract) to -> ${contract.address.toFriendly()} [seqno:${seqno}]`);
  await sleep(BLOCK_TIME);
  return contract;
}

async function sendMsg(
  client: TonClient,
  walletContract: WalletContract,
  privateKey: Buffer,
  dest: Address,
  msg_value: number,
  payload: Cell
) {
  let seqno = await walletContract.getSeqNo();

  console.log(`send message to ${dest.toFriendly()}`);
  
  const transfer = walletContract.createTransfer({
    secretKey: privateKey,
    seqno: seqno,
    sendMode: 1 + 2,
    order: new InternalMessage({
      to: dest,
      value: toNano(msg_value),
      bounce: true,
      body: new CommonMessageInfo({
        body: new CellMessage(payload)
	  }),
    }),
  });

  try {
    await client.sendExternalMessage(walletContract, transfer);
  } catch (e) {
    return false;
  }

  console.log(`- transaction sent successfully to ${dest.toFriendly()} [wallet seqno:${seqno}]`);
  await sleep(BLOCK_TIME);
  return true;
}

describe("e2e test suite", () => {
  let balance: number;
  let newBalance: number;
  let res: any;
  let registryContract: Registry;
  let proxyContract: Proxy;
  let daoContract: Dao;
  let deployWallet: WalletContract;
  let deployWalletKey: any;
  let payload: Cell;
  let client: TonClient;
  let daoSettings: Cell;
  
  before(async () => {
    const endpoint = await getHttpEndpoint({network: "testnet"});
    client = new TonClient({ endpoint });

    deployWalletKey = await initDeployKey("");
    deployWallet = await initWallet(client, deployWalletKey.publicKey);

    console.log(`deployer contract address: ${deployWallet.address.toFriendly()}`);

    balance = parseFloat(fromNano((await client.getBalance(deployWallet.address)).toNumber()));
    if (balance < DEPLOYER_MIN_TON) {
      throw `Deploy wallet balance is too small (${balance}), please send at least ${DEPLOYER_MIN_TON} coins to ${deployWallet.address.toFriendly()}`;
    }

  });

  it("Deploy Registry contract", async () => {
    registryContract = await deployContract(client, deployWallet, deployWalletKey.secretKey, Registry);

  });

  it.only("Deploy Proxy contract", async () => {

    let proxy_id = 0;
    let next_child_id = 0;
    proxyContract = await deployContract(client, deployWallet, deployWalletKey.secretKey, Proxy, 
      {owner: deployWallet.address, proxyId: proxy_id, next_child_id: next_child_id, parent_addr: deployWallet.address, content: beginCell().storeUint(0xcaffe, 64).endCell()});

    res = await client.callGetMethod(proxyContract.address, 'get_owner_addr');
    expect(bytesToAddress(res.stack[0][1].bytes).toFriendly()).to.eq(deployWallet.address.toFriendly());

    res = await client.callGetMethod(proxyContract.address, 'get_proxy_id');
    expect(Number(res.stack[0][1])).to.eq(proxy_id);

    res = await client.callGetMethod(proxyContract.address, 'get_next_child_id');
    expect(Number(res.stack[0][1])).to.eq(next_child_id);

  });

  it("Deploy new Dao contract", async () => {
    res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
    let next_dao_id = Number(res.stack[0][1]);

    daoSettings = beginCell().storeUint(0, 64).endCell();
    payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    
    res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);

    res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');

    expect(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
  });

  it("Get tx", async () => {

    const transactions = await client.getTransactions(registryContract.address, {limit: 500});  
    console.log(transactions);
    
    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
    // let next_dao_id = Number(res.stack[0][1]);

    // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);

    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');

    // expect(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
  });

  it("Read get_next_dao_id from registry", async () => {
    daoSettings = beginCell().storeUint(0, 64).endCell();
    daoContract = Dao.create(registryContract, 0, deployWallet.address, daoSettings);
    let daoAddr
    payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);
  });

});


function bytesToAddress(bufferB64: string) {
    const buff = Buffer.from(bufferB64, "base64");
    let c2 = Cell.fromBoc(buff);
    return c2[0].beginParse().readAddress() as Address;
}
