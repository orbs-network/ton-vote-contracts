import { ServiceConfiguration, validateServiceConfiguration, defaultServiceConfiguration } from './config';
import { readFileSync } from 'fs';
import yargs from 'yargs';
import * as Logger from './logger';

export function parseArgs(argv: string[]): ServiceConfiguration {
  const options = yargs(argv)
    .option('config', {
      type: 'array',
      required: true,
      string: true,
      description: 'list of config files',
    })
    .exitProcess(false)
    .parse();

  const externalLaunchConfig = Object.assign(
    {},
    ...options.config.map((configFile) => JSON.parse(readFileSync(configFile).toString()))
  );

  const config = Object.assign(defaultServiceConfiguration, externalLaunchConfig);

  config.ExternalLaunchConfig = externalLaunchConfig;

  const validationErrors = validateServiceConfiguration(config);
  if (validationErrors) {
    Logger.error(`Invalid JSON config: '${JSON.stringify(config)}'.`);
    throw new Error(`illegal configuration value ${JSON.stringify(config)}\n ${validationErrors.join('\n')}`);
  }

  return config;
}
