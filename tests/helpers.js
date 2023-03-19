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
exports.getTransactions = exports.compileFuncToB64 = exports.initDeployKey = exports.initWallet = exports.sleep = exports.waitForSeqno = exports.waitForContractToBeDeployed = void 0;
const ton_1 = require("ton");
const ton_crypto_1 = require("ton-crypto");
const ton_2 = require("ton");
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
function waitForContractToBeDeployed(client, deployedContract) {
    return __awaiter(this, void 0, void 0, function* () {
        const seqnoStepInterval = 2500;
        let retval = false;
        console.log(`⏳ waiting for contract to be deployed at [${deployedContract.toFriendly()}]`);
        for (var attempt = 0; attempt < 10; attempt++) {
            yield sleep(seqnoStepInterval);
            if (yield client.isContractDeployed(deployedContract)) {
                retval = true;
                break;
            }
        }
        console.log(`⌛️ waited for contract deployment ${((attempt + 1) * seqnoStepInterval) / 1000}s`);
        return retval;
    });
}
exports.waitForContractToBeDeployed = waitForContractToBeDeployed;
function waitForSeqno(walletContract, seqno) {
    return __awaiter(this, void 0, void 0, function* () {
        const seqnoStepInterval = 3000;
        console.log(`⏳ waiting for seqno to update (${seqno})`);
        for (var attempt = 0; attempt < 10; attempt++) {
            yield sleep(seqnoStepInterval);
            const seqnoAfter = yield walletContract.getSeqNo();
            if (seqnoAfter > seqno)
                break;
        }
        console.log(`⌛️ seqno update after ${((attempt + 1) * seqnoStepInterval) / 1000}s`);
    });
}
exports.waitForSeqno = waitForSeqno;
function sleep(time) {
    return new Promise((resolve) => {
        console.log(`💤 ${time / 1000}s ...`);
        setTimeout(resolve, time);
    });
}
exports.sleep = sleep;
function initWallet(client, publicKey, workchain = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = ton_1.WalletContract.create(client, ton_2.WalletV3R2Source.create({ publicKey: publicKey, workchain }));
        const walletBalance = yield client.getBalance(wallet.address);
        if (parseFloat((0, ton_2.fromNano)(walletBalance)) < 0.5) {
            throw `Insufficient Deployer [${wallet.address.toFriendly()}] funds ${(0, ton_2.fromNano)(walletBalance)}`;
        }
        console.log(`Init wallet ${wallet.address.toFriendly()} | balance: ${(0, ton_2.fromNano)(yield client.getBalance(wallet.address))} | seqno: ${yield wallet.getSeqNo()}`);
        return wallet;
    });
}
exports.initWallet = initWallet;
function initDeployKey(index = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const deployConfigJson = `./build/deploy.config.json`;
        const deployerWalletType = "org.ton.wallets.v3.r2";
        let deployerMnemonic;
        if (!fs_1.default.existsSync(deployConfigJson)) {
            console.log(`\n* Config file '${deployConfigJson}' not found, creating a new wallet for deploy..`);
            deployerMnemonic = (yield (0, ton_crypto_1.mnemonicNew)(24)).join(" ");
            const deployWalletJsonContent = {
                created: new Date().toISOString(),
                deployerWalletType,
                deployerMnemonic,
            };
            fs_1.default.writeFileSync(deployConfigJson, JSON.stringify(deployWalletJsonContent, null, 2));
            console.log(` - Created new wallet in '${deployConfigJson}' - keep this file secret!`);
        }
        else {
            console.log(`\n* Config file '${deployConfigJson}' found and will be used for deployment!`);
            const deployConfigJsonContentRaw = fs_1.default.readFileSync(deployConfigJson, "utf-8");
            const deployConfigJsonContent = JSON.parse(deployConfigJsonContentRaw);
            if (!deployConfigJsonContent.deployerMnemonic) {
                console.log(` - ERROR: '${deployConfigJson}' does not have the key 'deployerMnemonic'`);
                process.exit(1);
            }
            deployerMnemonic = deployConfigJsonContent.deployerMnemonic;
        }
        return (0, ton_crypto_1.mnemonicToWalletKey)(deployerMnemonic.split(" "), index);
    });
}
exports.initDeployKey = initDeployKey;
function compileFuncToB64(funcFiles) {
    const funcPath = process.env.FUNC_PATH || "/usr/local/bin/func";
    try {
        (0, child_process_1.execSync)(`${funcPath} -o build/tmp.fif  -SPA ${funcFiles.join(" ")}`);
    }
    catch (e) {
        if (e.message.indexOf("error: `#include` is not a type identifier") > -1) {
            console.log(`
============================================================================================================
Please update your func compiler to support the latest func features
to set custom path to your func compiler please set  the env variable "export FUNC_PATH=/usr/local/bin/func"
============================================================================================================
`);
            process.exit(1);
        }
        else {
            console.log(e.message);
        }
    }
    const stdOut = (0, child_process_1.execSync)(`/usr/local/bin/fift -s build/_print-hex.fif`).toString();
    return stdOut.trim();
}
exports.compileFuncToB64 = compileFuncToB64;
function getTransactions(client, toLt) {
    return __awaiter(this, void 0, void 0, function* () {
        let maxLt = new BigNumber(toLt !== null && toLt !== void 0 ? toLt : -1);
        let startPage = { fromLt: "0", hash: "" };
        let allTxns = [];
        let paging = startPage;
        while (true) {
            console.log("Querying...");
            const txns = yield client.getTransactions(CONTRACT_ADDRESS, {
                lt: paging.fromLt,
                to_lt: toLt,
                hash: paging.hash,
                limit: 500,
            });
            Logger(`Got ${txns.length}, lt ${paging.fromLt}`);
            if (txns.length === 0)
                break;
            allTxns = [...allTxns, ...txns];
            paging.fromLt = txns[txns.length - 1].id.lt;
            paging.hash = txns[txns.length - 1].id.hash;
            txns.forEach((t) => {
                t.inMessage.source = t.inMessage.source.toFriendly();
                maxLt = BigNumber.max(new BigNumber(t.id.lt), maxLt);
            });
        }
        return { allTxns, maxLt: maxLt.toString() };
    });
}
exports.getTransactions = getTransactions;
