import test from 'ava';
import { parseArgs } from './cli-args';
import mock from 'mock-fs';
import { ServiceConfiguration, validateServiceConfiguration } from './config';

test.serial.afterEach.always(() => {
  mock.restore();
});

const configPath = 'some/path/config.json';

const minimalConfigValue = {
  EthereumGenesisContract: 'bar',
  EthereumEndpoint: 'http://localhost:7545',
  'node-address': 'ecfcccbc1e54852337298c7e90f5ecee79439e67',
};
const inputConfigValue = {
  ...minimalConfigValue,
  BootstrapMode: false,
  Port: -1,
  EthereumFirstBlock: 0,
  EthereumPollIntervalSeconds: 0.5,
  EthereumRequestsPerSecondLimit: 0,
  DeploymentDescriptorUrl: 'https://buzz.com',
  ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
  RegularRolloutWindowSeconds: 1,
  HotfixRolloutWindowSeconds: 1,
  StatusWriteIntervalSeconds: 1,
  DeploymentDescriptorPollIntervalSeconds: 1,
  FinalityBufferBlocks: 0,
  DockerNamespace: 'foo',
  DockerRegistry: 'bar',
  ElectionsAuditOnly: false,
  StatusJsonPath: 'bla',
  StatusAnalyticsJsonPath: 'bla',
  StatusAnalyticsJsonGzipPath: 'bla',
  Verbose: true,
};

const expectedConfigValue: ServiceConfiguration = {
  ...inputConfigValue,
  ExternalLaunchConfig: inputConfigValue,
};

test.serial('parseOptions with file', (t) => {
  mock({
    [configPath]: JSON.stringify(inputConfigValue),
  });

  t.deepEqual(parseArgs(['--config', configPath]), expectedConfigValue);
});

test.serial('parseOptions with partial file (complete default values)', (t) => {
  mock({
    [configPath]: JSON.stringify(minimalConfigValue),
  });

  const options = parseArgs(['--config', configPath]);
  t.deepEqual(validateServiceConfiguration(options), undefined);
});

test.serial('parseOptions with no file', (t) => {
  t.throws(() => parseArgs(['--config', configPath]));
});

test.serial('parseOptions with no config', (t) => {
  t.throws(() => parseArgs([]));
});
