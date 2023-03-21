import {
  Address,
  Cell,
  OpenedContract
} from "ton";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { TonClient, WalletContractV3R2, fromNano } from "ton";
import fs from "fs";
import {execSync} from "child_process";
import BN from "bn.js";


export async function waitForContractToBeDeployed(client: TonClient, deployedContract: Address) {
  const seqnoStepInterval = 2500;
  let retval = false;
  console.log(`⏳ waiting for contract to be deployed at [${deployedContract.toString()}]`);
  for (var attempt = 0; attempt < 10; attempt++) {
    await sleep(seqnoStepInterval);
    if (await client.isContractDeployed(deployedContract)) {
      retval = true;
      break;
    }
  }
  console.log(`⌛️ waited for contract deployment ${((attempt + 1) * seqnoStepInterval) / 1000}s`);
  return retval;
}

// export async function waitForSeqno(walletContract: OpenedContract, seqno: number) {
//   const seqnoStepInterval = 3000;
//   console.log(`⏳ waiting for seqno to update (${seqno})`);
//   for (var attempt = 0; attempt < 10; attempt++) {
//     await sleep(seqnoStepInterval);
//     const seqnoAfter = await walletContract.getSeqno();
//     if (seqnoAfter > seqno) break;
//   }
//   console.log(`⌛️ seqno update after ${((attempt + 1) * seqnoStepInterval) / 1000}s`);
// }

export function sleep(time: number) {
  return new Promise((resolve) => {
    console.log(`💤 ${time / 1000}s ...`);

    setTimeout(resolve, time);
  });
}

export async function initWallet(client: TonClient, publicKey: Buffer, workchain = 0): Promise<OpenedContract<WalletContractV3R2>> {
  const wallet = client.open(WalletContractV3R2.create({ publicKey: publicKey, workchain }));

  if (!await client.isContractDeployed(wallet.address)) {
    throw ("wallet is not deployed");
  }

  const walletBalance = await wallet.getBalance();
    
  if (parseFloat(fromNano(walletBalance)) < 0.5) {
    throw `Insufficient Deployer [${wallet.address.toString()}] funds ${fromNano(walletBalance)}`;
  }

  console.log(
    `Init wallet ${wallet.address.toString()} | balance: ${fromNano(await wallet.getBalance())} | seqno: ${await wallet.getSeqno()}`
  );

  return wallet;
}

export async function initDeployKey(index = '') {
	const deployConfigJson = `./build/deploy.config.json`;
	const deployerWalletType = "org.ton.wallets.v3.r2";
	let deployerMnemonic;
	if (!fs.existsSync(deployConfigJson)) {
		console.log(`\n* Config file '${deployConfigJson}' not found, creating a new wallet for deploy..`);
		deployerMnemonic = (await mnemonicNew(24)).join(" ");
		const deployWalletJsonContent = {
		  created: new Date().toISOString(),
		  deployerWalletType,
		  deployerMnemonic,
	};
	fs.writeFileSync(deployConfigJson, JSON.stringify(deployWalletJsonContent, null, 2));
		console.log(` - Created new wallet in '${deployConfigJson}' - keep this file secret!`);
	} else {
		console.log(`\n* Config file '${deployConfigJson}' found and will be used for deployment!`);
		const deployConfigJsonContentRaw = fs.readFileSync(deployConfigJson, "utf-8");
		const deployConfigJsonContent = JSON.parse(deployConfigJsonContentRaw);
		if (!deployConfigJsonContent.deployerMnemonic) {
		  console.log(` - ERROR: '${deployConfigJson}' does not have the key 'deployerMnemonic'`);
		  process.exit(1);
		}
		deployerMnemonic = deployConfigJsonContent.deployerMnemonic;
	}
	return mnemonicToWalletKey(deployerMnemonic.split(" "), index);
}

export function compileFuncToB64(funcFiles: string[]): string {
    const funcPath = process.env.FUNC_PATH || "/usr/local/bin/func";
    try {
        execSync(`${funcPath} -o build/tmp.fif  -SPA ${funcFiles.join(" ")}`);
    } catch (e: any) {
        if (e.message.indexOf("error: `#include` is not a type identifier") > -1) {
            console.log(`
============================================================================================================
Please update your func compiler to support the latest func features
to set custom path to your func compiler please set  the env variable "export FUNC_PATH=/usr/local/bin/func"
============================================================================================================
`);
            process.exit(1);
        } else {
            console.log(e.message);
        }
    }

    const stdOut = execSync(`/usr/local/bin/fift -s build/_print-hex.fif`).toString();
    return stdOut.trim();
}

export function prepareParams(params: any[] = []) {
  return params.map((p) => {
    if (p instanceof Cell) {
      return ["tvm.Slice", p.toBoc({ idx: false }).toString("base64")];
    } else if (p instanceof BN) {
      return ["num", p.toString(10)];
    } else if (typeof p === "number") {
      return ["num", p];
    }
    console.log(typeof p);
    
    throw new Error("unknown type!");
  });
}

export function min(num1: bigint, num2: bigint) {
  return num1 < num2 ? num1 : num2;
}

export async function waitForConditionChange<T>(func: (...args: any[]) => Promise<T>, args: any[], startVal: any, sleepIntervalMilli: number = 3000, maxNumIntervals: number = 5): Promise<boolean> {

  let res;
  let count = 0;

  do {            
    sleep(sleepIntervalMilli);
    res = await func(...args);
    count++;

  } while ((startVal  == res) && count < maxNumIntervals);

  if (startVal  == res) {
    return false;
  }

  return true;

}