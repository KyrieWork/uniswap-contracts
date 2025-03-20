import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ignition-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";
import { Chains, Chains_API_Keys, Chains_Custom_List } from "../../chains";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...Chains,
  },
  solidity: {
    version: "0.4.18",
    settings: {
      optimizer: {
        enabled: false,
        runs: 0,
      },
    },
  },
  etherscan: {
    apiKey: {
      ...Chains_API_Keys,
    },
    customChains: Chains_Custom_List,
  },
  sourcify: {
    enabled: true,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  contractSizer: {
    /// yarn run hardhat size-contracts
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  },
  abiExporter: {
    /// yarn run hardhat export-abi | yarn run hardhat clear-abi
    path: "./data/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    format: "minimal",
  },
};

export default config;
