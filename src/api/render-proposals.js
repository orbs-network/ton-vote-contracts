"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewProposal = exports.renderEndedProposals = exports.renderActiveProposals = exports.renderProposalResult = exports.renderProposal = void 0;
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("../helpers");
const bn_js_1 = __importDefault(require("bn.js"));
function renderProposal(snapshot, proposalId) {
    return snapshot.Proposals[proposalId];
}
exports.renderProposal = renderProposal;
function renderProposalResult(state, snapshot, proposalId) {
    if (!(proposalId in snapshot.Proposals)) {
        return {
            code: 400,
            body: `proposal ${proposalId} not exists`,
        };
    }
    let proposal = snapshot.Proposals[proposalId];
    // proposal was ended and result was updated, no need to update result just return result
    if (proposalId in snapshot.Results &&
        proposal.timestamp + proposal.duration <
            snapshot.Results[proposalId].timestamp)
        return snapshot.Results[proposalId];
    let result = {
        daoId: snapshot.Proposals[proposalId].daoId,
        proposalId: proposalId,
        timestamp: Date.now(),
        percentage: calcResult(snapshot, proposalId),
    };
    state.updateResult(result, proposalId);
    return result;
}
exports.renderProposalResult = renderProposalResult;
function renderActiveProposals(snapshot, daoId) {
    return lodash_1.default.filter(snapshot.Proposals, function (proposal) {
        // console.log(daoId == proposal.daoId, proposal.timestamp + proposal.duration < Date.now())
        return daoId == proposal.daoId && proposal.timestamp + proposal.duration > Date.now();
    });
}
exports.renderActiveProposals = renderActiveProposals;
function renderEndedProposals(snapshot, daoId) {
    let res = lodash_1.default.filter(snapshot.Proposals, function (proposal) {
        return daoId == proposal.daoId && proposal.timestamp + proposal.duration <= Date.now();
    });
    return res;
}
exports.renderEndedProposals = renderEndedProposals;
function insertNewProposal(state, snapshot, proposal) {
    if (!(proposal.daoId in snapshot.Daos)) {
        return {
            code: 400,
            body: `daoId ${proposal.daoId} was not found`,
        };
    }
    let res = (0, helpers_1.verifySignature)(Object.assign({}, proposal, { proposerSignature: undefined }), proposal.proposerSignature, proposal.proposer);
    // TODO: FIXME
    if (res) {
        return {
            code: 400,
            body: "Bad signature",
        };
    }
    const newProposalId = state.insertNewProposal(proposal);
    return {
        code: 200,
        body: newProposalId,
    };
}
exports.insertNewProposal = insertNewProposal;
function calcResult(snapshot, proposalId) {
    let votes = Object.values(snapshot.Votes[proposalId]);
    let choices = Object.values(snapshot.Proposals[proposalId].choices);
    let result = new Array(choices.length).fill(new bn_js_1.default(0));
    for (let i = 0; i < votes.length; i++) {
        for (let j = 0; j < choices.length; j++) {
            // TODO: add validation
            // if (!(votes[i].votingPower)) ; // TODO: error
            // verify: weight < 1, votingPower is not null, selection[j] === choices[j]
            result[j] += new bn_js_1.default(votes[i].votingPower || 0).mul(new bn_js_1.default(votes[i].selection[j].weight));
            // .mul(votes[i].selection[j].weight)
        }
    }
    const sum = result.reduce((acc, item) => acc.add(item), new bn_js_1.default(0));
    return result.reduce((obj, item) => {
        obj[item] = item.div(sum).mult(100);
        return obj;
    }, {});
}
