"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateServiceConfiguration = exports.defaultServiceConfiguration = void 0;
const validate_js_1 = __importDefault(require("validate.js"));
exports.defaultServiceConfiguration = {
    BootstrapMode: false,
    Port: 8080,
    DaosJsonPath: "./db/daos.json",
    ProposalsJsonPath: "./db/proposals.json",
    VotesJsonPath: "./db/votes.json",
    ResultsJsonPath: "./db/results.json",
    StrategiesJsonPath: "./db/strategies.json",
    EthereumGenesisContract: "0xD859701C81119aB12A1e62AF6270aD2AE05c7AB3",
    EthereumFirstBlock: 11191390,
    DeploymentDescriptorUrl: "https://deployment.orbs.network/mainnet.json",
    ElectionsAuditOnly: false,
    StatusJsonPath: "./status/status.json",
    StatusAnalyticsJsonPath: "./status/analytics.json",
    StatusAnalyticsJsonGzipPath: "./status/analytics.json.gz",
    StatusWriteIntervalSeconds: 25,
    DeploymentDescriptorPollIntervalSeconds: 3 * 60,
    RegularRolloutWindowSeconds: 24 * 60 * 60,
    HotfixRolloutWindowSeconds: 60 * 60,
    EthereumPollIntervalSeconds: 30,
    EthereumRequestsPerSecondLimit: 0,
    ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
    FinalityBufferBlocks: 40,
    Verbose: false,
};
function validateServiceConfiguration(c) {
    const serviceConfigConstraints = {
        BootstrapMode: {
            presence: { allowEmpty: false },
            type: "boolean",
        },
    };
    return (0, validate_js_1.default)(c, serviceConfigConstraints, { format: "flat" });
}
exports.validateServiceConfiguration = validateServiceConfiguration;
