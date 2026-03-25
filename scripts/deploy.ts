// @ts-ignore - Hardhat ethers is available globally
declare const ethers: any;

import { logger } from "../src/logger.js";

async function main() {
  logger.info("Deploying FlashLoanArbitrageur contract...");

  const [deployer] = await ethers.getSigners();
  logger.info(`Deploying with account: ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  logger.info(`Account balance: ${ethers.formatEther(balance)} ETH`);

  const FlashLoanArbitrageur = await ethers.getContractFactory("FlashLoanArbitrageur");

  // Contract constructor parameters
  const lendingPool = "0x794a61358D6845594F94dc1DB02A252b5b4814aD"; // Aave V3
  const uniswapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3
  const curvePool = "0x..."; // TODO: Add actual Curve pool address
  const usdc = "0xFF970A61A04b1cA14834A43f5de4533eBDDB5CC8";
  const usdt = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

  const contract = await FlashLoanArbitrageur.deploy(
    lendingPool,
    uniswapRouter,
    curvePool,
    usdc,
    usdt
  );

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  logger.info(`Contract deployed to: ${contractAddress}`);

  // Save to .env file
  const fs = require("fs");
  const envPath = ".env";
  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }
  if (!envContent.includes("CONTRACT_ADDRESS=")) {
    envContent += `\nCONTRACT_ADDRESS=${contractAddress}`;
    fs.writeFileSync(envPath, envContent);
    logger.info("Contract address saved to .env file");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });