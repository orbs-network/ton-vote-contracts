import { ServiceConfiguration } from './config';

export const exampleConfig: ServiceConfiguration = {
  BootstrapMode: false,
  Port: 8080,
  EthereumGenesisContract: '0xD859701C81119aB12A1e62AF6270aD2AE05c7AB3',
  EthereumFirstBlock: 11191390,
  EthereumEndpoint: 'http://ganache:7545',
  DeploymentDescriptorUrl: 'https://deployment.orbs.network/mainnet.json',
  ElectionsAuditOnly: false,
  StatusJsonPath: './status/status.json',
  StatusAnalyticsJsonPath: './status/analytics.json',
  StatusAnalyticsJsonGzipPath: './status/analytics.json.gz',
  StatusWriteIntervalSeconds: 1,
  DeploymentDescriptorPollIntervalSeconds: 1,
  RegularRolloutWindowSeconds: 5,
  HotfixRolloutWindowSeconds: 1,
  EthereumPollIntervalSeconds: 1,
  EthereumRequestsPerSecondLimit: 0,
  ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
  FinalityBufferBlocks: 10,
  Verbose: false,
  'node-address': 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
  ExternalLaunchConfig: {},
};
