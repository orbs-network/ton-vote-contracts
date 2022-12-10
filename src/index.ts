import { ServiceConfiguration } from "./config";
import express, { Request, Response, NextFunction } from "express";
// import compression from 'compression';
import cors from "cors";
import { errorString } from "./helpers";
// import { TaskLoop } from './task-loop';
import { StateManager } from "./model/manager";
// import { BlockSync } from './ethereum/block-sync';
// import { ImagePoll } from './deployment/image-poll';
import { renderDao, renderDaos, insertNewDao, updateDao } from "./api/render-daos";
import {
  renderProposal,
  renderProposalResult,
  renderActiveProposals,
  renderEndedProposals,
  insertNewProposal,
} from "./api/render-proposals";
import { renderVotes, submitVote } from "./api/render-votes";
import { renderStrategies } from "./api/render-strategies";
import * as Logger from "./logger";
// import { StatusWriter } from './status-writer';

const SOCKET_TIMEOUT_SEC = 60;

// function wrapAsync(fn: RequestHandler): RequestHandler {
//   return (req, res, next) => fn(req, res, next).catch(next);
// }

export function serve(serviceConfig: ServiceConfiguration) {
  const state = new StateManager(serviceConfig);
  // const blockSync = new BlockSync(state, serviceConfig);
  // const imagePoll = new ImagePoll(state, serviceConfig);
  // const statusWriter = new StatusWriter(state, serviceConfig);

  const app = express();
  app.use(cors());
  app.set("json spaces", 2);

  app.get("/getDaos", (_request, response) => {
    const snapshot = state.getCurrentSnapshot();
    const res = renderDaos(snapshot);
    response.status(res.code).json(res.body);
  });

  app.get("/getDao/:daoId", (request, response) => {
    const { daoId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const res = renderDao(snapshot, daoId);
    response.status(res.code).json(res.body);
  });

  app.get("/getActiveProposals/:daoId", (request, response) => {
    const { daoId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const body = renderActiveProposals(snapshot, daoId);
    response.status(200).json(body);
  });

  app.get("/getEndedProposals/:daoId", (request, response) => {
    const { daoId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const body = renderEndedProposals(snapshot, daoId);
    response.status(200).json(body);
  });

  app.get("/getProposal/:proposalId", (request, response) => {
    const { proposalId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const body = renderProposal(snapshot, proposalId);
    response.status(200).json(body);
  });

  app.get("/getProposalResult/:proposalId", (request, response) => {
    const { proposalId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const body = renderProposalResult(snapshot, proposalId);
    response.status(200).json(body);
  });

  app.get("/getRecentVotes/:proposalId", (request, response) => {
    const { proposalId } = request.params;
    const snapshot = state.getCurrentSnapshot();
    const res = renderVotes(snapshot, proposalId);
    response.status(res.code).json(res.body);
  });

  app.get("/getStrategies", (_request, response) => {
    const snapshot = state.getCurrentSnapshot();
    const res = renderStrategies(snapshot);
    response.status(200).json(res);
  });

  app.post("/registerDao/", (request, response) => {
    const daoMetadata = request.body;
    const res = insertNewDao(state, daoMetadata);
    response.status(res.code).json(res.body);
  });

  app.put("/updateDao/", (request, response) => {
    const daoMetadata = request.body;
    const snapshot = state.getCurrentSnapshot();
    const res = updateDao(state, snapshot, daoMetadata);
    response.status(res.code).json(res.body);
  });

  app.post("/newProposal/", (request, response) => {
    const daoMetadata = request.body;
    const res = insertNewProposal(state, daoMetadata);
    response.status(res.code).json(res.body);
  });

  app.put("/submitVote/", (request, response) => {
    const vote = request.body;
    const snapshot = state.getCurrentSnapshot();
    const res = submitVote(snapshot, vote);
    response.status(res.code).json(res.body);
  });

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      Logger.error(`Error response to ${req.url}: ${errorString(error)}.`);
      return res.status(500).json({
        status: "error",
        error: errorString(error),
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

  const server = app.listen(serviceConfig.Port, "0.0.0.0", () =>
    Logger.log(`Ton vote listening on port ${serviceConfig.Port}!`)
  );
  server.setTimeout(SOCKET_TIMEOUT_SEC * 1000);
  server.requestTimeout = SOCKET_TIMEOUT_SEC * 1000;
  server.on("close", () => {
    // blockSyncTask.stop();
    // imagePollTask.stop();
    // statusWriterTask.stop();
  });
  return server;
}
