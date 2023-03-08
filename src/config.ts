import validate from "validate.js";

export interface ServiceConfiguration {
  BootstrapMode: boolean;
  Port: number;
  DaosJsonPath: string;
  ProposalsJsonPath: string;
  VotesJsonPath: string;
  ResultsJsonPath: string;
  StrategiesJsonPath: string;
  EthereumGenesisContract: string;
  EthereumEndpoint: string;
  MaticEndpoint?: string; // TODO: remove
  DeploymentDescriptorUrl: string;
  ElectionsAuditOnly: boolean;
  StatusJsonPath: string;
  StatusAnalyticsJsonPath: string;
  StatusAnalyticsJsonGzipPath: string;
  StatusWriteIntervalSeconds: number;
  DeploymentDescriptorPollIntervalSeconds: number;
  RegularRolloutWindowSeconds: number;
  HotfixRolloutWindowSeconds: number;
  EthereumPollIntervalSeconds: number;
  EthereumRequestsPerSecondLimit: number;
  ElectionsStaleUpdateSeconds: number;
  FinalityBufferBlocks: number;
  EthereumFirstBlock: number;
  Verbose: boolean;
  "node-address": string;
  ExternalLaunchConfig: { [key: string]: unknown };
}

export const defaultServiceConfiguration = {
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

export function validateServiceConfiguration(
  c: Partial<ServiceConfiguration>
): string[] | undefined {
  const serviceConfigConstraints = {
    BootstrapMode: {
      presence: { allowEmpty: false },
      type: "boolean",
    },
  };
  return validate(c, serviceConfigConstraints, { format: "flat" });
}
