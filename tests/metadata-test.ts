import { ContractSystem } from '@tact-lang/emulator';
import {Metadata} from '../output/ton-vote_Metadata';
import { expect } from 'chai';
import { toNano} from 'ton-core';
import { ZERO_ADDR } from '@orbs-network/orbs-ethereum-contracts-v2/release/test/driver';
import { Address } from 'ton';


describe('metadata tests', () => {
    
    it('deploy metadata', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let res;
    
        let metadataContract = system.open(await Metadata.fromInit("avatar-test", "dao-test", "about-test", "website-test", "terms-test", "telegram-test", "github-test", Address.parse(ZERO_ADDR), Address.parse(ZERO_ADDR), false));
        let tracker = system.track(metadataContract);
        
        await metadataContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        res = tracker.collect();
        
        expect(res[0].events[0].$type).to.eq('deploy');
        expect(res[0].events[2].$type).to.eq('processed');
        expect((res[0].events[3].$type == 'sent') && res[0].events[3].messages[0].to == '@treasure(treasure)').to.eq(true);

    });

    it('metadata getters', async () => {

        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let res;

        let metadataContract = system.open(await Metadata.fromInit("avatar-test", "dao-test", "about-test", "website-test", "terms-test", "telegram-test", "github-test", Address.parse(ZERO_ADDR), Address.parse(ZERO_ADDR), false));
        
        await metadataContract.send(treasure, { value: toNano('10') }, { $$type: 'Deploy' as const, queryId: 0n });
        await system.run();

        res = await metadataContract.getAvatar();        
        expect(res).to.eq('avatar-test');

        res = await metadataContract.getName();        
        expect(res).to.eq('name-test');

        res = await metadataContract.getAbout();        
        expect(res).to.eq('about-test');

        res = await metadataContract.getWebsite();        
        expect(res).to.eq('website-test');

        res = await metadataContract.getTerms();        
        expect(res).to.eq('terms-test');

        res = await metadataContract.getTelegram();        
        expect(res).to.eq('twitter-test');

        res = await metadataContract.getGithub();        
        expect(res).to.eq('github-test');

        res = await metadataContract.getHide();        
        expect(res).to.eq(false);
    });
});
