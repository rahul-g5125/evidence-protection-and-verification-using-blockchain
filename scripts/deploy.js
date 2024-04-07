const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const Authenticity = await hre.ethers.getContractFactory("Authenticity");
  const upload = await Upload.deploy();
  const authenticity = await Authenticity.deploy();

  await upload.waitForDeployment();
  await authenticity.waitForDeployment();

  console.log("Library deployed to:", upload.target);
  console.log("Library deployed to:", authenticity.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
