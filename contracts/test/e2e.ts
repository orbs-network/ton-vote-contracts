import { waitForContractToBeDeployed, sleep, initWallet, initDeployKey, prepareParams, } from "./helpers";
import { ProposalDeployer, CreateMessage, storeCreateMessage } from '../output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../output/ton-vote_Proposal'; 
import { Address, CommonMessageInfo, internal, TonClient, WalletContractV3R2, 
        toNano, beginCell, fromNano, Cell, CommonMessageInfoRelaxed} from "ton";
import {ContractProvider, Sender, SenderArguments} from "ton-core";
import { createTestClient4 } from "./utils/createTestClient4";
import { expect } from "chai";
import {Buffer} from "buffer";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import BigNumber from "bignumber.js";
import _ from "lodash";

const BLOCK_TIME = 10000;
const DEPLOYER_MIN_TON = 1;
const SEND_MSG_VALUE = .1;

const OP_NEW_DAO = 0x1;




describe("e2e test suite", () => {
  let balance: number;
  let newBalance: number;
  let res: any;
//   let registryContract: Registry;
//   let daoContract: Dao;
  let proposalDeployerContract: ProposalDeployer;
  let deployWallet: WalletContractV3R2;
  let deployWalletKey: any;
  let payload: Cell;
  let client: TonClient;
  let daoSettings: Cell;
  let sender: Sender;
  
  before(async () => {
    const endpoint = await getHttpEndpoint({network: "testnet"});
    client = new TonClient({ endpoint });

    deployWalletKey = await initDeployKey("");
    let deployWallet = await initWallet(client, deployWalletKey.publicKey);

    sender = {
        address: deployWallet.address,
        async send(args: SenderArguments) {

            const transfer = deployWallet.createTransfer({
                seqno: await deployWallet.getSeqno(),
                sendMode: args.sendMode,
                secretKey: deployWalletKey.secretKey,
                messages: [internal({
                    to: args.to,
                    value: args.value,                    
                    body: args.body,
                    init: args.init
                })]
            });

            return client.sendExternalMessage(deployWallet, transfer);
        }
    }
    
    let proposalDeployerContract = client.open(await ProposalDeployer.fromInit(deployWallet.address));
    await proposalDeployerContract.send(sender, {value: toNano(1), bounce: true}, { $$type: 'CreateMessage' as const, body: null })
    console.log(`proposalDeployerContract: ${proposalDeployerContract.address.toString()}`);
    
    console.log(`deployer contract address: ${deployWallet.address.toString()}`);

    balance = parseFloat(fromNano((await deployWallet.getBalance())));
    if (balance < DEPLOYER_MIN_TON) {
      throw `Deploy wallet balance is too small (${balance}), please send at least ${DEPLOYER_MIN_TON} coins to ${deployWallet.address.toString()}`;
    }
  
  });

  it("Deploy Registry contract", async () => {
    // registryContract = await deployContract(client, deployWallet, deployWalletKey.secretKey, Registry);

  });


  it.only("Deploy proposal deployer contract", async () => {

    // let proposalDeployer_id = 0;
    // let next_child_id = 0;    
    // proposalDeployerContract = await deployContract(client, deployWallet, deployWalletKey.secretKey, ProposalDeployer, {owner: CoreAddress.parse(deployWallet.address.toFriendly())});
    // console.log(Address.parse(proposalDeployerContract.address.toString()));
    // let proposalDeployerAddress = CoreAddressToAddress(proposalDeployerContract.address)

    // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    // let msg: CreateMessage = { $$type: 'CreateMessage' as const, body: null }

    // // let body = new Cell({bits: _beginCell().store(storeCreateMessage(msg)).endCell().bits})
    
    // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, proposalDeployerAddress, SEND_MSG_VALUE, body);

    // // await contract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });

    // // res = await client.callGetMethod(Address.parse(proposalDeployerContract.address.toString()), 'owner');
    // // expect(bytesToAddress(res.stack[0][1].bytes).toFriendly()).to.eq(deployWallet.address.toFriendly());

    // res = await client.callGetMethod(proposalDeployerAddress, 'nextProposalId');
    // expect(Number(res.stack[0][1])).to.eq(1);

    // res = await client.callGetMethod(Address.parse(proposalDeployerContract.address.toString()), 'proposalAddr', prepareParams([0]));
    // console.log(bytesToAddress(res.stack[0][1].bytes));
    
    // expect(bytesToAddress(res.stack[0][1].bytes).toFriendly()).to.eq(deployWallet.address.toFriendly());


  });

  

  it("Deploy new Dao contract", async () => {
    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
    // let next_dao_id = Number(res.stack[0][1]);

    // daoSettings = beginCell().storeUint(0, 64).endCell();
    // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    
    // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);

    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');

    // expect(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
  });

  it("Get tx", async () => {

    // const transactions = await client.getTransactions(registryContract.address, {limit: 500});  
    // console.log(transactions);
    
    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');
    // let next_dao_id = Number(res.stack[0][1]);

    // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);

    // res = await client.callGetMethod(registryContract.address, 'get_next_dao_id');

    // expect(next_dao_id + 1).to.eq(Number(res.stack[0][1]));
  });

  it("Read get_next_dao_id from registry", async () => {
    // daoSettings = beginCell().storeUint(0, 64).endCell();
    // daoContract = Dao.create(registryContract, 0, deployWallet.address, daoSettings);
    // let daoAddr
    // payload = beginCell().storeUint(OP_NEW_DAO, 32).storeRef(daoSettings).endCell();
    // res = await sendMsg(client, deployWallet, deployWalletKey.secretKey, registryContract.address, SEND_MSG_VALUE, payload);
  });

});

