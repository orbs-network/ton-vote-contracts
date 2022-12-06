import _ from 'lodash';
import { StateSnapshot } from '../model/state';

export function renderStrategies(snapshot: StateSnapshot) {
  return Object.values(snapshot.Strategies);
}
