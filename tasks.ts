import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";
import fs from "fs-extra";

interface DeployAndExportTaskArgs {
    modulePaths: string[];
    deploymentId?: string;
    targetDir?: string;
}
// npx hardhat deploy-and-export projects/v3-core/ignition/modules/MyModule.js projects/another-project/ignition/modules/AnotherModule.js --targetDir deployments
task("deploy-and-export", "Deploy modules and export artifacts to a specified directory")
    .addVariadicPositionalParam("modulePaths", "Paths to the Ignition modules")
    .addOptionalParam("deploymentId", "Custom deployment ID")
    .addOptionalParam("targetDir", "Directory to copy artifacts to (default: deployments)", "deployments")
    .setAction(async (taskArgs: DeployAndExportTaskArgs, hre: HardhatRuntimeEnvironment) => {
        const { modulePaths, deploymentId, targetDir } = taskArgs;
        const network = hre.network.name;
        const chainId = hre.network.config.chainId;

        const deployId = deploymentId || `chain-${chainId}`;

        for (const modulePath of modulePaths) {
            await hre.run("ignition deploy", {
                path: modulePath,
                "deployment-id": deployId,
                network,
            });

            const moduleDir = path.join(path.dirname(path.dirname(modulePath)));
            const artifactsDir = path.join(moduleDir, "deployment", deployId, "artifacts");

            const projectDir = path.join(path.dirname(path.dirname(path.dirname(modulePath))));
            const projectName = path.basename(projectDir);

            const projectTargetDir = path.join(targetDir ?? "deployments", projectName);

            if (!(await fs.pathExists(artifactsDir))) {
                throw new Error(`Artifacts directory not found for ${modulePath}: ${artifactsDir}`);
            }

            await fs.copy(artifactsDir, projectTargetDir, { overwrite: true });

            console.log(`Artifacts from ${modulePath} copied to ${projectTargetDir}`);
        }
    });