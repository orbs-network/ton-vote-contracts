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
exports.TaskLoop = void 0;
const Logger = __importStar(require("./logger"));
const helpers_1 = require("./helpers");
class TaskLoop {
    constructor(task, pause) {
        this.task = task;
        this.pause = pause;
        this.started = false;
        this.runTask = () => {
            this.task().then(() => {
                if (this.started) {
                    this.handle = setTimeout(this.runTask, this.pause);
                }
            }, (err) => {
                Logger.error(`Error in runTask: ${(0, helpers_1.errorString)(err)}.`);
                if (this.started) {
                    this.handle = setTimeout(this.runTask, this.pause);
                }
            });
        };
        this.start = () => {
            if (!this.started) {
                this.started = true;
                this.handle = setTimeout(this.runTask, 0);
            }
        };
        this.stop = () => {
            this.started = false;
            if (this.handle !== undefined) {
                clearTimeout(this.handle);
            }
        };
    }
}
exports.TaskLoop = TaskLoop;
