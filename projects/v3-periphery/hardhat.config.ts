import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ignition-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";
import { Chains, Chains_API_Keys, Chains_Custom_List } from "../../chains";

const LOW_OPTIMIZER_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 2_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
};

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
};

const DEFAULT_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
};

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...Chains,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      "contracts/NonfungiblePositionManager.sol": LOW_OPTIMIZER_COMPILER_SETTINGS,
      "contracts/test/MockTimeNonfungiblePositionManager.sol": LOW_OPTIMIZER_COMPILER_SETTINGS,
      "contracts/test/NFTDescriptorTest.sol": LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      "contracts/NonfungibleTokenPositionDescriptor.sol": LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      "contracts/libraries/NFTDescriptor.sol": LOWEST_OPTIMIZER_COMPILER_SETTINGS,
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
