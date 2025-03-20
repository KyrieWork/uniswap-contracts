import { NetworkUserConfig } from "hardhat/types";
import "dotenv/config";
require('dotenv').config({ path: require('find-config')('.env') })

const testnet: NetworkUserConfig = {
    url: process.env.RPC_TESTNET!,
    chainId: 141491,
    accounts: [process.env.KEY_TESTNET!],
};

const mainnet: NetworkUserConfig = {
    url: process.env.RPC_MAINNET!,
    chainId: 14149,
    accounts: [process.env.KEY_MAINNET!],
};

export const Chains = {
    testnet: testnet,
    mainnet: mainnet,
}

export const Chains_API_Keys = {
    testnet: 'empty'
}
export const Chains_Custom_List = [
    {
        network: "testnet",
        chainId: Chains.testnet.chainId!,
        urls: {
            apiURL: "https://testnet.bthscan.io/api",
            browserURL: "https://testnet.bthscan.io"
        }
    }
]