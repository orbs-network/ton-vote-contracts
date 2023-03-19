"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = void 0;
function format(msg) {
    return `${new Date().toISOString()} ${msg}`;
}
function log(msg) {
    console.log(format(msg));
}
exports.log = log;
function error(msg) {
    console.error("[ERROR]", format(msg));
}
exports.error = error;
