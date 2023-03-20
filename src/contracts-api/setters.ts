import { min, sleep } from "../../contracts/helpers";
import { Registry } from '../../contracts/output/ton-vote_Registry'; 
import { Dao } from '../../contracts/output/ton-vote_Dao'; 
import { Metadata } from '../../contracts/output/ton-vote_Metadata'; 
import { ProposalDeployer } from '../../contracts/output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../../contracts/output/ton-vote_Proposal'; 
import { TonClient, TonClient4 } from "ton";
import { Address, Sender, toNano } from "ton-core";

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

export async function newDao(sender: Sender, client : TonClient, metadataAddr: Address, ownerAddr: Address, proposalOwner: Address) {  

    if (!sender.address) {
        console.log(`sender address is not defined`);
        
        return -1
    };
    
    let registryContract = client.open(await Registry.fromInit());
    const nextDaoId = await registryContract.getNextDaoId();

    let daoContract = client.open(await Dao.fromInit(registryContract.address, nextDaoId));
    
    if (await client.isContractDeployed(daoContract.address)) {
        
        console.log("Contract already deployed");
        return -1;
    
    } else {
                
        await registryContract.send(sender, { value: toNano('1') }, 
        { 
            $$type: 'CreateDao', 
            owner: ownerAddr, 
            proposalOwner: proposalOwner, 
            metadata: metadataAddr
        });

        let newNextDaoId;
        let count = 0;
        
        do {            
            sleep(3000);
            newNextDaoId = await registryContract.getNextDaoId();
            count++;

        } while ((nextDaoId  == newNextDaoId) && count < 5);

        if (nextDaoId  == newNextDaoId) {
            return -1;
        }

        return await registryContract.getDaoAddress(nextDaoId);
    }
    
}

export async function newMetdata(sender: Sender, client : TonClient, metadataArgs: MetadataArgs) {  

    if (!sender.address) {
        console.log(`sender address is not defined`);
        
        return -1
    };
    
    let metadataContract = client.open(await Metadata.fromInit(
        metadataArgs.avatar, metadataArgs.name, metadataArgs.about, 
        metadataArgs.website, metadataArgs.terms, metadataArgs.twitter, 
        metadataArgs.github, metadataArgs.hide));        
    

    if (await client.isContractDeployed(metadataContract.address)) {
        console.log("Contract already deployed");
        return -1;

    } else {
        await metadataContract.send(sender, { value: toNano('0.25') }, { $$type: 'Deploy' as const, queryId: 0n });
    }

    console.log(`Metadata contract address: ${metadataContract.address.toString()}`);
        


}
