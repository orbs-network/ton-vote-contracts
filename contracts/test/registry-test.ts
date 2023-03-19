import { ContractSystem } from '@tact-lang/emulator';
import { ProposalDeployer, storeProposalSetMsg} from '../output/ton-vote_ProposalDeployer'; 
import { Proposal, storeParams } from '../output/ton-vote_Proposal'; 
import { Registry } from '../output/ton-vote_Registry'; 
import { Dao } from '../output/ton-vote_Dao'; 
import { Address, beginCell, toNano } from "ton-core";
import { expect } from "chai";
import {Cell} from "ton-core"


describe('registry tests', () => {
    
    it('deploy registry', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let registryContract = system.open(await Registry.fromInit());
        let tracker = system.track(registryContract.address);
        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        let res = tracker.collect();
        
        expect(res[0].events[0].$type).to.eq('deploy');
        expect(res[0].events[2].$type).to.eq('processed');
        expect((res[0].events[3].$type == 'sent') && res[0].events[3].messages[0].to == '@treasure(treasure)').to.eq(true);

    });


    it('send create dao to registry', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoOwnerTreasure = system.treasure('dao-owner-treasure');
        let registryContract = system.open(await Registry.fromInit());
        let tracker = system.track(registryContract.address);

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure.address, metadata: treasure.address
        });
        await system.run();

        let daoId = await registryContract.getNextDaoId();
        expect(Number(daoId)).to.eq(1);

        let daoAddress = await registryContract.getDaoAddress(0n);

        let daoContract = system.open(await Dao.fromAddress(daoAddress));
        let daoOwner = await daoContract.getOwner();

        expect(daoOwner.toString()).to.eq(daoOwnerTreasure.address.toString());

    });

    it.only('create 2 daos', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoOwnerTreasure1 = system.treasure('dao-owner-treasure-1');
        let daoOwnerTreasure2 = system.treasure('dao-owner-treasure-2');
        let registryContract = system.open(await Registry.fromInit());
        let tracker = system.track(registryContract.address);

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure1.address, metadata: treasure.address
        });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure2.address, metadata: treasure.address
        });
        await system.run();

        let daoId = await registryContract.getNextDaoId();
        expect(Number(daoId)).to.eq(2);

        let daoAddress1 = await registryContract.getDaoAddress(0n);

        let daoContract1 = system.open(Dao.fromAddress(daoAddress1));
        let daoOwner1 = await daoContract1.getOwner();

        expect(daoOwner1.toString()).to.eq(daoOwnerTreasure1.address.toString());

        let daoAddress2 = await registryContract.getDaoAddress(1n);

        let daoContract2 = system.open(Dao.fromAddress(daoAddress2));
        let daoOwner2 = await daoContract2.getOwner();

        expect(daoOwner2.toString()).to.eq(daoOwnerTreasure2.address.toString());

    });

});
