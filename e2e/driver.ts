import test from 'ava';
import { EthereumTestDriver } from '../src/ethereum/test-driver';
import { dockerComposeTool, getAddressForService } from 'docker-compose-mocha';
import fetch from 'node-fetch';
import { retry } from 'ts-retry-promise';
import { join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { exec } from 'child_process';
import { sleep } from '../src/helpers';

export class TestEnvironment {
  private envName: string = '';
  public ethereum: EthereumTestDriver = new EthereumTestDriver(true);
  public testLogger: (lines: string) => void;

  constructor(private pathToDockerCompose: string) {}

  getAppConfig(bootstrapMode: boolean) {
    return {
      BootstrapMode: bootstrapMode,
      Port: 8080,
      EthereumGenesisContract: this.ethereum.getContractRegistryAddress(),
      EthereumEndpoint: `http://ganache:7545`,
      MaticEndpoint: `mock-endpoint`,
      DockerNamespace: 'orbsnetwork',
      ElectionsAuditOnly: false,
      StatusWriteIntervalSeconds: 1,
      DeploymentDescriptorPollIntervalSeconds: 1,
      RegularRolloutWindowSeconds: 2,
      HotfixRolloutWindowSeconds: 2,
      EthereumPollIntervalSeconds: 1,
      EthereumRequestsPerSecondLimit: 20,
      ElectionsStaleUpdateSeconds: 7 * 24 * 60 * 60,
      FinalityBufferBlocks: 10,
      EthereumFirstBlock: 0,
      Verbose: true,
      'node-address': 'ecfcCcbc1E54852337298c7E90f5eceE79439e67', // Guardian3 (mixed case!)
      DeploymentDescriptorUrl: 'https://deployment.orbs.network/e2e/management-service-test.json', // TODO: move to local docker
    };
  }

  // runs all the docker instances with docker-compose
  launchServices(bootstrapMode: boolean) {
    test.serial.before((t) => t.log('[E2E] driver launchServices() start'));

    // step 1 - launch ganache docker
    test.serial.before((t) => t.log('[E2E] launch ganache docker'));
    this.envName = dockerComposeTool(
      test.serial.before.bind(test.serial),
      test.serial.after.always.bind(test.serial.after),
      this.pathToDockerCompose,
      {
        startOnlyTheseServices: ['ganache'],
        containerCleanUp: false,
      } as any
    );

    // step 2 - let ganache warm up
    test.serial.before(async (t) => {
      t.log('[E2E] wait 5 seconds for ganache to warm up');
      await sleep(10000);
    });

    // step 3 - deploy ethereum PoS contracts to ganache
    test.serial.before(async (t) => {
      t.log('[E2E] deploy ethereum PoS contracts to ganache');
      t.timeout(2 * 60 * 1000);
      const ganacheAddress = await getAddressForService(this.envName, this.pathToDockerCompose, 'ganache', 7545);
      await this.ethereum.deployContracts(() => {
        return new Web3(
          new (HDWalletProvider as any)(
            'vanish junk genuine web seminar cook absurd royal ability series taste method identify elevator liquid',
            `http://localhost:${portFromAddress(ganacheAddress)}`,
            0,
            100,
            false
          )
        );
      });
      t.log('[E2E] ethereum PoS contracts deployed');
    });

    test.serial.after(async (t) => {
      await this.ethereum.closeConnections();
    });

    // step 4 - write config file for app
    test.serial.before((t) => {
      t.log('[E2E] write config file for app');
      const configFilePath = join(__dirname, 'app-config.json');
      try {
        unlinkSync(configFilePath);
      } catch (err) {}
      writeFileSync(configFilePath, JSON.stringify(this.getAppConfig(bootstrapMode)));
    });

    // step 5 - launch app docker
    test.serial.before((t) => t.log('[E2E] launch app docker'));
    dockerComposeTool(
      test.serial.before.bind(test.serial),
      test.serial.after.always.bind(test.serial.after),
      this.pathToDockerCompose,
      {
        envName: this.envName,
        startOnlyTheseServices: ['app'],
        shouldPullImages: false,
        cleanUp: false,
        // containerCleanUp: false
      } as any
    );

    // // old step - print app logs from docker on failure
    // test.serial.afterEach.always('print logs on failures', async (t) => {
    //     if (t.passed) return;
    //     const logs = await getLogsForService(this.envName, this.pathToDockerCompose, 'app');
    //     t.log(logs);
    // });

    // step 6 - start live dump of logs from app to test logger
    test.serial.before(async (t) => {
      t.log('[E2E] start live dump of logs from app to test logger');
      const logP = exec(`docker-compose -p ${this.envName} -f "${this.pathToDockerCompose}" logs -f app`);
      this.testLogger = t.log;
      logP.stdout.on('data', (data) => {
        if (this.testLogger) this.testLogger(data);
      });
      logP.on('exit', () => {
        if (this.testLogger) this.testLogger(`app log exited`);
      });
    });

    test.serial.before((t) => t.log('[E2E] driver launchServices() finished'));
  }

  async fetch(serviceName: string, port: number, path: string) {
    const addr = await getAddressForService(this.envName, this.pathToDockerCompose, serviceName, port);
    return await retry(
      async () => {
        const response = await fetch(`http://${addr}/${path}`);
        const body = await response.text();
        try {
          return JSON.parse(body);
        } catch (e) {
          throw new Error(`invalid response: \n${body}`);
        }
      },
      { retries: 10, delay: 300 }
    );
  }
}

function portFromAddress(address: string) {
  return address.split(':')[1];
}
