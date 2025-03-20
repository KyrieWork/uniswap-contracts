import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Multicall2Module", (m) => {
  const Multicall2 = m.contract("Multicall2", [], {
    id: "Multicall2",
    after: [],
  });

  return { Multicall2 };
});
