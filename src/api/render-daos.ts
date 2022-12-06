import _ from 'lodash';
import { StateSnapshot } from '../model/state';
import {DaoMetadata} from "../ton-vote-client";

export function renderDaos(snapshot: StateSnapshot) {
  return Object.values(snapshot.Daos);
}

export function renderDao(snapshot: StateSnapshot, daoId: string) {
  return snapshot.Daos[daoId];
}

export function renderNewDao(snapshot: StateSnapshot, daoMetadata: DaoMetadata) {

	if (daoMetadata.daoId === null) {
		return {
			code: 400,
			body: 'DaoId is null'
		};
	}

	if (daoMetadata.daoId in snapshot.Daos) {
		return {
			code: 403,
			body: 'Dao is already registered'
		};
	}
	snapshot.Daos.daoId = daoMetadata;
	return registerNewDao(daoMetadata);
}

export function updateDao(snapshot: StateSnapshot, daoMetadata: DaoMetadata) {
	
	if (daoMetadata.daoId === null) {
		return {
			code: 400,
			body: 'DaoId is null'
		};
	}
	
	if (!(daoMetadata.daoId in snapshot.Daos)) {
		return {
			code: 403,
			body: 'Dao is not registered'
		};
	}
	snapshot.Daos.daoId = daoMetadata;
	return registerNewDao(daoMetadata);
}

function registerNewDao(daoMetadata: DaoMetadata) {
	throw Error('Not Implemented')
	return {
		code: 200,
		body: ''
	}
}
