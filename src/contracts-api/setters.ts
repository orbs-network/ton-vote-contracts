import { min, sleep, waitForConditionChange } from "../../contracts/helpers";
import { Registry } from '../../contracts/output/ton-vote_Registry'; 
import { Dao } from '../../contracts/output/ton-vote_Dao'; 
import { Metadata } from '../../contracts/output/ton-vote_Metadata'; 
import { ProposalDeployer, storeCreateProposal } from '../../contracts/output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../../contracts/output/ton-vote_Proposal'; 
import { TonClient, TonClient4 } from "ton";
import { Address, Sender, toNano, beginCell } from "ton-core";

interface MetadataArgs {
    avatar: string;
    name: string;
    about: string;
    website: string; 
    terms: string; 
    twitter: string; 
    github: string; 
    hide: boolean;
}

const DAO_DEPLOY_VALUE = 1;
const PROPOSAL_DEPLOY_VALUE = 0.5;

export async function newDao(sender: Sender, client : TonClient, metadataAddr: Address, ownerAddr: Address, proposalOwner: Address): Promise<Address | boolean> {  

    if (!sender.address) {
        console.log(`sender address is not defined`);        
        return false;
    };
    
    let registryContract = client.open(await Registry.fromInit());
    const nextDaoId = await registryContract.getNextDaoId();

    let daoContract = client.open(await Dao.fromInit(registryContract.address, nextDaoId));
    
    if (await client.isContractDeployed(daoContract.address)) {
        
        console.log("Contract already deployed");
        return daoContract.address;
    
    } else {
                
        await registryContract.send(sender, { value: toNano(DAO_DEPLOY_VALUE) }, 
        { 
            $$type: 'CreateDao', 
            owner: ownerAddr, 
            proposalOwner: proposalOwner, 
            metadata: metadataAddr
        });

        return await waitForConditionChange(registryContract.getNextDaoId, [], nextDaoId) && daoContract.address;
    }
    
}

export async function newMetdata(sender: Sender, client : TonClient, metadataArgs: MetadataArgs): Promise<Address | boolean> {  

    if (!sender.address) {
        console.log(`sender address is not defined`);
        
        return false;
    };
    
    let metadataContract = client.open(await Metadata.fromInit(
        metadataArgs.avatar, metadataArgs.name, metadataArgs.about, 
        metadataArgs.website, metadataArgs.terms, metadataArgs.twitter, 
        metadataArgs.github, metadataArgs.hide));        
    

    if (await client.isContractDeployed(metadataContract.address)) {
        console.log("Contract already deployed");
        return metadataContract.address;

    } else {
        await metadataContract.send(sender, { value: toNano('0.25') }, { $$type: 'Deploy' as const, queryId: 0n });
    }

    return await waitForConditionChange(client.isContractDeployed, [metadataContract.address], false) && metadataContract.address;
}

export async function newProposal(sender: Sender, client : TonClient, daoAddr: Address): Promise<Address | boolean> {  

    if (!sender.address) {
        console.log(`sender address is not defined`);        
        return false;
    };
    
    let daoContract = client.open(Dao.fromAddress(daoAddr));

    if (!(await client.isContractDeployed(daoContract.address))) {        
        console.log("Dao contract is not deployed");
        return false;
    }

    let proposalDeployerContract = client.open(await ProposalDeployer.fromInit(daoAddr));
    if (!proposalDeployerContract.init) {
        console.log('proposalDeployer init is undefined');
        return false;
    }

    let code = null, data = null;
    let nextProposalId = -1n;

    if (await client.isContractDeployed(proposalDeployerContract.address)) {        
        code = proposalDeployerContract.init.code;
        data = proposalDeployerContract.init.data;
        nextProposalId = await proposalDeployerContract.getNextProposalId();
    }

    await daoContract.send(sender, { value: toNano(PROPOSAL_DEPLOY_VALUE) }, 
        { 
            $$type: 'FwdMsg', fwdMsg: {
                $$type: 'SendParameters', 
                bounce: true,
                to: proposalDeployerContract.address,
                value: toNano(0),
                mode: 64n,
                body: beginCell().store(storeCreateProposal({
                    $$type: 'CreateProposal',
                    body: {
                        $$type: 'Params',
                        proposalStartTime: 0n,
                        proposalEndTime: 2341659973n,
                        proposalSnapshotTime: 1678885573n,
                        proposalType: 0n,
                        votingPowerStrategy: 0n
                    }
                })).endCell(),
                code: code,
                data: data
            }
        }
    );      

    let proposalContract = await Proposal.fromInit(proposalDeployerContract.address, nextProposalId+1n);
    
    return await waitForConditionChange(proposalDeployerContract.getNextProposalId, [], nextProposalId) && proposalContract.address;
}