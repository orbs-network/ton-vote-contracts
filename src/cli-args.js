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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const config_1 = require("./config");
const fs_1 = require("fs");
const yargs_1 = __importDefault(require("yargs"));
const Logger = __importStar(require("./logger"));
function parseArgs(argv) {
    const options = (0, yargs_1.default)(argv)
        .option("config", {
        type: "array",
        required: true,
        string: true,
        description: "list of config files",
    })
        .exitProcess(false)
        .parse();
    const externalLaunchConfig = Object.assign({}, ...options.config.map((configFile) => JSON.parse((0, fs_1.readFileSync)(configFile).toString())));
    const config = Object.assign(config_1.defaultServiceConfiguration, externalLaunchConfig);
    config.ExternalLaunchConfig = externalLaunchConfig;
    const validationErrors = (0, config_1.validateServiceConfiguration)(config);
    if (validationErrors) {
        Logger.error(`Invalid JSON config: '${JSON.stringify(config)}'.`);
        throw new Error(`illegal configuration value ${JSON.stringify(config)}\n ${validationErrors.join("\n")}`);
    }
    return config;
}
exports.parseArgs = parseArgs;
