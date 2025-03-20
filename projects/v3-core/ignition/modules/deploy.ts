import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("V3CoreModule", (m) => {
  const factory = m.contract("UniswapV3Factory", [], {
    id: "UniswapV3Factory",
    after: [],
  });

  return { factory };
});
