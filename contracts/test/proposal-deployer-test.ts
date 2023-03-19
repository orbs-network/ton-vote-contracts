import { ContractSystem } from '@tact-lang/emulator';
import { ProposalDeployer } from '../output/ton-vote_ProposalDeployer'; 
import { Proposal } from '../output/ton-vote_Proposal'; 
import { toNano } from "ton-core";
import { expect } from "chai";


describe('contract-deployer', () => {
    
    it('deploy contract-deployer', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployerContract = system.open(await ProposalDeployer.fromInit(treasure.address));
        let tracker = system.track(proposalDeployerContract.address);
        await proposalDeployerContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        let res = tracker.collect();
        
        expect(res[0].events[0].$type).to.eq('deploy');
        expect(res[0].events[2].$type).to.eq('processed');
        expect((res[0].events[3].$type == 'sent') && res[0].events[3].messages[0].to == '@treasure(treasure)').to.eq(true);

        let owner = await proposalDeployerContract.getOwner();
        expect(owner.toString()).to.eq(treasure.address.toString());
        
        let nextProposalId = await proposalDeployerContract.getNextProposalId();
        expect(Number(nextProposalId)).to.eq(0);

    });

    it('verify contract-deployer getters works as expected', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployerContract = system.open(await ProposalDeployer.fromInit(treasure.address));
        await proposalDeployerContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        let owner = await proposalDeployerContract.getOwner();
        expect(owner.toString()).to.eq(treasure.address.toString());
        
        let nextProposalId = await proposalDeployerContract.getNextProposalId();
        expect(Number(nextProposalId)).to.eq(0);

    });

    it('nexProposalIndex should advance after deploying new proposal', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        let nexProposalIndex = await proposalDeployer.getNextProposalId();        
        expect(Number(nexProposalIndex)).to.eq(0);

        await proposalDeployer.send(treasure, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 2341659973n,
                    proposalSnapshotTime: 1678885573n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );

        await system.run();

        nexProposalIndex = await proposalDeployer.getNextProposalId();        
        expect(Number(nexProposalIndex)).to.eq(1);        
    });  

    it('deploy new proposal from proposal-deployer', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        let proposalAddr = await proposalDeployer.getProposalAddr(0n);
        let tracker = system.track(proposalAddr);

        await proposalDeployer.send(treasure, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 2341659973n,
                    proposalSnapshotTime: 1678885573n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );        
        
        await system.run();

        let res = tracker.collect();
        
        expect(res[0].events[0].$type).to.eq('deploy');
        expect(res[0].events[2].$type).to.eq('processed');
    });

    it('deploy new proposal from proposal-deployer from not owner should fail', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let notOwner = system.treasure('notOwner');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        let tracker = system.track(proposalDeployer.address);

        await proposalDeployer.send(notOwner, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 2341659973n,
                    proposalSnapshotTime: 1678885573n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );        
        
        await system.run();

        let res = tracker.collect();        
        expect(res[0].events[1].$type == 'failed' && res[0].events[1].errorCode == 4429).to.eq(true);

    });

    it('verify proposal getters works as expected', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 2341659973n,
                    proposalSnapshotTime: 1678885573n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );

        await system.run();

        let proposalAddr = await proposalDeployer.getProposalAddr(0n);
        let proposal = system.open(await Proposal.fromInit(proposalDeployer.address, 0n));
                
        expect(proposal.address.toString()).to.eq(proposalAddr.toString());

        let owner = await proposal.getOwner();        
        expect(owner.toString()).to.eq(proposalDeployer.address.toString());
        
        let index = await proposal.getId();        
        expect(Number(index)).to.eq(0);
        
    });  

    it('send comment to proposal should succeed', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        let tracker;
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 2341659973n,
                    proposalSnapshotTime: 1678885573n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );

        await system.run();

        let proposal = system.open(await Proposal.fromInit(proposalDeployer.address, 0n));
                
        tracker = system.track(proposal.address);

        await proposal.send(treasure, { value: toNano('10'), bounce: true }, {$$type: 'Comment', body: 'yes'});
        await system.run();

        let res = tracker.collect();
        expect(res[0].events[0].$type).to.eq('received');
        expect(res[0].events[1].$type).to.eq('processed');        
    });  

    it('send comment to proposal should succeed', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(await ProposalDeployer.fromInit(treasure.address));
        let tracker;
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();
        
        await proposalDeployer.send(treasure, { value: toNano('10') }, 
            { 
                $$type: 'CreateProposal', body: {
                    $$type: 'Params',
                    proposalStartTime: 0n,
                    proposalEndTime: 0n,
                    proposalSnapshotTime: 0n,
                    proposalType: 0n,
                    votingPowerStrategy: 0n
                }
            }
        );

        await system.run();

        let proposal = system.open(await Proposal.fromInit(proposalDeployer.address, 0n));
                
        tracker = system.track(proposal.address);

        await proposal.send(treasure, { value: toNano('10'), bounce: true }, {$$type: 'Comment', body: 'yes'});
        await system.run();
        
        let res = tracker.collect();
        expect((res[0].events[1].$type == 'failed') && res[0].events[1].errorCode == 25952).to.eq(true);
    });  

});
