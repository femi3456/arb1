import { ethers } from "ethers";
import { CONFIG } from "./config";
import { logger } from "./logger";

let _provider: ethers.JsonRpcProvider;
let _wallet: ethers.Wallet;

export function getProvider(): ethers.JsonRpcProvider {
  if (!_provider) {
    _provider = new ethers.JsonRpcProvider(CONFIG.ARBITRUM_RPC_URL);
    logger.info("Provider initialized");
  }
  return _provider;
}

export function getWallet(): ethers.Wallet {
  if (!_wallet) {
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY environment variable not set");
    }
    _wallet = new ethers.Wallet(process.env.PRIVATE_KEY, getProvider());
    logger.info(`Wallet initialized: ${getWallet().address}`);
  }
  return _wallet;
}

export const provider = getProvider();