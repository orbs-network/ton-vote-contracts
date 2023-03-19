"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.defaultStateConfiguration = void 0;
const fs_1 = __importStar(require("fs"));
const Logger = __importStar(require("../logger"));
const helpers_1 = require("../helpers");
const crypto = __importStar(require("crypto"));
exports.defaultStateConfiguration = {
    DaosJsonPath: "./db/daos.json",
    ProposalsJsonPath: "./db/proposals.json",
    VotesJsonPath: "./db/votes.json",
    ResultsJsonPath: "./db/results.json",
    StrategiesJsonPath: "./db/strategies.json",
};
class State {
    constructor(config = exports.defaultStateConfiguration) {
        this.config = config;
        this.snapshot = {
            Daos: {},
            Proposals: {},
            Votes: {},
            Results: {},
            Strategies: {},
            CurrentVersion: "",
        };
        this.loadSnapshot(config);
        // try {
        // } catch (err) {
        //   Logger.log(`Failed to load snapshot: ${err.message}`);
        // }
    }
    loadSnapshot(config = exports.defaultStateConfiguration) {
        var _a, _b;
        this.snapshot.CurrentVersion = fs_1.default
            .readFileSync("./version")
            .toString()
            .trim();
        this.snapshot.Daos = JSON.parse((0, fs_1.readFileSync)(config.DaosJsonPath).toString());
        this.snapshot.Proposals = JSON.parse((0, fs_1.readFileSync)(config.ProposalsJsonPath).toString());
        this.snapshot.Votes = JSON.parse((0, fs_1.readFileSync)(config.VotesJsonPath).toString());
        this.snapshot.Results = JSON.parse((_a = (0, fs_1.readFileSync)(config.ResultsJsonPath)) === null || _a === void 0 ? void 0 : _a.toString());
        this.snapshot.Strategies = JSON.parse((_b = (0, fs_1.readFileSync)(config.StrategiesJsonPath)) === null || _b === void 0 ? void 0 : _b.toString());
    }
    getSnapshot() {
        return this.snapshot;
    }
    getNewId(keys) {
        const ids = keys.map((id) => Number(id));
        return ids.length === 0 ? "0" : String(Math.max(...ids) + 1);
    }
    // TODO: sort objects before write
    insertDao(daoMetadata) {
        daoMetadata.daoId = crypto.randomBytes(16).readUInt16BE().toString();
        this.snapshot.Daos[daoMetadata.daoId] = daoMetadata;
        (0, helpers_1.writeFile)(this.config.DaosJsonPath, this.snapshot.Daos);
        return daoMetadata.daoId;
    }
    updateDao(daoMetadata) {
        if (daoMetadata.daoId === null) {
            Logger.log(`daoId should be provided`);
            return false;
        }
        if (!(daoMetadata.daoId in this.snapshot.Daos)) {
            Logger.log(`daoId ${daoMetadata.daoId} was not found`);
            return false;
        }
        this.snapshot.Daos[daoMetadata.daoId] = daoMetadata;
        (0, helpers_1.writeFile)(this.config.DaosJsonPath, this.snapshot.Daos);
        return true;
    }
    insertNewProposal(proposal) {
        proposal.proposalId = crypto.randomBytes(16).readUInt16BE().toString(); // this.getNewId(Object.keys(this.snapshot.Proposals));
        this.snapshot.Proposals[proposal.proposalId] = proposal;
        (0, helpers_1.writeFile)(this.config.ProposalsJsonPath, this.snapshot.Proposals);
        return proposal.proposalId;
    }
    submitVote(vote) {
        if (!(vote.proposalId in this.snapshot.Votes)) {
            this.snapshot.Votes[vote.proposalId] = {};
        }
        Object.assign(this.snapshot.Votes[vote.proposalId], { [vote.voter]: vote });
        (0, helpers_1.writeFile)(this.config.VotesJsonPath, this.snapshot.Votes);
        return vote.voter;
    }
    updateResult(result, proposalId) {
        this.snapshot.Results[proposalId] = result;
        (0, helpers_1.writeFile)(this.config.ResultsJsonPath, this.snapshot.Results);
    }
}
exports.State = State;
