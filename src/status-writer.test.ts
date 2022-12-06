import test from 'ava';
import mockFs from 'mock-fs';
import { exampleConfig } from './config.example';
import { StateManager } from './model/manager';
import { StatusWriter } from './status-writer';
import { DailyStatsData } from './helpers';
import { readFileSync } from 'fs';

test.serial.afterEach.always(() => {
  mockFs.restore();
});

test.serial('updates and writes Timestamp', async (t) => {
  const state = new StateManager(exampleConfig);
  const stats: DailyStatsData = [];
  mockFs({ ['./status/status.json']: '' });

  const statusWriter = new StatusWriter(state, exampleConfig);
  await statusWriter.run(stats);

  const writtenContents = JSON.parse(readFileSync('./status/status.json').toString());
  t.log('result:', JSON.stringify(writtenContents, null, 2));

  t.assert(new Date().getTime() - new Date(writtenContents.Timestamp).getTime() < 1000);
});
