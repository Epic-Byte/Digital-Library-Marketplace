const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    //   const chainId = await getChainId();
    console.log(deployer);

    await deploy("Library", {
        from: deployer,
        args: [deployer], // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        log: true,
    });
};

module.exports.tags = ["Library"];
