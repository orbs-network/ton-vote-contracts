import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { StateManager } from './model/manager';
import { ServiceConfiguration } from './config';
import { renderServiceStatus, renderServiceStatusAnalytics } from './api/render-status';
import { DailyStatsData, sleep } from './helpers';
import * as Logger from './logger';

export class StatusWriter {
  constructor(private state: StateManager, private config: ServiceConfiguration) {}

  // single tick of the run loop
  async run(stats: DailyStatsData) {
    // render status
    const snapshot = this.state.getCurrentSnapshot();
    const status = renderServiceStatus(snapshot, stats, this.config);
    const statusAnalytics = renderServiceStatusAnalytics(snapshot, stats, this.config);

    // do the actual writing to local files
    writeFile(this.config.StatusJsonPath, status);
    writeFile(this.config.StatusAnalyticsJsonPath, statusAnalytics);

    await sleep(0); // for eslint
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeFile(filePath: string, jsonObject: any) {
  ensureFileDirectoryExists(filePath);
  const content = JSON.stringify(jsonObject, null, 2);
  writeFileSync(filePath, content);
  // log progress
  Logger.log(`Wrote status JSON to ${filePath} (${content.length} bytes).`);
}

export function ensureFileDirectoryExists(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
}
