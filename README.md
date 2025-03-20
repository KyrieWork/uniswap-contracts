# Pancake Contracts Deploy

## Deploy CMD

- 部署前配置`.env`;
- 根据顺序部署脚本，但执行前请检查脚本所在配置:`/projects/{project}/ignition/parameters.json`;
- 已部署信息储存于`/projects/v3-core/ignition/deployments/chain-{id}/`;

```shell
yarn workspace {package} hardhat ignition deploy ignition/modules/deploy.ts --network testnet --verify
```