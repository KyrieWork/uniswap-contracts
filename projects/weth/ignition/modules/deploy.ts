import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("WETH9Module", (m) => {
  const WETH9 = m.contract("WETH9", [], {
    id: "WETH9",
    after: []
  })

  return { WETH9 };
});