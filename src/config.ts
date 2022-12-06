import validate from 'validate.js';

export interface ServiceConfiguration {
  BootstrapMode: boolean;
  Port: number;
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
  'node-address': string;
  ExternalLaunchConfig: { [key: string]: unknown };
}

export const defaultServiceConfiguration = {
  BootstrapMode: false,
  Port: 8080,
  EthereumGenesisContract: '0xD859701C81119aB12A1e62AF6270aD2AE05c7AB3',
  EthereumFirstBlock: 11191390,
  DeploymentDescriptorUrl: 'https://deployment.orbs.network/mainnet.json',
  ElectionsAuditOnly: false,
  StatusJsonPath: './status/status.json',
  StatusAnalyticsJsonPath: './status/analytics.json',
  StatusAnalyticsJsonGzipPath: './status/analytics.json.gz',
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

export function validateServiceConfiguration(c: Partial<ServiceConfiguration>): string[] | undefined {
  const serviceConfigConstraints = {
    BootstrapMode: {
      presence: { allowEmpty: false },
      type: 'boolean',
    },
    EthereumPollIntervalSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    EthereumRequestsPerSecondLimit: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    DeploymentDescriptorUrl: {
      presence: { allowEmpty: false },
      type: 'string',
      url: {
        allowLocal: true,
      },
    },
    ElectionsStaleUpdateSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    StatusWriteIntervalSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    DeploymentDescriptorPollIntervalSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    RegularRolloutWindowSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    HotfixRolloutWindowSeconds: {
      presence: { allowEmpty: false },
      type: 'number',
      numericality: { noStrings: true },
    },
    Port: {
      presence: { allowEmpty: false },
      type: 'integer',
      numericality: { noStrings: true },
    },
    EthereumEndpoint: {
      presence: { allowEmpty: false },
      type: 'string',
      url: {
        allowLocal: true,
      },
    },
    EthereumGenesisContract: {
      presence: { allowEmpty: false },
      type: 'string',
    },
    FinalityBufferBlocks: {
      presence: { allowEmpty: false },
      type: 'integer',
      numericality: { noStrings: true },
    },
    ElectionsAuditOnly: {
      presence: { allowEmpty: false },
      type: 'boolean',
    },
    StatusJsonPath: {
      presence: { allowEmpty: false },
      type: 'string',
    },
    StatusAnalyticsJsonPath: {
      presence: { allowEmpty: false },
      type: 'string',
    },
    StatusAnalyticsJsonGzipPath: {
      presence: { allowEmpty: false },
      type: 'string',
    },
    Verbose: {
      presence: { allowEmpty: false },
      type: 'boolean',
    },
    'node-address': {
      presence: { allowEmpty: false },
      type: 'string',
    },
  };
  return validate(c, serviceConfigConstraints, { format: 'flat' });
}
