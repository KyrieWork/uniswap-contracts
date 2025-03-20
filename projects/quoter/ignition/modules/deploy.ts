import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("QuoterModule", (m) => {
  const factory = m.getParameter("UniswapV3Factory");
  const weth = m.getParameter("WETH9");
  const Quoter = m.contract("Quoter", [factory, weth], {
    id: "Quoter",
    after: [],
  });

  return { Quoter };
});
