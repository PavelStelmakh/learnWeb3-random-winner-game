const hre = require("hardhat");

const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {

  const randomWinnerGame = await hre.ethers.deployContract(
    "RandomWinnerGame",
    [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]
  );

  await randomWinnerGame.waitForDeployment();

  console.log("Verify Contract Address:", randomWinnerGame.target);
  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  await hre.run("verify:verify", {
    address: randomWinnerGame.target,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}// Verify Contract Address: 0x64a0F3c6086FB09c33a97Ee9600cC17d03220662
// https://mumbai.polygonscan.com/address/0x64a0F3c6086FB09c33a97Ee9600cC17d03220662#code

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
