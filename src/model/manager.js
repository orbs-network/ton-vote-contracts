"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateManager = void 0;
const state_1 = require("./state");
class StateManager {
    constructor(config) {
        this.config = config;
        this.current = new state_1.State(this.config);
    }
    getCurrentSnapshot() {
        return this.current.getSnapshot();
    }
    insertDao(daoMetadata) {
        return this.current.insertDao(daoMetadata);
    }
    updateDao(daoMetadata) {
        return this.current.updateDao(daoMetadata);
    }
    insertNewProposal(proposal) {
        return this.current.insertNewProposal(proposal);
    }
    submitVote(vote) {
        return this.current.submitVote(vote);
    }
    updateResult(result, proposalId) {
        return this.current.updateResult(result, proposalId);
    }
}
exports.StateManager = StateManager;
