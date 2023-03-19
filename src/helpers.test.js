"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/unbound-method */
const ava_1 = __importDefault(require("ava"));
const helpers_1 = require("./helpers");
(0, ava_1.default)("getIpFromHex works", (t) => {
    t.is((0, helpers_1.getIpFromHex)("0x01010101"), "1.1.1.1");
    t.is((0, helpers_1.getIpFromHex)("0x01020304"), "1.2.3.4");
    t.is((0, helpers_1.getIpFromHex)("0xffffffff"), "255.255.255.255");
});
(0, ava_1.default)("DailyStats works", (t) => {
    const d = new helpers_1.DailyStats(2);
    t.deepEqual(d.getStats(), []);
    d.today = () => "2020-01-01";
    d.add(1);
    t.deepEqual(d.getStats(), [{ day: "2020-01-01", count: 1 }]);
    d.add(2);
    t.deepEqual(d.getStats(), [{ day: "2020-01-01", count: 3 }]);
    d.today = () => "2020-01-02";
    d.add(4);
    t.deepEqual(d.getStats(), [
        { day: "2020-01-01", count: 3 },
        { day: "2020-01-02", count: 4 },
    ]);
    d.add(5);
    t.deepEqual(d.getStats(), [
        { day: "2020-01-01", count: 3 },
        { day: "2020-01-02", count: 9 },
    ]);
    d.today = () => "2020-01-03";
    d.add(6);
    t.deepEqual(d.getStats(), [
        { day: "2020-01-02", count: 9 },
        { day: "2020-01-03", count: 6 },
    ]);
    d.add(1);
    t.deepEqual(d.getStats(), [
        { day: "2020-01-02", count: 9 },
        { day: "2020-01-03", count: 7 },
    ]);
});
