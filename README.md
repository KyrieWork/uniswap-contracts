# Uniswap Contracts Deploy

## Deploy CMD

```shell
yarn && yarn compile
```

- 部署前配置`.env`;
- 根据顺序部署脚本，但执行前请检查配置:`/parameters/{network}.json`或者`/projects/{project}/ignition/parameters.json`;
- 已部署信息储存于`/projects/v3-core/ignition/deployments/chain-{id}/`;

```shell
yarn workspace weth deploy --network testnet
yarn workspace @uniswap/v3-core deploy --network testnet
yarn workspace @uniswap/v3-periphery deploy --network testnet
yarn workspace tether-token deploy --network testnet
yarn workspace multicall2 deploy --network testnet
```

导出所有地址到 json 文件: `all_deploy_contracts.json`

```shell
chmod +x output_addresses.sh

./output_addresses.sh
```
