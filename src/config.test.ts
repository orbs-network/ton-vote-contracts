import test from 'ava';
import { validateServiceConfiguration } from './config';

test('accepts legal config', (t) => {
  t.deepEqual(
    validateServiceConfiguration({
      BootstrapMode: false,
      Port: 2,
      EthereumGenesisContract: 'foo',
      EthereumEndpoint: 'http://localhost:7545',
      EthereumPollIntervalSeconds: 0.1,
      EthereumRequestsPerSecondLimit: 0,
      ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
      RegularRolloutWindowSeconds: 1,
      HotfixRolloutWindowSeconds: 1,
      StatusWriteIntervalSeconds: 0.1,
      DeploymentDescriptorPollIntervalSeconds: 0.1,
      FinalityBufferBlocks: 0,
      DeploymentDescriptorUrl: 'https://buzz.com',
      ElectionsAuditOnly: false,
      StatusJsonPath: 'bla',
      StatusAnalyticsJsonPath: 'bla',
      StatusAnalyticsJsonGzipPath: 'bla',
      Verbose: true,
      'node-address': 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
    }),
    undefined
  );
});

test('declines illegal config (1)', (t) => {
  t.deepEqual(
    validateServiceConfiguration({
      BootstrapMode: false,
      Port: 2,
      EthereumGenesisContract: 'foo',
      EthereumEndpoint: 'http://localhost:7545',
      EthereumPollIntervalSeconds: 0.1,
      EthereumRequestsPerSecondLimit: 0,
      ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
      RegularRolloutWindowSeconds: 1,
      HotfixRolloutWindowSeconds: 1,
      StatusWriteIntervalSeconds: 0.1,
      DeploymentDescriptorPollIntervalSeconds: 0.1,
      DeploymentDescriptorUrl: 'https://buzz.com',
      ElectionsAuditOnly: false,
      StatusJsonPath: 'bla',
      StatusAnalyticsJsonPath: 'bla',
      StatusAnalyticsJsonGzipPath: 'bla',
      Verbose: true,
      'node-address': 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
    }),
    ["Finality buffer blocks can't be blank"]
  );
});

test('declines illegal config (2)', (t) => {
  t.deepEqual(
    validateServiceConfiguration({
      BootstrapMode: false,
      Port: 2,
      EthereumGenesisContract: 'foo',
      EthereumEndpoint: 'foo-bar:123',
      EthereumPollIntervalSeconds: 0.1,
      EthereumRequestsPerSecondLimit: 0,
      ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
      RegularRolloutWindowSeconds: 1,
      HotfixRolloutWindowSeconds: 1,
      StatusWriteIntervalSeconds: 0.1,
      DeploymentDescriptorPollIntervalSeconds: 0.1,
      FinalityBufferBlocks: 0,
      DeploymentDescriptorUrl: 'https://buzz.com',
      ElectionsAuditOnly: false,
      StatusJsonPath: 'bla',
      StatusAnalyticsJsonPath: 'bla',
      StatusAnalyticsJsonGzipPath: 'bla',
      Verbose: true,
      'node-address': 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
    }),
    ['Ethereum endpoint is not a valid url']
  );
});
