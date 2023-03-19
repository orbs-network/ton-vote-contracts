import { ContractSystem } from '@tact-lang/emulator';
import { ProposalDeployer, storeProposalInit} from '../output/ton-vote_ProposalDeployer'; 
import { Proposal, storeParams } from '../output/ton-vote_Proposal'; 
import { Dao, SendParameters } from '../output/ton-vote_Dao'; 
import { Address, beginCell, toNano } from "ton-core";
import { expect } from "chai";
import {Cell} from "ton-core"


describe('dao tests', () => {
    
    it.only('deploy dao', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoContract = system.open(await Dao.fromInit(0n));
        let tracker = system.track(daoContract.address);
        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'DaoInit' as const, owner: treasure.address, proposalOwner: treasure.address, metadata: treasure.address });
        await system.run();

        let res = tracker.collect();
        
        expect(res[0].events[0].$type).to.eq('deploy');
        expect(res[0].events[2].$type).to.eq('processed');
        expect((res[0].events[3].$type == 'sent') && res[0].events[3].messages[0].to == '@treasure(treasure)').to.eq(true);

        let owner = await daoContract.getOwner();
        expect(owner.toString()).to.eq(treasure.address.toString());

        let registry = await daoContract.getRegistry();
        console.log(registry.toString());
        
    });

    it('send init dao', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let daoContract = system.open(await Dao.fromInit(0n));
        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        let tracker = system.track(daoContract.address);

        console.log(await daoContract.getOwner(), daoContract.address.toString(), treasure.address.toString());

        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'DaoInit' as const, owner: treasure.address, proposalOwner: treasure.address, metadata: treasure.address });
        await system.run();

        console.log(await daoContract.getOwner(), daoContract.address.toString(), treasure.address.toString());

        let res = tracker.collect();

        expect(res[0].events[0].$type).to.eq('received');
        expect(res[0].events[1].$type).to.eq('processed');

        let owner = await daoContract.getOwner();
        expect(owner.toString()).to.eq(treasure.address.toString());

    });

    it('deploy new proposal by sending CreateNewProposalDeployer', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let res;

        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        let daoContract = system.open(await Dao.fromInit(0n));
        let tracker = system.track(daoContract.address);
        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'DaoInit' as const, owner: treasure.address, proposalOwner: treasure.address, metadata: treasure.address });
        await system.run();

        tracker.collect();

        await daoContract.send(treasure, { value: toNano('123') }, 
            { 
                $$type: 'FwdMsg', fwdMsg: {
                    $$type: 'SendParameters', 
                    bounce: true,
                    to: proposalDeployer.address,
                    value: toNano(10),
                    mode: 1n,
                    body: beginCell().store(storeProposalInit({
                        $$type: 'ProposalInit',
                        body: {
                            $$type: 'Params',
                            proposalStartTime: 0n,
                            proposalEndTime: 2341659973n,
                            proposalSnapshotTime: 1678885573n,
                            proposalType: 0n,
                            votingPowerStrategy: 0n
                        }
                    })).endCell(),
                    code: null,
                    data: null
                }
            }
        );        
        
        await system.run();
        
        res = tracker.collect();
                        
        expect(res[0].events[0].$type).to.eq('received');
        expect(res[0].events[1].$type).to.eq('processed');
        // @ts-ignore
        expect(res[0].events[0].message.body.cell).to.eq('x{07741E39C0095087B798CC49EC9C0EC5676510E366BB6A6E5142F72A50705654E58E710586A000000000000000000000000000000000000000000000000000000012A05F200000000000000000000000000000000000000000000000000000000000000000064_}\n' +
        ' x{4865D4D20000000000000000000000008B92E545000000006411C2C50000}');        
        expect(res[0].events[2].$type).to.eq('sent');

    });

    it('update owner', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');

        let zeroAddr = Address.parse("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");
        
        let daoContract = system.open(await Dao.fromInit(0n));

        await daoContract.send(treasure, { value: toNano('10') }, { $$type: 'DaoInit', owner: treasure.address, proposalOwner: treasure.address, metadata: treasure.address });
        await system.run();

        await daoContract.send(treasure, { value: toNano('123') }, 
            { 
                $$type: 'SetOwner', newOwner: zeroAddr
            }
        );        
        
        await system.run();
                
        let owner = await daoContract.getOwner();
        
        expect(owner.toString()).to.eq(zeroAddr.toString());

    });

});
