import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");
const SEPOLIA_RPC_URL = vars.get("SEPOLIA_RPC_URL");

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};

export default config;
