import test from 'ava';
import { State, NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME } from './state';
import { day } from '../helpers';
import { ContractName } from '../ethereum/types';
import { Committee as testCommittee } from './committee_example_test.json';
import _ from 'lodash';

test('state applies time ref and ref block', (t) => {
  const s = new State();
  s.applyNewTimeRef(1000, 100);
  t.is(s.getSnapshot().CurrentRefTime, 1000);
  t.is(s.getSnapshot().CurrentRefBlock, 100);
  t.is(s.getSnapshot().PageStartRefTime, 0);
  t.is(s.getSnapshot().PageEndRefTime, 1000);
});

test('state applies commitee, standby, IPs and topology', (t) => {
  const s = new State();

  GuardianDataUpdated(s, 1000, '0xA', '0xa1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xB', '0xb1', '0x02020202');
  GuardianDataUpdated(s, 1000, '0xC', '0xc1', '0x03030303');
  GuardianDataUpdated(s, 1000, '0xM', '0xm1', '0x04040404');
  GuardianDataUpdated(s, 1000, '0xN', '0xn1', '0x05050505');

  GuardianStatusUpdated(s, 1000, '0xA', true, false);
  GuardianStatusUpdated(s, 1000, '0xB', true, false);
  GuardianStatusUpdated(s, 1000, '0xC', true, false);
  GuardianStatusUpdated(s, 1000, '0xM', true, false);
  GuardianStatusUpdated(s, 1000, '0xN', true, false);

  // change committee to [A, B, C]
  CommitteeChange(s, 1000, '0xA', true);
  CommitteeChange(s, 1000, '0xB', true);
  CommitteeChange(s, 1000, '0xC', true);

  // change standbys to [M, N]
  CommitteeChange(s, 1000, '0xM', false);
  CommitteeChange(s, 1000, '0xN', false);

  s.applyNewTimeRef(1000, 100);

  GuardianDataUpdated(s, 2000, '0xZ', '0xz2', '0x06060606');
  GuardianDataUpdated(s, 2000, '0xA', '0xa2', '0x07070707');
  GuardianDataUpdated(s, 2000, '0xO', '0xo2', '0x08080808');
  GuardianDataUpdated(s, 2000, '0xB', '0xb2', '0x02020202');
  GuardianDataUpdated(s, 2000, '0xC', '0xc2', '0x03030303');
  GuardianDataUpdated(s, 2000, '0xN', '0xn2', '0x05050505');

  GuardianStatusUpdated(s, 2000, '0xZ', true, false);
  GuardianStatusUpdated(s, 2000, '0xO', true, false);

  // change committee to [Z, B, C]
  CommitteeChange(s, 2000, '0xA', false);
  CommitteeChange(s, 2000, '0xZ', true);

  // change standbys to [A, M, N, O]
  CommitteeChange(s, 2000, '0xM', false);
  CommitteeChange(s, 2000, '0xO', false);

  s.applyNewTimeRef(2000, 200);

  GuardianDataUpdated(s, day + 3000, '0xX', '0xx3', '0x09090909');
  GuardianDataUpdated(s, day + 3000, '0xZ', '0xz3', '0x0a0a0a0a');
  GuardianDataUpdated(s, day + 3000, '0xZ', '0xz3', '0x0b0b0b0b');
  GuardianDataUpdated(s, day + 3000, '0xP', '0xp3', '0x0c0c0c0c');
  GuardianDataUpdated(s, day + 3000, '0xO', '0xo3', '0x08080808');

  GuardianStatusUpdated(s, day + 3000, '0xX', true, false);
  GuardianStatusUpdated(s, day + 3000, '0xP', true, false);

  // change committee to [X, Z]
  CommitteeChange(s, day + 3000, '0xB', false);
  CommitteeChange(s, day + 3000, '0xC', false);
  CommitteeChange(s, day + 3000, '0xX', true);

  // change standbys to [A, B, C, M, N]
  CommitteeChange(s, day + 3000, '0xN', false);
  CommitteeChange(s, day + 3000, '0xP', false);
  StakeChanged(s, day + 3000, '0xO', '20000000000000000000000');

  s.applyNewTimeRef(day + 3000, 300);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.is(s.getSnapshot().CurrentIp['a'], '7.7.7.7');
  t.is(s.getSnapshot().CurrentIp['b'], '2.2.2.2');
  t.is(s.getSnapshot().CurrentIp['c'], '3.3.3.3');
  t.is(s.getSnapshot().CurrentIp['m'], '4.4.4.4');
  t.is(s.getSnapshot().CurrentIp['n'], '5.5.5.5');
  t.is(s.getSnapshot().CurrentIp['z'], '11.11.11.11');
  t.is(s.getSnapshot().CurrentIp['o'], '8.8.8.8');
  t.is(s.getSnapshot().CurrentIp['x'], '9.9.9.9');
  t.is(s.getSnapshot().CurrentIp['p'], '12.12.12.12');

  t.is(s.getSnapshot().CurrentOrbsAddress['a'], 'a2');
  t.is(s.getSnapshot().CurrentOrbsAddress['b'], 'b2');
  t.is(s.getSnapshot().CurrentOrbsAddress['c'], 'c2');
  t.is(s.getSnapshot().CurrentOrbsAddress['m'], 'm1');
  t.is(s.getSnapshot().CurrentOrbsAddress['n'], 'n2');
  t.is(s.getSnapshot().CurrentOrbsAddress['z'], 'z3');
  t.is(s.getSnapshot().CurrentOrbsAddress['o'], 'o3');
  t.is(s.getSnapshot().CurrentOrbsAddress['x'], 'x3');
  t.is(s.getSnapshot().CurrentOrbsAddress['p'], 'p3');

  t.deepEqual(s.getSnapshot().CurrentCandidates, [
    { EthAddress: 'o', IsStandby: true, Name: 'name' },
    { EthAddress: 'a', IsStandby: true, Name: 'name' },
    { EthAddress: 'b', IsStandby: true, Name: 'name' },
    { EthAddress: 'c', IsStandby: true, Name: 'name' },
    { EthAddress: 'm', IsStandby: true, Name: 'name' },
    { EthAddress: 'n', IsStandby: false, Name: 'name' },
    { EthAddress: 'p', IsStandby: false, Name: 'name' },
  ]);

  t.is(s.getSnapshot().CommitteeSets.length, 3);

  t.is(s.getSnapshot().CommitteeSets[0].RefTime, 1000);
  t.deepEqual(s.getSnapshot().CommitteeSets[0].CommitteeEthAddresses, ['a', 'b', 'c']);

  t.is(s.getSnapshot().CommitteeSets[1].RefTime, 2000);
  t.deepEqual(s.getSnapshot().CommitteeSets[1].CommitteeEthAddresses, ['b', 'c', 'z']);

  t.is(s.getSnapshot().CommitteeSets[2].RefTime, day + 3000);
  t.deepEqual(s.getSnapshot().CommitteeSets[2].CommitteeEthAddresses, ['x', 'z']);

  t.is(s.getSnapshot().CommitteeEvents.length, 3);
  t.is(s.getSnapshot().CommitteeEvents[0].RefTime, 1000);
  t.deepEqual(s.getSnapshot().CommitteeEvents[0].Committee, [
    { EthAddress: 'a', OrbsAddress: 'a1', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
    { EthAddress: 'b', OrbsAddress: 'b1', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
    { EthAddress: 'c', OrbsAddress: 'c1', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
  ]);
  t.is(s.getSnapshot().CommitteeEvents[1].RefTime, 2000);
  t.deepEqual(s.getSnapshot().CommitteeEvents[1].Committee, [
    { EthAddress: 'b', OrbsAddress: 'b2', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
    { EthAddress: 'c', OrbsAddress: 'c2', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
    { EthAddress: 'z', OrbsAddress: 'z2', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
  ]);
  t.is(s.getSnapshot().CommitteeEvents[2].RefTime, day + 3000);
  t.deepEqual(s.getSnapshot().CommitteeEvents[2].Committee, [
    { EthAddress: 'x', OrbsAddress: 'x3', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
    { EthAddress: 'z', OrbsAddress: 'z3', Weight: 10000, IdentityType: 0, EffectiveStake: 10000 },
  ]);

  t.deepEqual(s.getSnapshot().CurrentTopology, [
    { EthAddress: 'a', OrbsAddress: 'a2', Ip: '7.7.7.7', Port: 0, Name: 'name' },
    { EthAddress: 'b', OrbsAddress: 'b2', Ip: '2.2.2.2', Port: 0, Name: 'name' },
    { EthAddress: 'c', OrbsAddress: 'c2', Ip: '3.3.3.3', Port: 0, Name: 'name' },
    { EthAddress: 'm', OrbsAddress: 'm1', Ip: '4.4.4.4', Port: 0, Name: 'name' },
    { EthAddress: 'o', OrbsAddress: 'o3', Ip: '8.8.8.8', Port: 0, Name: 'name' },
    { EthAddress: 'x', OrbsAddress: 'x3', Ip: '9.9.9.9', Port: 0, Name: 'name' },
    { EthAddress: 'z', OrbsAddress: 'z3', Ip: '11.11.11.11', Port: 0, Name: 'name' },
  ]);

  t.deepEqual(s.getSnapshot().CurrentCommittee, [
    { EthAddress: 'x', Weight: 10000, IdentityType: 0, Name: 'name', EnterTime: day + 3000, EffectiveStake: 10000 },
    { EthAddress: 'z', Weight: 10000, IdentityType: 0, Name: 'name', EnterTime: 2000, EffectiveStake: 10000 },
  ]);
  t.deepEqual(s.getSnapshot().CurrentEffectiveStake, {
    a: 10000,
    b: 10000,
    c: 10000,
    m: 10000,
    n: 10000,
    o: 20000,
    p: 10000,
    x: 10000,
    z: 10000,
  });

  // leaving and re-entering the committee resets EnterTime
  CommitteeChange(s, day + 5000, '0xZ', false);
  CommitteeChange(s, day + 6000, '0xZ', true);
  t.is(s.getSnapshot().CurrentCommittee[1].EnterTime, day + 6000);
  CommitteeChange(s, day + 7000, '0xZ', true);
  t.is(s.getSnapshot().CurrentCommittee[1].EnterTime, day + 6000);

  // unregister removes from topology (and replaces with different standbys)
  t.deepEqual(s.getSnapshot().CurrentTopology, [
    { EthAddress: 'a', OrbsAddress: 'a2', Ip: '7.7.7.7', Port: 0, Name: 'name' },
    { EthAddress: 'b', OrbsAddress: 'b2', Ip: '2.2.2.2', Port: 0, Name: 'name' },
    { EthAddress: 'c', OrbsAddress: 'c2', Ip: '3.3.3.3', Port: 0, Name: 'name' },
    { EthAddress: 'm', OrbsAddress: 'm1', Ip: '4.4.4.4', Port: 0, Name: 'name' },
    { EthAddress: 'o', OrbsAddress: 'o3', Ip: '8.8.8.8', Port: 0, Name: 'name' },
    { EthAddress: 'x', OrbsAddress: 'x3', Ip: '9.9.9.9', Port: 0, Name: 'name' },
    { EthAddress: 'z', OrbsAddress: 'z3', Ip: '11.11.11.11', Port: 0, Name: 'name' },
  ]);
  GuardianDataUpdated(s, day + 8000, '0xB', '0xb2', '0x02020202', false);
  GuardianDataUpdated(s, day + 8000, '0xM', '0xm1', '0x04040404', false);
  s.applyNewTimeRef(day + 8000, 800);
  t.log(JSON.stringify(s.getSnapshot().CurrentTopology));
  t.deepEqual(s.getSnapshot().CurrentTopology, [
    { EthAddress: 'a', OrbsAddress: 'a2', Ip: '7.7.7.7', Port: 0, Name: 'name' },
    { EthAddress: 'c', OrbsAddress: 'c2', Ip: '3.3.3.3', Port: 0, Name: 'name' },
    { EthAddress: 'n', OrbsAddress: 'n2', Ip: '5.5.5.5', Port: 0, Name: 'name' },
    { EthAddress: 'o', OrbsAddress: 'o3', Ip: '8.8.8.8', Port: 0, Name: 'name' },
    { EthAddress: 'p', OrbsAddress: 'p3', Ip: '12.12.12.12', Port: 0, Name: 'name' },
    { EthAddress: 'x', OrbsAddress: 'x3', Ip: '9.9.9.9', Port: 0, Name: 'name' },
    { EthAddress: 'z', OrbsAddress: 'z3', Ip: '11.11.11.11', Port: 0, Name: 'name' },
  ]);
});

test('state handles guardian unregister', (t) => {
  const s = new State();

  GuardianDataUpdated(s, 1000, '0x1', '0xaa', '0x01010101');
  GuardianDataUpdated(s, 1000, '0x1', '0xaa', '0x01010101', false);
  GuardianDataUpdated(s, 2000, '0x2', '0xaa', '0x01010101');

  t.is(Object.keys(s.getSnapshot().CurrentOrbsAddress).length, 1);
  t.is(Object.keys(s.getSnapshot().CurrentIp).length, 1);
  t.is(s.getSnapshot().CurrentOrbsAddress['2'], 'aa');
  t.is(s.getSnapshot().CurrentIp['2'], '1.1.1.1');
});

test('state calculates committee weights correctly and guardian stake', (t) => {
  const s = new State();

  GuardianCommitteeWeight(s, '0xA', '10000000000000000000000', true);
  GuardianCommitteeWeight(s, '0xB', '20000000000000000000000', true);

  t.log(JSON.stringify(s.getSnapshot().CurrentCommittee, null, 2));

  t.deepEqual(s.getSnapshot().CurrentCommittee, [
    { EthAddress: 'b', Weight: 20000, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 20000 },
    { EthAddress: 'a', Weight: 15000, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 10000 },
  ]);
  t.deepEqual(s.getSnapshot().CurrentEffectiveStake, {
    a: 10000,
    b: 20000,
  });

  GuardianCommitteeWeight(s, '0xC', '10000000000000000000000', true);

  t.log(JSON.stringify(s.getSnapshot().CurrentCommittee, null, 2));

  t.deepEqual(s.getSnapshot().CurrentCommittee, [
    { EthAddress: 'b', Weight: 20000, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 20000 },
    { EthAddress: 'a', Weight: 13333, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 10000 },
    { EthAddress: 'c', Weight: 13333, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 10000 },
  ]);
  t.deepEqual(s.getSnapshot().CurrentEffectiveStake, {
    a: 10000,
    b: 20000,
    c: 10000,
  });

  GuardianCommitteeWeight(s, '0xB', '20000000000000000000000', false);

  t.log(JSON.stringify(s.getSnapshot().CurrentCommittee, null, 2));

  t.deepEqual(s.getSnapshot().CurrentCommittee, [
    { EthAddress: 'a', Weight: 10000, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 10000 },
    { EthAddress: 'c', Weight: 10000, IdentityType: 0, Name: '', EnterTime: 1000, EffectiveStake: 10000 },
  ]);
  t.deepEqual(s.getSnapshot().CurrentEffectiveStake, {
    a: 10000,
    b: 20000,
    c: 10000,
  });

  StakeChanged(s, 2000, '0xA', '10000000000000000000000');
  StakeChanged(s, 2000, '0xB', '20000000000000000000000');
  StakeChanged(s, 2000, '0xC', '10000000000000000000000');

  t.deepEqual(s.getSnapshot().CurrentDetailedStake, {
    a: { SelfStake: 0, DelegatedStake: 10000 },
    b: { SelfStake: 0, DelegatedStake: 20000 },
    c: { SelfStake: 0, DelegatedStake: 10000 },
  });

  StakeChanged(s, 2000, '0xA', '0');
  StakeChanged(s, 2000, '0xB', '30000000000000000000000');

  t.deepEqual(s.getSnapshot().CurrentDetailedStake, {
    b: { SelfStake: 0, DelegatedStake: 30000 },
    c: { SelfStake: 0, DelegatedStake: 10000 },
  });
});

test('state calculates committee weights correctly: New weight calc ', (t) => {
  const s = new State();
  testCommittee.Members.map((m: { EthAddress: string; Weight: number; EffectiveStake: number }) => {
    const weight = m.EffectiveStake.toString();
    GuardianCommitteeWeight(
      s,
      m.EthAddress,
      weight.padEnd(weight.length + 18, '0'),
      true,
      NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME - 1
    );
  });
  t.is(s.getSnapshot().CurrentCommittee.length, testCommittee.Members.length);
  for (const node of s.getSnapshot().CurrentCommittee) {
    t.is(s.getSnapshot().CurrentEffectiveStake[node.EthAddress], node.EffectiveStake);
  }
  t.is(
    _.filter(s.getSnapshot().CurrentCommittee, (m) => m.EthAddress == 'f7ae622c77d0580f02bcb2f92380d61e3f6e466c')[0]
      .Weight,
    _.filter(testCommittee.Members, (m) => m.EthAddress == 'f7ae622c77d0580f02bcb2f92380d61e3f6e466c')[0].Weight
  );

  testCommittee.Members.map((m: { EthAddress: string; Weight: number; EffectiveStake: number }) => {
    const weight = m.EffectiveStake.toString();
    GuardianCommitteeWeight(
      s,
      m.EthAddress,
      weight.padEnd(weight.length + 18, '0'),
      true,
      NEW_FIX_COMMITTEE_WEIGHTS_BREAKING_CHANGE_TIME
    );
  });

  t.assert(
    _.filter(s.getSnapshot().CurrentCommittee, (m) => m.EthAddress == 'f7ae622c77d0580f02bcb2f92380d61e3f6e466c')[0]
      .Weight >
      _.filter(testCommittee.Members, (m) => m.EthAddress == 'f7ae622c77d0580f02bcb2f92380d61e3f6e466c')[0].Weight
  );

  const totalWeight = _.sum(_.map(s.getSnapshot().CurrentCommittee, (node) => node.Weight ?? 0));
  const totalStake = _.sum(_.map(s.getSnapshot().CurrentCommittee, (node) => node.EffectiveStake ?? 0));

  const top3Sum = [
    _.sumBy(s.getSnapshot().CurrentCommittee.slice(0, 3), 'Weight'),
    _.sumBy(s.getSnapshot().CurrentCommittee.slice(0, 3), 'EffectiveStake'),
  ];
  t.assert(top3Sum[0] / totalWeight < 1 / 3);
  t.assert(top3Sum[1] / totalStake < 2 / 3);
});

test('state applies elections status updates and sets candidates accordingly', (t) => {
  const s = new State();

  GuardianDataUpdated(s, 1000, '0xA', '0xa1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xB', '0xb1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xC', '0xc1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xD', '0xd1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xX', '0xx1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xY', '0xy1', '0x01010101');
  GuardianDataUpdated(s, 1000, '0xZ', '0xz1', '0x01010101');

  StakeChanged(s, 1000, '0xA', '10000000000000000000000');
  StakeChanged(s, 1000, '0xB', '20000000000000000000000');
  StakeChanged(s, 1000, '0xC', '30000000000000000000000');
  StakeChanged(s, 1000, '0xD', '40000000000000000000000');
  StakeChanged(s, 1000, '0xE', '50000000000000000000000');

  GuardianStatusUpdated(s, 1000, '0xA', true, false);
  GuardianStatusUpdated(s, 2000, '0xB', false, false);
  GuardianStatusUpdated(s, 3000, '0xB', true, true);
  GuardianStatusUpdated(s, 4000, '0xC', true, true);
  s.applyNewTimeRef(4000, 100);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.deepEqual(s.getSnapshot().CurrentElectionsStatus['a'], {
    LastUpdateTime: 1000,
    ReadyToSync: true,
    ReadyForCommittee: false,
    TimeToStale: 7 * 24 * 60 * 60 - 3000,
  });
  t.deepEqual(s.getSnapshot().CurrentElectionsStatus['b'], {
    LastUpdateTime: 3000,
    ReadyToSync: true,
    ReadyForCommittee: true,
    TimeToStale: 7 * 24 * 60 * 60 - 1000,
  });
  t.deepEqual(s.getSnapshot().CurrentElectionsStatus['c'], {
    LastUpdateTime: 4000,
    ReadyToSync: true,
    ReadyForCommittee: true,
    TimeToStale: 7 * 24 * 60 * 60,
  });
  t.deepEqual(s.getSnapshot().CurrentCandidates, [
    { EthAddress: 'c', IsStandby: true, Name: 'name' },
    { EthAddress: 'b', IsStandby: true, Name: 'name' },
    { EthAddress: 'a', IsStandby: true, Name: 'name' },
  ]);

  GuardianStatusUpdated(s, 1 * day, '0xD', true, false);
  GuardianStatusUpdated(s, 1 * day, '0xX', true, false);
  GuardianStatusUpdated(s, 1 * day, '0xY', true, false);
  GuardianStatusUpdated(s, 1 * day, '0xZ', true, false);
  GuardianStatusUpdated(s, 5 * day, '0xA', true, false);
  s.getSnapshot().CurrentCommittee = [
    { EthAddress: 'b', Weight: 1, IdentityType: 0, Name: 'name', EnterTime: 1000, EffectiveStake: 10000 },
  ];
  s.applyNewTimeRef(10 * day, 10000);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.assert(s.getSnapshot().CurrentElectionsStatus['a'].TimeToStale > 0);
  t.assert(s.getSnapshot().CurrentElectionsStatus['b'].TimeToStale == 7 * 24 * 60 * 60);
  t.assert(s.getSnapshot().CurrentElectionsStatus['c'].TimeToStale == 0);
  t.deepEqual(s.getSnapshot().CurrentCandidates, [
    { EthAddress: 'a', IsStandby: true, Name: 'name' },
    { EthAddress: 'd', IsStandby: true, Name: 'name' },
    { EthAddress: 'c', IsStandby: true, Name: 'name' },
    { EthAddress: 'x', IsStandby: true, Name: 'name' },
    { EthAddress: 'y', IsStandby: true, Name: 'name' },
    { EthAddress: 'z', IsStandby: false, Name: 'name' },
  ]);

  GuardianStatusUpdated(s, 11 * day, '0xA', false, false);
  GuardianStatusUpdated(s, 11 * day, '0xC', false, false);
  s.applyNewTimeRef(11 * day, 20000);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.deepEqual(s.getSnapshot().CurrentCandidates, [
    { EthAddress: 'd', IsStandby: true, Name: 'name' },
    { EthAddress: 'x', IsStandby: true, Name: 'name' },
    { EthAddress: 'y', IsStandby: true, Name: 'name' },
    { EthAddress: 'z', IsStandby: true, Name: 'name' },
  ]);
});

test('state applies virtual chain subscriptions', (t) => {
  const s = new State();

  SubscriptionChanged(s, 1000, 'V1', 9010);
  s.applyNewTimeRef(1000, 100);

  SubscriptionChanged(s, 2000, 'V2', 3500);
  SubscriptionChanged(s, 2000, 'V3', 3500);
  s.applyNewTimeRef(2000, 200);

  SubscriptionChanged(s, 3000, 'V3', 9020);
  SubscriptionChanged(s, 3000, 'V4', 4500);
  SubscriptionChanged(s, 3000, 'V5', 3500);
  s.applyNewTimeRef(3000, 300);

  SubscriptionChanged(s, 4000, 'V4', 4700);
  SubscriptionChanged(s, 4000, 'V5', 9030);
  s.applyNewTimeRef(4000, 400);

  s.applyNewTimeRef(5000, 500);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.is(s.getSnapshot().CurrentVirtualChains['V1'].Expiration, 9010);
  t.is(s.getSnapshot().CurrentVirtualChains['V2'].Expiration, 3500);
  t.is(s.getSnapshot().CurrentVirtualChains['V3'].Expiration, 9020);
  t.is(s.getSnapshot().CurrentVirtualChains['V4'].Expiration, 4700);
  t.is(s.getSnapshot().CurrentVirtualChains['V5'].Expiration, 9030);

  t.is(s.getSnapshot().SubscriptionEvents['V1'].length, 2);
  t.is(s.getSnapshot().SubscriptionEvents['V1'][0].RefTime, 1000);
  t.is(s.getSnapshot().SubscriptionEvents['V1'][0].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V1'][1].RefTime, 9010);
  t.is(s.getSnapshot().SubscriptionEvents['V1'][1].Data.Status, 'expired');

  t.is(s.getSnapshot().SubscriptionEvents['V2'].length, 2);
  t.is(s.getSnapshot().SubscriptionEvents['V2'][0].RefTime, 2000);
  t.is(s.getSnapshot().SubscriptionEvents['V2'][0].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V2'][1].RefTime, 3500);
  t.is(s.getSnapshot().SubscriptionEvents['V2'][1].Data.Status, 'expired');

  t.is(s.getSnapshot().SubscriptionEvents['V3'].length, 3);
  t.is(s.getSnapshot().SubscriptionEvents['V3'][0].RefTime, 2000);
  t.is(s.getSnapshot().SubscriptionEvents['V3'][0].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V3'][1].RefTime, 3000);
  t.is(s.getSnapshot().SubscriptionEvents['V3'][1].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V3'][2].RefTime, 9020);
  t.is(s.getSnapshot().SubscriptionEvents['V3'][2].Data.Status, 'expired');

  t.is(s.getSnapshot().SubscriptionEvents['V4'].length, 3);
  t.is(s.getSnapshot().SubscriptionEvents['V4'][0].RefTime, 3000);
  t.is(s.getSnapshot().SubscriptionEvents['V4'][0].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V4'][1].RefTime, 4000);
  t.is(s.getSnapshot().SubscriptionEvents['V4'][1].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V4'][2].RefTime, 4700);
  t.is(s.getSnapshot().SubscriptionEvents['V4'][2].Data.Status, 'expired');

  t.is(s.getSnapshot().SubscriptionEvents['V5'].length, 4);
  t.is(s.getSnapshot().SubscriptionEvents['V5'][0].RefTime, 3000);
  t.is(s.getSnapshot().SubscriptionEvents['V5'][0].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V5'][1].RefTime, 3500);
  t.is(s.getSnapshot().SubscriptionEvents['V5'][1].Data.Status, 'expired');
  t.is(s.getSnapshot().SubscriptionEvents['V5'][2].RefTime, 4000);
  t.is(s.getSnapshot().SubscriptionEvents['V5'][2].Data.Status, 'active');
  t.is(s.getSnapshot().SubscriptionEvents['V5'][3].RefTime, 9030);
  t.is(s.getSnapshot().SubscriptionEvents['V5'][3].Data.Status, 'expired');

  t.deepEqual(s.getSnapshot().CurrentVirtualChains['V1'], {
    Expiration: 9010,
    RolloutGroup: 'main',
    IdentityType: 0,
    GenesisRefTime: 9999,
    Tier: 'defaultTier',
    Name: 'name',
    Owner: 'owner',
    Rate: '1111',
  });
  t.deepEqual(s.getSnapshot().CurrentVirtualChains['V2'], {
    Expiration: 3500,
    Tier: 'defaultTier',
    RolloutGroup: 'main',
    IdentityType: 0,
    GenesisRefTime: 9999,
    Name: 'name',
    Owner: 'owner',
    Rate: '1111',
  });
  t.deepEqual(s.getSnapshot().CurrentVirtualChains['V3'], {
    Expiration: 9020,
    Tier: 'defaultTier',
    RolloutGroup: 'main',
    IdentityType: 0,
    GenesisRefTime: 9999,
    Name: 'name',
    Owner: 'owner',
    Rate: '1111',
  });
  t.deepEqual(s.getSnapshot().CurrentVirtualChains['V4'], {
    Expiration: 4700,
    Tier: 'defaultTier',
    RolloutGroup: 'main',
    IdentityType: 0,
    GenesisRefTime: 9999,
    Name: 'name',
    Owner: 'owner',
    Rate: '1111',
  });
  t.deepEqual(s.getSnapshot().CurrentVirtualChains['V5'], {
    Expiration: 9030,
    Tier: 'defaultTier',
    RolloutGroup: 'main',
    IdentityType: 0,
    GenesisRefTime: 9999,
    Name: 'name',
    Owner: 'owner',
    Rate: '1111',
  });
});

test('state applies protocol version changes', (t) => {
  const s = new State();

  ProtocolVersionChanged(s, 1000, 5, 1500);
  s.applyNewTimeRef(1000, 100);

  ProtocolVersionChanged(s, 2000, 6, 2500);
  s.applyNewTimeRef(2000, 200);

  ProtocolVersionChanged(s, 3000, 7, 4500);
  s.applyNewTimeRef(3000, 300);

  ProtocolVersionChanged(s, 4000, 8, 5500);
  s.applyNewTimeRef(4000, 400);

  s.applyNewTimeRef(5000, 500);

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.is(s.getSnapshot().ProtocolVersionEvents['main'].length, 3);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][0].RefTime, 1500);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][0].Data.Version, 5);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][1].RefTime, 2500);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][1].Data.Version, 6);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][2].RefTime, 5500);
  t.is(s.getSnapshot().ProtocolVersionEvents['main'][2].Data.Version, 8);
});

test('state applies image version changes', (t) => {
  const s = new State();

  s.applyNewImageVersionPollTime(1000, 'main', 'node');
  s.applyNewImageVersion('main', 'node', 'v1.0.0');
  s.applyNewImageVersionPollTime(2000, 'main', 'management-service');
  s.applyNewImageVersionPendingUpdate('canary', 'node', 'v9.9.1', 8000);
  s.applyNewImageVersion('main', 'management-service', 'v1.0.1');
  s.applyNewImageVersionPollTime(3000, 'main', 'node');
  s.applyNewImageVersion('main', 'node', 'v1.5.3-hotfix');
  s.applyNewImageVersionPendingUpdate('canary', 'node', 'v9.9.2', 9000);
  s.applyNewImageVersionPollTime(4000, 'canary', 'node');
  s.applyNewImageVersion('canary', 'node', 'v1.5.5-canary');

  t.log(JSON.stringify(s.getSnapshot(), null, 2));

  t.is(Object.keys(s.getSnapshot().CurrentImageVersions['main']).length, 2);
  t.is(s.getSnapshot().CurrentImageVersions['main']['node'], 'v1.5.3-hotfix');
  t.is(s.getSnapshot().CurrentImageVersions['main']['management-service'], 'v1.0.1');
  t.is(s.getSnapshot().CurrentImageVersions['canary']['node'], 'v1.5.5-canary');
  t.deepEqual(s.getSnapshot().CurrentImageVersionsUpdater['main']['node'], {
    LastPollTime: 3000,
    PendingVersion: '',
    PendingVersionTime: 0,
  });
  t.deepEqual(s.getSnapshot().CurrentImageVersionsUpdater['main']['management-service'], {
    LastPollTime: 2000,
    PendingVersion: '',
    PendingVersionTime: 0,
  });
  t.deepEqual(s.getSnapshot().CurrentImageVersionsUpdater['canary']['node'], {
    LastPollTime: 4000,
    PendingVersion: 'v9.9.2',
    PendingVersionTime: 9000,
  });
});

test('state applies meta registration data', (t) => {
  const s = new State();

  GuardianMetadataChanged(s, 500, '0xA', 'REWARDS_FREQUENCY_SEC', '999');

  GuardianDataUpdated(s, 1000, '0xA', '0xa1', '0x01010101');
  GuardianMetadataChanged(s, 2000, '0xA', 'REWARDS_FREQUENCY_SEC', '112233');
  t.is(s.getSnapshot().CurrentRegistrationData['a'].Metadata['REWARDS_FREQUENCY_SEC'], '112233');

  GuardianDataUpdated(s, 2500, '0xA', '0xa1', '0x02020202');
  t.is(s.getSnapshot().CurrentRegistrationData['a'].Metadata['REWARDS_FREQUENCY_SEC'], '112233');

  GuardianMetadataChanged(s, 3000, '0xA', 'REWARDS_FREQUENCY_SEC', '445566');
  t.is(s.getSnapshot().CurrentRegistrationData['a'].Metadata['REWARDS_FREQUENCY_SEC'], '445566');
  t.is(s.getSnapshot().CurrentRegistrationData['a'].RegistrationTime, 19);

  t.falsy(s.getSnapshot().CurrentCertification['a']);
  GuardianCertificationUpdate(s, 4000, '0xA', true);
  t.truthy(s.getSnapshot().CurrentCertification['a']);
  GuardianCertificationUpdate(s, 5000, '0xA', false);
  t.falsy(s.getSnapshot().CurrentCertification['a']);
});

test('state applies contract address changes', (t) => {
  const s = new State();

  ContractAddressUpdated(s, 1000, 'elections', '0xE1');
  ContractAddressUpdated(s, 1000, 'delegations', '0xD1');

  t.is(s.getSnapshot().CurrentContractAddress.elections, '0xE1');
  t.is(s.getSnapshot().CurrentContractAddress.delegations, '0xD1');

  ContractAddressUpdated(s, 2000, 'elections', '0xE2');

  t.is(s.getSnapshot().CurrentContractAddress.elections, '0xE2');
  t.is(s.getSnapshot().CurrentContractAddress.delegations, '0xD1');

  t.deepEqual(s.getSnapshot().ContractAddressChanges, [
    {
      RefTime: 1000,
      ContractName: 'elections',
      Address: '0xE1',
    },
    {
      RefTime: 1000,
      ContractName: 'delegations',
      Address: '0xD1',
    },
    {
      RefTime: 2000,
      ContractName: 'elections',
      Address: '0xE2',
    },
  ]);
});

test('state update events stats', (t) => {
  const s = new State();
  const events1 = [
    'ContractAddressUpdated',
    'CommitteeChange',
    'SubscriptionChanged',
    'ProtocolVersionChanged',
    'GuardianDataUpdated',
    'GuardianStatusUpdated',
    'GuardianMetadataChanged',
    'GuardianCertificationUpdate',
    'StakeChanged',
  ];
  s.applyNewEventsProcessed(10001, events1);
  t.is(s.getSnapshot().EventsStats.TotalEventsProcessed, events1.length);

  const events2 = [
    'CommitteeChange',
    'CommitteeChange',
    'CommitteeChange',
    'CommitteeChange',
    'SubscriptionChanged',
    'SubscriptionChanged',
    'SubscriptionChanged',
    'StakeChanged',
    'StakeChanged',
  ];
  s.applyNewEventsProcessed(10112, events2);
  t.is(s.getSnapshot().EventsStats.TotalEventsProcessed, events1.length + events2.length);
  t.is(s.getSnapshot().EventsStats.EventCount['CommitteeChange'].Count, 5);
  t.is(s.getSnapshot().EventsStats.EventCount['StakeChanged'].Count, 3);
  t.is(s.getSnapshot().EventsStats.EventCount['ProtocolVersionChanged'].Count, 1);
});

function ContractAddressUpdated(s: State, time: number, contractName: ContractName, addr: string) {
  s.applyNewContractAddressUpdated(time, {
    ...eventBase,
    returnValues: {
      contractName,
      addr,
      managedContract: false,
    },
  });
}

function CommitteeChange(s: State, time: number, addr: string, inCommittee: boolean) {
  s.applyNewCommitteeChange(time, {
    ...eventBase,
    returnValues: {
      addr,
      weight: '10000000000000000000000',
      certification: false,
      inCommittee,
    },
  });
}

function GuardianCommitteeWeight(s: State, addr: string, weight: string, inCommittee: boolean, time = 1000) {
  s.applyNewCommitteeChange(time, {
    ...eventBase,
    returnValues: {
      addr,
      weight,
      certification: false,
      inCommittee,
    },
  });
}

function StakeChanged(s: State, time: number, addr: string, effectiveStake: string) {
  s.applyNewStakeChanged(time, {
    ...eventBase,
    returnValues: {
      addr,
      selfDelegatedStake: '0',
      // eslint-disable-next-line @typescript-eslint/camelcase
      delegatedStake: effectiveStake,
      // eslint-disable-next-line @typescript-eslint/camelcase
      effectiveStake: effectiveStake,
    },
  });
}

function GuardianDataUpdated(
  s: State,
  time: number,
  guardian: string,
  orbsAddr: string,
  ip: string,
  isRegistered = true
) {
  s.applyNewGuardianDataUpdated(time, {
    ...eventBase,
    returnValues: {
      ip,
      guardian,
      orbsAddr,
      name: 'name',
      website: 'website',
      isRegistered,
      registrationTime: '19',
    },
  });
}

function GuardianMetadataChanged(s: State, time: number, guardian: string, key: string, value: string) {
  s.applyNewGuardianMetadataChanged(time, {
    ...eventBase,
    returnValues: {
      guardian,
      key,
      newValue: value,
      oldValue: 'unknown',
    },
  });
}

function SubscriptionChanged(s: State, time: number, vcId: string, expiresAt: number) {
  s.applyNewSubscriptionChanged(time, {
    ...eventBase,
    returnValues: {
      name: 'name',
      owner: 'owner',
      vcId,
      genRefTime: '9999',
      expiresAt: expiresAt.toString(),
      tier: 'defaultTier',
      deploymentSubset: 'main',
      rate: '1111',
      isCertified: false,
    },
  });
}

function ProtocolVersionChanged(s: State, time: number, nextVersion: number, fromTimestamp: number) {
  s.applyNewProtocolVersionChanged(time, {
    ...eventBase,
    returnValues: {
      deploymentSubset: 'main',
      currentVersion: 'xxx',
      nextVersion: nextVersion.toString(),
      fromTimestamp: fromTimestamp.toString(),
    },
  });
}

function GuardianStatusUpdated(
  s: State,
  time: number,
  guardian: string,
  readyToSync: boolean,
  readyForCommittee: boolean
) {
  s.applyNewGuardianStatusUpdated(time, {
    ...eventBase,
    returnValues: {
      guardian,
      readyToSync,
      readyForCommittee,
    },
  });
}

function GuardianCertificationUpdate(s: State, time: number, guardian: string, isCertified: boolean) {
  s.applyNewGuardianCertificationUpdate(time, {
    ...eventBase,
    returnValues: {
      guardian,
      isCertified,
    },
  });
}

const eventBase = {
  returnValues: {},
  raw: { data: '', topics: [] },
  event: '',
  signature: '',
  logIndex: 1,
  transactionIndex: 1,
  transactionHash: '',
  blockHash: '',
  blockNumber: 1,
  address: '',
};
