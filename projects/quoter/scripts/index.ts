import hre from "hardhat";
import parameters from "../../../parameters.json";
import { verifyContract } from "../utils";
import Module from "../ignition/modules/deploy";

async function main() {
  const network = await hre.network.name;
  console.log(`Deploying on ${network}...`);
  const { Quoter } = await hre.ignition.deploy(Module, {
    parameters: parameters,
  });
  const address = await Quoter.getAddress();

  console.log(`Quoter deployed to: ${address}`);

  //verify
  await verifyContract(address, [
    parameters.QuoterModule.UniswapV3Factory,
    parameters.QuoterModule.WETH9,
  ]);
}

main().catch(console.error);
