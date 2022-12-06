import test from 'ava';
import { TaskLoop } from './task-loop';
import { sleep } from './helpers';

test('TaskLoop runs the task when started and stops when stopped', async (t) => {
  let counter = 0;
  const runFunc = async () => {
    counter++;
    await sleep(0); // for lint
  };
  const task = new TaskLoop(() => runFunc(), 1);
  task.start();
  await sleep(50);
  t.assert(counter > 1);
  task.stop();
  await sleep(50);
  const counterOnStop = counter;
  await sleep(50);
  t.is(counter, counterOnStop);
});

test('TaskLoop recovers from exceptions thrown in task', async (t) => {
  let counter = 0;
  const throwingFunc = async () => {
    counter++;
    await sleep(0); // for lint
    throw new Error('oh no!');
  };
  const task = new TaskLoop(() => throwingFunc(), 1);
  task.start();
  await sleep(50);
  t.assert(counter > 1);
});
