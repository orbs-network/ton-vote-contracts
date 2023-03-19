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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
// import compression from 'compression';
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("./helpers");
// import { TaskLoop } from './task-loop';
const manager_1 = require("./model/manager");
// import { BlockSync } from './ethereum/block-sync';
// import { ImagePoll } from './deployment/image-poll';
const render_daos_1 = require("./api/render-daos");
const render_proposals_1 = require("./api/render-proposals");
const render_votes_1 = require("./api/render-votes");
const render_strategies_1 = require("./api/render-strategies");
const Logger = __importStar(require("./logger"));
// import { StatusWriter } from './status-writer';
const SOCKET_TIMEOUT_SEC = 60;
// function wrapAsync(fn: RequestHandler): RequestHandler {
//   return (req, res, next) => fn(req, res, next).catch(next);
// }
function serve(serviceConfig) {
    const state = new manager_1.StateManager(serviceConfig);
    // const blockSync = new BlockSync(state, serviceConfig);
    // const imagePoll = new ImagePoll(state, serviceConfig);
    // const statusWriter = new StatusWriter(state, serviceConfig);
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.set("json spaces", 2);
    app.get("/getDaos", (_request, response) => {
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_daos_1.renderDaos)(snapshot);
        response.status(res.code).json(res.body);
    });
    app.get("/getDao/:daoId", (request, response) => {
        const { daoId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_daos_1.renderDao)(snapshot, daoId);
        response.status(res.code).json(res.body);
    });
    app.get("/getActiveProposals/:daoId", (request, response) => {
        const { daoId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const body = (0, render_proposals_1.renderActiveProposals)(snapshot, daoId);
        response.status(200).json(body);
    });
    app.get("/getEndedProposals/:daoId", (request, response) => {
        const { daoId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const body = (0, render_proposals_1.renderEndedProposals)(snapshot, daoId);
        response.status(200).json(body);
    });
    app.get("/getProposal/:proposalId", (request, response) => {
        const { proposalId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const body = (0, render_proposals_1.renderProposal)(snapshot, proposalId);
        response.status(200).json(body);
    });
    app.put("/getProposalResult/:proposalId", (request, response) => {
        const { proposalId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const body = (0, render_proposals_1.renderProposalResult)(state, snapshot, proposalId);
        response.status(200).json(body);
    });
    app.get("/getRecentVotes/:proposalId", (request, response) => {
        const { proposalId } = request.params;
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_votes_1.renderVotes)(snapshot, proposalId);
        response.status(res.code).json(res.body);
    });
    app.get("/getStrategies", (_request, response) => {
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_strategies_1.renderStrategies)(snapshot);
        response.status(200).json(res);
    });
    // TODO: improve params validation
    app.post("/registerDao", (request, response) => {
        const daoMetadata = request.body;
        const res = (0, render_daos_1.insertNewDao)(state, daoMetadata);
        response.status(res.code).json(res.body);
    });
    app.put("/updateDao", (request, response) => {
        const daoMetadata = request.body;
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_daos_1.updateDao)(state, snapshot, daoMetadata);
        response.status(res.code).json(res.body);
    });
    app.post("/newProposal", (request, response) => {
        const daoMetadata = request.body;
        const snapshot = state.getCurrentSnapshot();
        const res = (0, render_proposals_1.insertNewProposal)(state, snapshot, daoMetadata);
        response.status(res.code).json(res.body);
    });
    app.post("/submitVote/", (request, response) => __awaiter(this, void 0, void 0, function* () {
        const vote = request.body;
        const snapshot = state.getCurrentSnapshot();
        const res = yield (0, render_votes_1.submitVote)(state, snapshot, vote);
        response.status(res.code).json(res.body);
    }));
    app.use((error, req, res, next) => {
        if (error) {
            Logger.error(`Error response to ${req.url}: ${(0, helpers_1.errorString)(error)}.`);
            return res.status(500).json({
                status: "error",
                error: (0, helpers_1.errorString)(error),
            });
        }
        return next(error);
    });
    // const blockSyncTask = new TaskLoop(() => blockSync.run(), serviceConfig.EthereumPollIntervalSeconds * 1000);
    // const imagePollTask = new TaskLoop(
    //   () => imagePoll.run(),
    //   serviceConfig.DeploymentDescriptorPollIntervalSeconds * 1000
    // );
    // const statusWriterTask = new TaskLoop(
    //   () => statusWriter.run(blockSync.getRequestStats()),
    //   serviceConfig.StatusWriteIntervalSeconds * 1000
    // );
    // blockSyncTask.start();
    // imagePollTask.start();
    // statusWriterTask.start();
    const server = app.listen(serviceConfig.Port, "0.0.0.0", () => Logger.log(`Ton vote listening on port ${serviceConfig.Port}!`));
    server.setTimeout(SOCKET_TIMEOUT_SEC * 1000);
    server.requestTimeout = SOCKET_TIMEOUT_SEC * 1000;
    server.on("close", () => {
        // blockSyncTask.stop();
        // imagePollTask.stop();
        // statusWriterTask.stop();
    });
    return server;
}
exports.serve = serve;
