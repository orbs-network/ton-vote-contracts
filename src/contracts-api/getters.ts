import { min } from "../../contracts/helpers";
import { Registry } from '../../contracts/output/ton-vote_Registry'; 
import { Dao } from '../../contracts/output/ton-vote_Dao'; 
import { Metadata } from '../../contracts/output/ton-vote_Metadata'; 
import { ProposalDeployer } from '../../contracts/output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../../contracts/output/ton-vote_Proposal'; 
import { TonClient, TonClient4 } from "ton";
import { Address } from "ton-core";


export async function getRegistry(client : TonClient) {  
    let registryContract = client.open(await Registry.fromInit());
    return registryContract.address.toString();
}

export async function getDaos(client : TonClient, startId = 0, batchSize=BigInt(10)) {  

  let registryContract = client.open(await Registry.fromInit());
  const nextDaoId = await registryContract.getNextDaoId();
  let daoAddresses = [];

  const endDaoId = min(nextDaoId, batchSize);

  for (let id = BigInt(startId); id <= endDaoId; id++) {
    let daoAddr = await registryContract.getDaoAddress(id);
    daoAddresses.push(daoAddr);
  }

  return {endDaoId, daoAddresses};
}

export async function getDaoMetadata(client : TonClient, daoAddr: string) {  

    let daoContract = client.open(Dao.fromAddress(Address.parse(daoAddr)));
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

export async function getDaoRoles(client : TonClient, daoAddr: string) {  

    let daoContract = client.open(Dao.fromAddress(Address.parse(daoAddr)));

    const id = await daoContract.getDaoIndex();
    const owner = await daoContract.getOwner();
    const proposalOwner = await daoContract.getProposalOwner();

    return {id, owner, proposalOwner};
}

export async function getDaoProposals(client : TonClient, daoAddr: string, startId = 0, batchSize=BigInt(10)) {
    let daoContract = client.open(Dao.fromAddress(Address.parse(daoAddr)));
    let proposalDeployer = client.open(await ProposalDeployer.fromInit(daoContract.address));

    let nextProposalId = await proposalDeployer.getNextProposalId();

    const endProposalId = min(nextProposalId, batchSize);
    let proposalAddresses = [];

    for (let id = BigInt(startId); id <= endProposalId; id++) {
        let daoAddr = await proposalDeployer.getProposalAddr(id);
        proposalAddresses.push(daoAddr.toString());
    }

    return {endProposalId, proposalAddresses};
}

export async function getProposalInfo(client : TonClient, client4: TonClient4, proposalAddr: string) {
    let proposal = client.open(Proposal.fromAddress(Address.parse(proposalAddr)));

    const id = await proposal.getId();
    const owner = await proposal.getOwner();
    const startTime = await proposal.getProposalStartTime();
    const endTime = await proposal.getProposalEndTime();
    const snapshotTime = await proposal.getProposalSnapshotTime();
    const type = await proposal.getProposalType();
    const votingPowerStrategy = await proposal.getVotingPowerStrategy();

    const mcSnapshotBlock = await getBlockFromTime(client4, Number(snapshotTime));
    
    return {id, owner, startTime, endTime, snapshotTime, mcSnapshotBlock, type, votingPowerStrategy};
}

async function getBlockFromTime(clientV4: TonClient4, utime: number) {

    let res = (await clientV4.getBlockByUtime(utime)).shards;
  
    for (let i = 0; i < res.length; i++) {
      if (res[i].workchain == -1) return res[i].seqno;
    }
  
    return -1;
}
  