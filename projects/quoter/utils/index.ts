import { run } from "hardhat";

interface VerifyArgs {
    address: string;
    constructorArguments: any[];
}

export const verifyContract = async (contractAddress: string, args: any[]): Promise<void> => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        } as VerifyArgs);
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
};