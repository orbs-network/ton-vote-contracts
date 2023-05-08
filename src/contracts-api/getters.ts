import { min } from "../../contracts/helpers";
import { Registry } from '../../contracts/output/ton-vote_Registry'; 
import { Dao } from '../../contracts/output/ton-vote_Dao'; 
import { Metadata } from '../../contracts/output/ton-vote_Metadata'; 
import { ProposalDeployer } from '../../contracts/output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../../contracts/output/ton-vote_Proposal'; 
import { TonClient, TonClient4 } from "ton";
import { Address } from "ton-core";
import { MetadataArgs, ProposalMetadata } from "./interfaces";


export async function getRegistry(client : TonClient): Promise<Address> {  
    let registryContract = client.open(await Registry.fromInit());
    return registryContract.address;
}

export async function getDaos(client : TonClient, startId = 0, batchSize=BigInt(10)): Promise<{endDaoId: bigint, daoAddresses: Address[]}> {  

  let registryContract = client.open(await Registry.fromInit());
  const nextDaoId = await registryContract.getNextDaoId();
  let daoAddresses = [];

  const endDaoId = min(nextDaoId, batchSize);

  for (let id = BigInt(startId); id < endDaoId; id++) {
    let daoAddr = await registryContract.getDaoAddress(id);
    daoAddresses.push(daoAddr);
  }

  return {endDaoId, daoAddresses};
}

export async function getDaoMetadata(client : TonClient, daoAddr: Address): Promise<MetadataArgs> {  

    let daoContract = client.open(Dao.fromAddress(daoAddr));
    const metadataAddr = await daoContract.getMetadata();

    const metadataContract = client.open(Metadata.fromAddress(metadataAddr));
    
    const about   = await metadataContract.getAbout();
    const avatar  = await metadataContract.getAvatar();
    const github  = await metadataContract.getGithub();
    const hide    = await metadataContract.getHide();
    const name    = await metadataContract.getName();
    const terms   = await metadataContract.getTerms();
    const twitter = await metadataContract.getTwitter();
    const website = await metadataContract.getWebsite();

    return {about, avatar, github, hide, name, terms, twitter, website};
}

export async function getDaoRoles(client : TonClient, daoAddr: Address): Promise<{id: bigint, owner: Address, proposalOwner: Address}> {  

    let daoContract = client.open(Dao.fromAddress(daoAddr));

    const id = await daoContract.getDaoIndex();
    const owner = await daoContract.getOwner();
    const proposalOwner = await daoContract.getProposalOwner();

    return {id, owner, proposalOwner};
}

export async function getDaoProposals(client : TonClient, daoAddr: Address, startId = 0, batchSize=BigInt(10)): Promise<{endProposalId: bigint, proposalAddresses: Address[]}> {
    let daoContract = client.open(Dao.fromAddress(daoAddr));
    let proposalDeployer = client.open(await ProposalDeployer.fromInit(daoContract.address));

    let nextProposalId = await proposalDeployer.getNextProposalId();

    const endProposalId = min(nextProposalId, batchSize);
    let proposalAddresses = [];

    for (let id = BigInt(startId); id < endProposalId; id++) {
        let daoAddr = await proposalDeployer.getProposalAddr(id);
        proposalAddresses.push(daoAddr);
    }

    return {endProposalId, proposalAddresses};
}


export async function getProposalInfo(client : TonClient, client4: TonClient4, proposalAddr: Address): Promise<ProposalMetadata> {
    let proposal = client.open(Proposal.fromAddress(proposalAddr));

    const id = await proposal.getId();
    const owner = await proposal.getOwner();
    const proposalStartTime = await proposal.getProposalStartTime();
    const proposalEndTime = await proposal.getProposalEndTime();
    const proposalSnapshotTime = await proposal.getProposalSnapshotTime();
    const proposalType = await proposal.getProposalType();
    const votingPowerStrategies = await proposal.getvotingPowerStrategies();

    const mcSnapshotBlock = await getBlockFromTime(client4, Number(proposalSnapshotTime));
    
    return {id, owner, mcSnapshotBlock, proposalStartTime, proposalEndTime, proposalSnapshotTime, proposalType, votingPowerStrategies};
}

async function getBlockFromTime(clientV4: TonClient4, utime: number): Promise<number> {

    let res = (await clientV4.getBlockByUtime(utime)).shards;
  
    for (let i = 0; i < res.length; i++) {
      if (res[i].workchain == -1) return res[i].seqno;
    }
  
    return -1;
}
  