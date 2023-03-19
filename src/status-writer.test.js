"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const mock_fs_1 = __importDefault(require("mock-fs"));
const config_example_1 = require("./config.example");
const manager_1 = require("./model/manager");
const status_writer_1 = require("./status-writer");
const fs_1 = require("fs");
ava_1.default.serial.afterEach.always(() => {
    mock_fs_1.default.restore();
});
ava_1.default.serial("updates and writes Timestamp", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const state = new manager_1.StateManager(config_example_1.exampleConfig);
    const stats = [];
    (0, mock_fs_1.default)({ ["./status/status.json"]: "" });
    const statusWriter = new status_writer_1.StatusWriter(state, config_example_1.exampleConfig);
    yield statusWriter.run(stats);
    const writtenContents = JSON.parse((0, fs_1.readFileSync)("./status/status.json").toString());
    t.log("result:", JSON.stringify(writtenContents, null, 2));
    t.assert(new Date().getTime() - new Date(writtenContents.Timestamp).getTime() < 1000);
}));
