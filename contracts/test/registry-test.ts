import { ContractSystem } from '@tact-lang/emulator';
import { Registry } from '../output/ton-vote_Registry'; 
import { Dao } from '../output/ton-vote_Dao'; 
import { ProposalDeployer, storeCreateProposal, storeProposalInit } from '../output/ton-vote_ProposalDeployer'; 
import {Proposal} from '../output/ton-vote_Proposal';
import { expect } from 'chai';
import { Address, beginCell, toNano } from 'ton-core';


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


    it('send create dao to registry should deploy Dao and update its state', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoOwnerTreasure = system.treasure('dao-owner-treasure');
        let registryContract = system.open(await Registry.fromInit());

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure.address, proposalOwner: treasure.address, metadata: treasure.address
        });
        await system.run();

        let daoId = await registryContract.getNextDaoId();
        expect(Number(daoId)).to.eq(1);

        let daoAddress = await registryContract.getDaoAddress(0n);

        let daoContract = system.open(Dao.fromAddress(daoAddress));
        let daoOwner = await daoContract.getOwner();

        expect(daoOwner.toString()).to.eq(daoOwnerTreasure.address.toString());

        let daoRegistry = await daoContract.getRegistry();
        expect(daoRegistry.toString()).to.eq(registryContract.address.toString());

    });

    it('create 2 daos', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoOwnerTreasure1 = system.treasure('dao-owner-treasure-1');
        let daoOwnerTreasure2 = system.treasure('dao-owner-treasure-2');
        let registryContract = system.open(await Registry.fromInit());

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('1') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure1.address, proposalOwner: treasure.address, metadata: treasure.address
        });
        await system.run();

        await registryContract.send(treasure, { value: toNano('1') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure2.address, proposalOwner: treasure.address, metadata: treasure.address
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

    it('full flow - deploy registry, deploy dao, deploy proposal deployer + proposal', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoOwnerTreasure = system.treasure('dao-owner-treasure');
        let registryContract = system.open(await Registry.fromInit());

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure.address, proposalOwner: treasure.address, metadata: treasure.address
        });
        await system.run();

        let daoId = await registryContract.getNextDaoId();
        expect(Number(daoId)).to.eq(1);

        let daoAddress = await registryContract.getDaoAddress(0n);

        let daoContract = system.open(Dao.fromAddress(daoAddress));
        let daoOwner = await daoContract.getOwner();
        
        expect(daoOwner.toString()).to.eq(daoOwnerTreasure.address.toString());

        // proposalDeployer is used only to get state init
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(daoContract.address));
        if (!proposalDeployer.init) throw ('proposalDeployer init is undefined');

        // here we deploy proposalDeployer and Proposal contracts
        await daoContract.send(treasure, { value: toNano('123') }, 
            { 
                $$type: 'FwdMsg', fwdMsg: {
                    $$type: 'SendParameters', 
                    bounce: true,
                    to: proposalDeployer.address,
                    value: toNano(10),
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
                    code: proposalDeployer.init?.code,
                    data: proposalDeployer.init?.data
                }
            }
        );            
        await system.run();
        
        // nextProposalId should be increased after deployment
        let nextProposalId = await proposalDeployer.getNextProposalId();
        expect(Number(nextProposalId)).to.eq(1);

        let proposalAddr = await proposalDeployer.getProposalAddr(0n);
        let proposal = system.open(await Proposal.fromInit(proposalDeployer.address, 0n));

        expect(proposalAddr.toString()).to.eq(proposal.address.toString());

        let proposalOwner = await proposal.getOwner();
        expect(proposalOwner.toString()).to.eq(proposalDeployer.address.toString());

    });

    it('full flow - deploy registry, deploy dao, deploy proposal deployer + proposal from non owner should fail', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let treasure1 = system.treasure('treasure1');
        let daoOwnerTreasure = system.treasure('dao-owner-treasure');
        let registryContract = system.open(await Registry.fromInit());

        await registryContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await registryContract.send(treasure, { value: toNano('123') }, 
        { 
            $$type: 'CreateDao', owner: daoOwnerTreasure.address, proposalOwner: treasure.address, metadata: treasure.address
        });
        await system.run();

        let daoId = await registryContract.getNextDaoId();
        expect(Number(daoId)).to.eq(1);

        let daoAddress = await registryContract.getDaoAddress(0n);

        let daoContract = system.open(Dao.fromAddress(daoAddress));
        let daoOwner = await daoContract.getOwner();
        
        expect(daoOwner.toString()).to.eq(daoOwnerTreasure.address.toString());

        // proposalDeployer is used only to get state init
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(daoContract.address));
        if (!proposalDeployer.init) throw ('proposalDeployer init is undefined');

        let tracker = system.track(daoContract.address);

        // here we deploy proposalDeployer and Proposal contracts
        await daoContract.send(treasure1, { value: toNano('123') }, 
            { 
                $$type: 'FwdMsg', fwdMsg: {
                    $$type: 'SendParameters', 
                    bounce: true,
                    to: proposalDeployer.address,
                    value: toNano(10),
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
                    code: proposalDeployer.init?.code,
                    data: proposalDeployer.init?.data
                }
            }
        );            
        await system.run();
        
        let res = tracker.collect();

        expect(res[0].events[1].$type).to.eq('failed');
        // @ts-ignore
        expect(res[0].events[1].errorCode).to.eq(4429);
    });

});
