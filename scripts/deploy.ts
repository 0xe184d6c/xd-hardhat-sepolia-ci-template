import { ethers, run } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("Example");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  
  console.log("Deployed at:", await contract.getAddress());

  // Verify contract if API key exists
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying...");
    await run("verify:verify", {
      address: await contract.getAddress(),
      constructorArguments: [],
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});