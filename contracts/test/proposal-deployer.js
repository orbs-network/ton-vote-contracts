"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const emulator_1 = require("@tact-lang/emulator");
const ton_vote_ProposalDeployer_1 = require("../output/ton-vote_ProposalDeployer");
const ton_vote_Proposal_1 = require("../output/ton-vote_Proposal");
const ton_core_1 = require("ton-core");
const chai_1 = require("chai");
describe('contract-deployer', () => {
    it('deploy contract-deployer', () => __awaiter(void 0, void 0, void 0, function* () {
        let system = yield emulator_1.ContractSystem.create();
        let treasure = system.treasure('treasure');
        let contract = system.open(yield ton_vote_ProposalDeployer_1.ProposalDeployer.fromInit(treasure.address));
        let tracker = system.track(contract.address);
        yield contract.send(treasure, { value: (0, ton_core_1.toNano)('10') }, { $$type: 'Deploy', queryId: 0n });
        yield system.run();
        // let collect = tracker.collect()
        // console.log(collect[0].events);
        let owner = yield contract.getOwner();
        (0, chai_1.expect)(owner.toString()).to.eq(treasure.address.toString());
        let nextProposalIndex = yield contract.getNextProposalIndex();
        (0, chai_1.expect)(Number(nextProposalIndex)).to.eq(0);
    }));
    it('create new proposal', () => __awaiter(void 0, void 0, void 0, function* () {
        let system = yield emulator_1.ContractSystem.create();
        let treasure = system.treasure('treasure');
        let proposalDeployer = system.open(yield ton_vote_ProposalDeployer_1.ProposalDeployer.fromInit(treasure.address));
        // let tracker = system.track(proposalDeployer.address);
        // let logger = system.log(proposalDeployer.address);
        yield proposalDeployer.send(treasure, { value: (0, ton_core_1.toNano)('10') }, { $$type: 'Deploy', queryId: 0n });
        yield system.run();
        yield proposalDeployer.send(treasure, { value: (0, ton_core_1.toNano)('10') }, { $$type: 'CreateMessage', body: null });
        yield system.run();
        // console.log(tracker.collect());
        // console.log(logger.collect());
        let proposalAddr = yield proposalDeployer.getProposalAddr(0n);
        let proposal = system.open(yield ton_vote_Proposal_1.Proposal.fromInit(proposalDeployer.address, 0n));
        (0, chai_1.expect)(proposal.address.toString()).to.eq(proposalAddr.toString());
        let owner = yield proposal.getOwner();
        (0, chai_1.expect)(owner.toString()).to.eq(proposalDeployer.address.toString());
        let index = yield proposal.getIndex();
        (0, chai_1.expect)(Number(index)).to.eq(0);
        // tracker = system.track(proposal.address);
        // logger = system.log(proposal.address);
        yield proposal.send(treasure, { value: (0, ton_core_1.toNano)('10') }, null);
        yield system.run();
        // console.log(tracker.collect());
        // console.log(logger.collect());
    }));
});
