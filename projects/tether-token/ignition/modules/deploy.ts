import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("USDTModule", (m) => {
  const initialSupply = m.getParameter("initialSupply");
  const name = m.getParameter("name");
  const symbol = m.getParameter("symbol");
  const decimals = m.getParameter("decimals");

  const USDT = m.contract("TetherToken", [initialSupply, name, symbol, decimals], {
    id: "TetherToken",
    after: [],
  });

  return { USDT };
});
