"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFileDirectoryExists = exports.writeFile = exports.verifySignature = exports.normalizeAddress = exports.DailyStats = exports.year = exports.day = exports.getCurrentClockTime = exports.sleep = exports.getIpFromHex = exports.toNumber = exports.timeout = exports.errorString = exports.range = void 0;
const ton_crypto_1 = require("ton-crypto");
const fs_1 = require("fs");
const path_1 = require("path");
const Logger = __importStar(require("./logger"));
// create an array of numbers, from 0 to range
function range(length) {
    return [...Array(length).keys()];
}
exports.range = range;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorString(e) {
    return (e && e.stack) || "" + e;
}
exports.errorString = errorString;
function timeout(ms, promise) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject("Timed out in " + ms + "ms."), ms)),
    ]);
}
exports.timeout = timeout;
function toNumber(val) {
    if (typeof val == "string") {
        return parseInt(val);
    }
    else
        return val;
}
exports.toNumber = toNumber;
function byte(value, byteIdx) {
    const shift = byteIdx * 8;
    return ((value & (0xff << shift)) >> shift) & 0xff;
}
function getIpFromHex(ipStr) {
    const ipBytes = Number(ipStr);
    return (byte(ipBytes, 3) +
        "." +
        byte(ipBytes, 2) +
        "." +
        byte(ipBytes, 1) +
        "." +
        byte(ipBytes, 0));
}
exports.getIpFromHex = getIpFromHex;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
// returns UTC clock time in seconds (similar to unix timestamp / Ethereum block time / RefTime)
function getCurrentClockTime() {
    return Math.round(new Date().getTime() / 1000);
}
exports.getCurrentClockTime = getCurrentClockTime;
exports.day = 24 * 60 * 60;
exports.year = exports.day * 365;
class DailyStats {
    constructor(daysToRemember = 7) {
        this.daysToRemember = daysToRemember;
        this.data = [];
    }
    add(num) {
        const day = this.today();
        if (this.data.length > 0 && this.data[this.data.length - 1].day == day) {
            this.data[this.data.length - 1].count += num;
        }
        else {
            this.data.push({ day, count: num });
        }
        if (this.data.length > this.daysToRemember) {
            this.data.splice(0, this.data.length - this.daysToRemember);
        }
    }
    today() {
        return new Date().toISOString().substr(0, 10);
    }
    getStats() {
        return this.data;
    }
}
exports.DailyStats = DailyStats;
function normalizeAddress(address) {
    if (!address)
        return address;
    if (address.startsWith("0x"))
        return address.substr(2).toLowerCase();
    return address.toLowerCase();
}
exports.normalizeAddress = normalizeAddress;
function verifySignature(objectToVerify, signature, publicKey) {
    console.log(`signature: ${signature}, publicKey=${publicKey}`);
    return (0, ton_crypto_1.signVerify)(Buffer.from(objectToVerify.toString()), Buffer.from(signature), Buffer.from(publicKey));
}
exports.verifySignature = verifySignature;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeFile(filePath, jsonObject) {
    ensureFileDirectoryExists(filePath);
    const content = JSON.stringify(jsonObject, null, 2);
    (0, fs_1.writeFileSync)(filePath, content);
    // log progress
    Logger.log(`Wrote JSON to ${filePath} (${content.length} bytes).`);
}
exports.writeFile = writeFile;
function ensureFileDirectoryExists(filePath) {
    (0, fs_1.mkdirSync)((0, path_1.dirname)(filePath), { recursive: true });
}
exports.ensureFileDirectoryExists = ensureFileDirectoryExists;
