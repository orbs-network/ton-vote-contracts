"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const cli_args_1 = require("./cli-args");
const mock_fs_1 = __importDefault(require("mock-fs"));
const config_1 = require("./config");
ava_1.default.serial.afterEach.always(() => {
    mock_fs_1.default.restore();
});
const configPath = "some/path/config.json";
const minimalConfigValue = {
    EthereumGenesisContract: "bar",
    EthereumEndpoint: "http://localhost:7545",
    "node-address": "ecfcccbc1e54852337298c7e90f5ecee79439e67",
};
const inputConfigValue = Object.assign(Object.assign({}, minimalConfigValue), { BootstrapMode: false, Port: -1, EthereumFirstBlock: 0, EthereumPollIntervalSeconds: 0.5, EthereumRequestsPerSecondLimit: 0, DeploymentDescriptorUrl: "https://buzz.com", ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60, RegularRolloutWindowSeconds: 1, HotfixRolloutWindowSeconds: 1, StatusWriteIntervalSeconds: 1, DeploymentDescriptorPollIntervalSeconds: 1, FinalityBufferBlocks: 0, DockerNamespace: "foo", DockerRegistry: "bar", ElectionsAuditOnly: false, StatusJsonPath: "bla", StatusAnalyticsJsonPath: "bla", StatusAnalyticsJsonGzipPath: "bla", Verbose: true });
const expectedConfigValue = Object.assign(Object.assign({}, inputConfigValue), { ExternalLaunchConfig: inputConfigValue });
ava_1.default.serial("parseOptions with file", (t) => {
    (0, mock_fs_1.default)({
        [configPath]: JSON.stringify(inputConfigValue),
    });
    t.deepEqual((0, cli_args_1.parseArgs)(["--config", configPath]), expectedConfigValue);
});
ava_1.default.serial("parseOptions with partial file (complete default values)", (t) => {
    (0, mock_fs_1.default)({
        [configPath]: JSON.stringify(minimalConfigValue),
    });
    const options = (0, cli_args_1.parseArgs)(["--config", configPath]);
    t.deepEqual((0, config_1.validateServiceConfiguration)(options), undefined);
});
ava_1.default.serial("parseOptions with no file", (t) => {
    t.throws(() => (0, cli_args_1.parseArgs)(["--config", configPath]));
});
ava_1.default.serial("parseOptions with no config", (t) => {
    t.throws(() => (0, cli_args_1.parseArgs)([]));
});
