import { ethers, run } from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

async function main() {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const lockedAmount = ethers.parseEther("0.001");
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  await lock.waitForDeployment();

  console.log(`Lock deployed to: ${await lock.getAddress()}`);
  console.log(`Unlock timestamp: ${unlockTime}`);

  // Verification
  if (process.env.ETHERSCAN_API_KEY) {
    await run("verify:verify", {
      address: await lock.getAddress(),
      constructorArguments: [unlockTime],
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});