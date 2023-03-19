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
const task_loop_1 = require("./task-loop");
const helpers_1 = require("./helpers");
(0, ava_1.default)("TaskLoop runs the task when started and stops when stopped", (t) => __awaiter(void 0, void 0, void 0, function* () {
    let counter = 0;
    const runFunc = () => __awaiter(void 0, void 0, void 0, function* () {
        counter++;
        yield (0, helpers_1.sleep)(0); // for lint
    });
    const task = new task_loop_1.TaskLoop(() => runFunc(), 1);
    task.start();
    yield (0, helpers_1.sleep)(50);
    t.assert(counter > 1);
    task.stop();
    yield (0, helpers_1.sleep)(50);
    const counterOnStop = counter;
    yield (0, helpers_1.sleep)(50);
    t.is(counter, counterOnStop);
}));
(0, ava_1.default)("TaskLoop recovers from exceptions thrown in task", (t) => __awaiter(void 0, void 0, void 0, function* () {
    let counter = 0;
    const throwingFunc = () => __awaiter(void 0, void 0, void 0, function* () {
        counter++;
        yield (0, helpers_1.sleep)(0); // for lint
        throw new Error("oh no!");
    });
    const task = new task_loop_1.TaskLoop(() => throwingFunc(), 1);
    task.start();
    yield (0, helpers_1.sleep)(50);
    t.assert(counter > 1);
}));
