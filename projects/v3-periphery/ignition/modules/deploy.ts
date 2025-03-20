import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

export default buildModule("PeripheryModule", (m) => {
  const factory = m.getParameter("UniswapV3Factory");
  const weth = m.getParameter("WETH9");

  // TickLens
  const TickLens = m.contract("TickLens", [], {
    id: "TickLens",
    after: [],
  });

  // Quoter
  const Quoter = m.contract("Quoter", [factory, weth], {
    id: "Quoter",
    after: [],
  });

  // SwapRouter
  const SwapRouter = m.contract("SwapRouter", [factory, weth], {
    id: "SwapRouter",
    after: [],
  });

  // NFTDescriptor
  const NFTDescriptor = m.library("NFTDescriptor");
  // NonfungibleTokenPositionDescriptor
  const NonfungibleTokenPositionDescriptor = m.contract(
    "NonfungibleTokenPositionDescriptor",
    [weth, ethers.encodeBytes32String("BTH")],
    {
      id: "NonfungibleTokenPositionDescriptor",
      after: [],
      libraries: {
        NFTDescriptor: NFTDescriptor,
      },
    }
  );

  // NonfungiblePositionManager
  const NonfungiblePositionManager = m.contract(
    "NonfungiblePositionManager",
    [factory, weth, NonfungibleTokenPositionDescriptor],
    {
      id: "NonfungiblePositionManager",
      after: [NonfungibleTokenPositionDescriptor],
    }
  );

  // V3Migrator
  const V3Migrator = m.contract("V3Migrator", [factory, weth, NonfungiblePositionManager], {
    id: "V3Migrator",
    after: [NonfungiblePositionManager],
  });

  return {
    TickLens,
    Quoter,
    SwapRouter,
    NFTDescriptor,
    NonfungibleTokenPositionDescriptor,
    NonfungiblePositionManager,
    V3Migrator,
  };
});
