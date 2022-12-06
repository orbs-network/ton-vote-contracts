/* eslint-disable @typescript-eslint/unbound-method */
import test from 'ava';
import { getIpFromHex, DailyStats } from './helpers';

test('getIpFromHex works', (t) => {
  t.is(getIpFromHex('0x01010101'), '1.1.1.1');
  t.is(getIpFromHex('0x01020304'), '1.2.3.4');
  t.is(getIpFromHex('0xffffffff'), '255.255.255.255');
});

test('DailyStats works', (t) => {
  const d = new DailyStats(2);
  t.deepEqual(d.getStats(), []);
  d.today = () => '2020-01-01';
  d.add(1);
  t.deepEqual(d.getStats(), [{ day: '2020-01-01', count: 1 }]);
  d.add(2);
  t.deepEqual(d.getStats(), [{ day: '2020-01-01', count: 3 }]);
  d.today = () => '2020-01-02';
  d.add(4);
  t.deepEqual(d.getStats(), [
    { day: '2020-01-01', count: 3 },
    { day: '2020-01-02', count: 4 },
  ]);
  d.add(5);
  t.deepEqual(d.getStats(), [
    { day: '2020-01-01', count: 3 },
    { day: '2020-01-02', count: 9 },
  ]);
  d.today = () => '2020-01-03';
  d.add(6);
  t.deepEqual(d.getStats(), [
    { day: '2020-01-02', count: 9 },
    { day: '2020-01-03', count: 6 },
  ]);
  d.add(1);
  t.deepEqual(d.getStats(), [
    { day: '2020-01-02', count: 9 },
    { day: '2020-01-03', count: 7 },
  ]);
});
