import hre, { ethers } from "hardhat";
import { verifyContract } from "../utils";
import Module from "../ignition/modules/deploy";

async function main() {
  const network = await hre.network.name;
  console.log(`Deploying on ${network}...`);

  const parameters = require(`../../../parameters/${network}.json`);
  const {
    Multicall2,
    TickLens,
    Quoter,
    SwapRouter,
    NFTDescriptor,
    NonfungibleTokenPositionDescriptor,
    NonfungiblePositionManager,
    V3Migrator,
  } = await hre.ignition.deploy(Module, {
    parameters: parameters,
  });
  const address_Multicall2 = await Multicall2.getAddress();
  const address_TickLens = await TickLens.getAddress();
  const address_Quoter = await Quoter.getAddress();
  const address_SwapRouter = await SwapRouter.getAddress();
  const address_NFTDescriptor = await NFTDescriptor.getAddress();
  const address_NonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.getAddress();
  const address_NonfungiblePositionManager = await NonfungiblePositionManager.getAddress();
  const address_V3Migrator = await V3Migrator.getAddress();

  console.log(`Multicall2 deployed to: ${address_Multicall2}`);
  console.log(`TickLens deployed to: ${address_TickLens}`);
  console.log(`Quoter deployed to: ${address_Quoter}`);
  console.log(`SwapRouter deployed to: ${address_SwapRouter}`);
  console.log(`NFTDescriptor deployed to: ${address_NFTDescriptor}`);
  console.log(`NonfungibleTokenPositionDescriptor deployed to: ${address_NonfungibleTokenPositionDescriptor}`);
  console.log(`NonfungiblePositionManager deployed to: ${address_NonfungiblePositionManager}`);
  console.log(`V3Migrator deployed to: ${address_V3Migrator}`);

  //verify
  if (network !== "hardhat") {
    await verifyContract(address_Multicall2, []);
    await verifyContract(address_TickLens, []);
    await verifyContract(address_Quoter, [
      parameters.PeripheryModule.UniswapV3Factory,
      parameters.PeripheryModule.WETH9,
    ]);
    await verifyContract(address_SwapRouter, [
      parameters.PeripheryModule.UniswapV3Factory,
      parameters.PeripheryModule.WETH9,
    ]);
    await verifyContract(address_NFTDescriptor, []);
    await verifyContract(address_NonfungibleTokenPositionDescriptor, [
      parameters.PeripheryModule.WETH9,
      ethers.encodeBytes32String("BTH"),
    ]);
    await verifyContract(address_NonfungiblePositionManager, [
      parameters.PeripheryModule.UniswapV3Factory,
      parameters.PeripheryModule.WETH9,
      address_NonfungibleTokenPositionDescriptor,
    ]);
    await verifyContract(address_V3Migrator, [
      parameters.PeripheryModule.UniswapV3Factory,
      parameters.PeripheryModule.WETH9,
      address_NonfungiblePositionManager,
    ]);
  } else {
    console.log("Skipping verification on hardhat network");
  }
}

main().catch(console.error);
