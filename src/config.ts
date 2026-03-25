import { ethers } from "ethers";

export const CONFIG = {
  // Network
  ARBITRUM_RPC_URL: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",

  // Contract addresses
  LENDING_POOL: "0x794a61358D6845594F94dc1DB02A252b5b4814aD", // Aave V3 on Arbitrum
  UNISWAP_ROUTER: "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 SwapRouter
  CURVE_POOL: "0x...", // Curve pool address

  // Tokens
  USDC: "0xFF970A61A04b1cA14834A43f5de4533eBDDB5CC8",
  USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",

  // Bot settings
  OPPORTUNITY_CHECK_INTERVAL: 3000, // 3 seconds
  MIN_PROFIT_THRESHOLD: ethers.parseUnits("0.1", 6), // 0.1 USDC
  MAX_SLIPPAGE: 50, // 0.5%
  GAS_LIMIT: 500000,
};

export type Config = typeof CONFIG;