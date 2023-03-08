import _ from "lodash";
import { StateSnapshot } from "../model/state";
import { DaoMetadata } from "../ton-vote-client";
import { verifySignature } from "../helpers";
import { StateManager } from "../model/manager";

export function renderDaos(snapshot: StateSnapshot) {
  return {
    code: 200,
    body: Object.values(snapshot.Daos),
  };
}

export function renderDao(snapshot: StateSnapshot, daoId: string | null) {
  if (daoId === null) {
    return {
      code: 400,
      body: "daoId should be provided in request",
    };
  }

  if (!(daoId in snapshot.Daos)) {
    return {
      code: 400,
      body: `Dao with daoId ${daoId} was not registered yet`,
    };
  }

  return {
    code: 200,
    body: snapshot.Daos[daoId],
  };
}

export function insertNewDao(
  state: StateManager,
  daoMetadata: DaoMetadata
): { code: number; body: string } {
  if (daoMetadata.adminSignature === null) {
    return {
      code: 400,
      body: "Missing adminSignature",
    };
  }

  let res = verifySignature(
    Object.assign({}, daoMetadata, { adminSignature: undefined }),
    daoMetadata.adminSignature,
    daoMetadata.adminAddress
  );

  // TODO: FIXME
  // if (!res) {
  if (res) {
    return {
      code: 400,
      body: "Bad signature",
    };
  }

  const newDaoId = state.insertDao(daoMetadata);

  return {
    code: 200,
    body: newDaoId,
  };
}

export function updateDao(
  state: StateManager,
  snapshot: StateSnapshot,
  daoMetadata: DaoMetadata
): { code: number; body: string } {
  if (daoMetadata.daoId === null) {
    return {
      code: 400,
      body: "Missing DaoId",
    };
  }

  if (!(daoMetadata.daoId in snapshot.Daos)) {
    return {
      code: 400,
      body: `Dao was not registered yet`,
    };
  }

  let res = verifySignature(
    Object.assign({}, daoMetadata, { adminSignature: undefined }),
    daoMetadata.adminSignature,
    daoMetadata.adminAddress
  );

  if (!res) {
    return {
      code: 400,
      body: "Bad signature",
    };
  }

  if (!state.updateDao(daoMetadata)) {
    return {
      code: 500,
      body: `Failed to update dao ${daoMetadata.daoId}`,
    };
  }

  return {
    code: 200,
    body: "",
  };
}
