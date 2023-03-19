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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFileDirectoryExists = exports.StatusWriter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const render_status_1 = require("./api/render-status");
const helpers_1 = require("./helpers");
const Logger = __importStar(require("./logger"));
class StatusWriter {
    constructor(state, config) {
        this.state = state;
        this.config = config;
    }
    // single tick of the run loop
    run(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            // render status
            const snapshot = this.state.getCurrentSnapshot();
            const status = (0, render_status_1.renderServiceStatus)(snapshot, stats, this.config);
            const statusAnalytics = (0, render_status_1.renderServiceStatusAnalytics)(snapshot, stats, this.config);
            // do the actual writing to local files
            writeFile(this.config.StatusJsonPath, status);
            writeFile(this.config.StatusAnalyticsJsonPath, statusAnalytics);
            yield (0, helpers_1.sleep)(0); // for eslint
        });
    }
}
exports.StatusWriter = StatusWriter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeFile(filePath, jsonObject) {
    ensureFileDirectoryExists(filePath);
    const content = JSON.stringify(jsonObject, null, 2);
    (0, fs_1.writeFileSync)(filePath, content);
    // log progress
    Logger.log(`Wrote status JSON to ${filePath} (${content.length} bytes).`);
}
function ensureFileDirectoryExists(filePath) {
    (0, fs_1.mkdirSync)((0, path_1.dirname)(filePath), { recursive: true });
}
exports.ensureFileDirectoryExists = ensureFileDirectoryExists;
