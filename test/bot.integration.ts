import { expect } from "chai";
import { ethers } from "hardhat";

describe("FlashLoanArbitrageur", function () {
  let contract: any;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const FlashLoanArbitrageur = await ethers.getContractFactory("FlashLoanArbitrageur");
    contract = await FlashLoanArbitrageur.deploy(
      "0x794a61358D6845594F94dc1DB02A252b5b4814aD", // Aave
      "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap
      "0x0000000000000000000000000000000000000000", // Curve (placeholder)
      "0xFF970A61A04b1cA14834A43f5de4533eBDDB5CC8", // USDC
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"  // USDT
    );
    await contract.waitForDeployment();
  });

  it("Should deploy successfully", async function () {
    expect(await contract.getAddress()).to.be.properAddress;
  });

  it("Should set the owner correctly", async function () {
    expect(await contract.owner()).to.equal(owner.address);
  });
});