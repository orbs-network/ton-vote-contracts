"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDao = exports.insertNewDao = exports.renderDao = exports.renderDaos = void 0;
const helpers_1 = require("../helpers");
function renderDaos(snapshot) {
    return {
        code: 200,
        body: Object.values(snapshot.Daos),
    };
}
exports.renderDaos = renderDaos;
function renderDao(snapshot, daoId) {
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
exports.renderDao = renderDao;
function insertNewDao(state, daoMetadata) {
    if (daoMetadata.adminSignature === null) {
        return {
            code: 400,
            body: "Missing adminSignature",
        };
    }
    let res = (0, helpers_1.verifySignature)(Object.assign({}, daoMetadata, { adminSignature: undefined }), daoMetadata.adminSignature, daoMetadata.adminAddress);
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
exports.insertNewDao = insertNewDao;
function updateDao(state, snapshot, daoMetadata) {
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
    let res = (0, helpers_1.verifySignature)(Object.assign({}, daoMetadata, { adminSignature: undefined }), daoMetadata.adminSignature, daoMetadata.adminAddress);
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
exports.updateDao = updateDao;
