import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PancakeV3CoreModule", (m) => {
  // PancakeV3PoolDeployer
  const poolDeployer = m.contract("PancakeV3PoolDeployer", [], {
    id: "PancakeV3PoolDeployer",
    after: []
  })

  // PancakeV3Factory
  const factory = m.contract("PancakeV3Factory", [poolDeployer], {
    id: "PancakeV3Factory",
    after: [poolDeployer]
  })

  return { poolDeployer, factory };
});