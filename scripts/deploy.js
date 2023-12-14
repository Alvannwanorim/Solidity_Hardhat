const { ethers, run, network } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract...");

    const simpleStorage = await SimpleStorageFactory.deploy();
    simpleStorage.deploymentTransaction();
    const address = await simpleStorage.getAddress();
    console.log(address);

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6);
        await verify(address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value: ${currentValue}`);

    const transactionResponse = await simpleStorage.store("7");
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (err) {
        if (err.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(err);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
