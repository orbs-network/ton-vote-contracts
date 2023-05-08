import { initWallet, initDeployKey, sleep} from "../helpers";
import { Registry } from '../output/ton-vote_Registry'; 
import { Dao } from '../output/ton-vote_Dao'; 
import { Metadata } from '../output/ton-vote_Metadata'; 
import { ProposalDeployer, storeCreateProposal } from '../output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../output/ton-vote_Proposal'; 
import { internal, TonClient, toNano, beginCell} from "ton";
import {SenderArguments} from "ton-core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import * as fs from 'fs';

const NETWORK = 'mainnet';

async function deployAllContracts() {
  
  const endpoint = await getHttpEndpoint({network: NETWORK});
  const client = new TonClient({ endpoint });

  const deployWalletKey = await initDeployKey("");
  let deployWallet = await initWallet(client, deployWalletKey.publicKey);

  const sender = {
      address: deployWallet.address,
      async send(args: SenderArguments) {

          const transfer = deployWallet.createTransfer({
              seqno: await deployWallet.getSeqno(),
              sendMode: 64, //args.sendMode,
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

  // ------------------------------------
  // Metadata
  // ------------------------------------
  console.log('=======================================');
  console.log('Deploying Metadata contract ... ');
  
  let metadataContract = client.open(await Metadata.fromInit("avatar-test", "name-test", "about-test", "website-test", "terms-test", "twitter-test", "github-test", false));        
  if (await client.isContractDeployed(metadataContract.address)) {
    console.log("Contract already deployed");
  } else {
    await metadataContract.send(sender, { value: toNano('0.25') }, { $$type: 'Deploy' as const, queryId: 0n });
  }
  console.log(`Metadata contract address: ${metadataContract.address.toString()}`);

  // ------------------------------------
  // Registry
  // ------------------------------------
  console.log('=======================================');
  console.log('Deploying Registry contract ... ');

  let registryContract = client.open(await Registry.fromInit());

  if (await client.isContractDeployed(registryContract.address)) {
    console.log("Contract already deployed");
  
  } else {
    await registryContract.send(sender, { value: toNano('0.25') }, { $$type: 'Deploy' as const, queryId: 0n });    
  }
  console.log(`Registry contract address: ${registryContract.address.toString()}`);

  // ------------------------------------
  // Dao
  // ------------------------------------
  console.log('=======================================');
  console.log('Deploying Dao contract ... ');
  let nextDaoId = Number(await registryContract.getNextDaoId());
    
  let daoContract = client.open(await Dao.fromInit(registryContract.address, 0n));
  if (await client.isContractDeployed(daoContract.address)) {
    console.log("Contract already deployed");
  
  } else {
    await registryContract.send(sender, { value: toNano('1') }, 
    { 
        $$type: 'CreateDao', owner: sender.address, proposalOwner: sender.address, metadata: metadataContract.address
    });

    sleep(10000);
    let newNextDaoId = Number(await registryContract.getNextDaoId());
    if (nextDaoId +1 != newNextDaoId) throw new Error(`wrong nextDaoId (expected=${nextDaoId+1}, value=${newNextDaoId})`);

    let daoAddress = await registryContract.getDaoAddress(BigInt(nextDaoId));
    daoContract = client.open(Dao.fromAddress(daoAddress));
    let daoOwner = await daoContract.getOwner();
    
    if (daoOwner.toString() != sender.address.toString()) throw new Error(`unexpected Dao owner (expected=${sender.address.toString()}, value=${daoOwner.toString()})`);
  }
  console.log(`Dao contract address: ${daoContract.address.toString()}`);

  // ------------------------------------
  // Proposal Deployer + Proposal
  // ------------------------------------
  console.log('=======================================');
  console.log('Deploying ProposalDeployer and Proposal contracts ... ');

  let proposalDeployer = client.open(await ProposalDeployer.fromInit(daoContract.address));
  if (await client.isContractDeployed(proposalDeployer.address)) {
    console.log("Contract already deployed");
  
  } else {

    if (!proposalDeployer.init) throw ('proposalDeployer init is undefined');

    console.log(`proposalDeployer.address = ${proposalDeployer.address}`);
    
    // here we deploy proposalDeployer and Proposal contracts
    await daoContract.send(sender, { value: toNano('0.5') }, 
        { 
            $$type: 'FwdMsg', fwdMsg: {
                $$type: 'SendParameters', 
                bounce: true,
                to: proposalDeployer.address,
                value: toNano(0),
                mode: 64n,
                body: beginCell().store(storeCreateProposal({
                    $$type: 'CreateProposal',
                    body: {
                        $$type: 'Params',
                        proposalStartTime: 0n,
                        proposalEndTime: 2341659973n,
                        proposalSnapshotTime: 1679312645n,
                        proposalType: 0n,
                        votingPowerStrategies: 0n
                    }
                })).endCell(),
                code: proposalDeployer.init?.code,
                data: proposalDeployer.init?.data
            }
        }
    );            
    sleep(10000);
  }

  // nextProposalId should be increased after deployment
  let nextProposalId = await proposalDeployer.getNextProposalId();
  if (Number(nextProposalId) != 1) throw new Error(`unexpected nextProposalId (expected=${1}, value=${nextProposalId})`);

  let proposalIndex = BigInt(0);
  let proposalAddr = await proposalDeployer.getProposalAddr(proposalIndex);
  let proposal = client.open(await Proposal.fromInit(proposalDeployer.address, proposalIndex));

  if (proposalAddr.toString() != proposal.address.toString()) throw new Error(`unexpected proposal address (expected=${proposal.address.toString()}, value=${proposalAddr})`);

  let proposalOwner = await proposal.getOwner();
  if (proposalOwner.toString() != proposalDeployer.address.toString()) throw new Error(`unexpected proposal owner (expected=${proposalDeployer.address.toString()}, value=${proposalOwner.toString()})`);

  console.log(`ProposalDeployer contract address: ${proposalDeployer.address.toString()}`);
  console.log(`Proposal contract address: ${proposal.address.toString()}`);
  
  const allContractsAddresses = {

    Registry: registryContract.address.toString(),
    Dao: daoContract.address.toString(),
    Metadata: metadataContract.address.toString(),
    ProposalDeployer: proposalDeployer.address.toString(),
    Proposal: proposal.address.toString()
  }

  const fileName = `./deploy/${NETWORK}-all-contracts.json`

  fs.writeFileSync(fileName, JSON.stringify(allContractsAddresses)); // Write data to file synchronously
  console.log(`Contracts addresses were written to ${fileName}`);
}

deployAllContracts()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
