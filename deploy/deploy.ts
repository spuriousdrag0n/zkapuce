import fs from 'fs'
import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const PRIV_KEY = fs.readFileSync(".secret").toString().trim();

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the ZkPuce contracts`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIV_KEY);

  // Create deployer object and load the artifacts of the contracts you want to deploy.
  const deployer = new Deployer(hre, wallet);
  
  const ZkPuceERC20Artifact = await deployer.loadArtifact("ZkPuceERC20");
  const ZkPuceFactoryArtifact = await deployer.loadArtifact("ZkPuceFactory");
  const ZkPucePairArtifact = await deployer.loadArtifact("ZkPucePair");

  // Estimate contract deployment fee
  // Note: Add the appropriate constructor parameters in the arrays below if any
  const ZkPuceERC20DeploymentFee = await deployer.estimateDeployFee(ZkPuceERC20Artifact, []);
  const ZkPuceFactoryDeploymentFee = await deployer.estimateDeployFee(ZkPuceFactoryArtifact, []);
  const ZkPucePairDeploymentFee = await deployer.estimateDeployFee(ZkPucePairArtifact, []);

  // OPTIONAL: Deposit funds to L2
  const totalDeploymentFee = ZkPuceERC20DeploymentFee.add(ZkPuceFactoryDeploymentFee).add(ZkPucePairDeploymentFee);
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: totalDeploymentFee.mul(2),
  });

  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  const ZkPuceERC20Contract = await deployer.deploy(ZkPuceERC20Artifact, []);
  console.log(`ZkPuceERC20 was deployed to ${ZkPuceERC20Contract.address}`);
  
  const ZkPuceFactoryContract = await deployer.deploy(ZkPuceFactoryArtifact, []);
  console.log(`ZkPuceFactory was deployed to ${ZkPuceFactoryContract.address}`);

  const ZkPucePairContract = await deployer.deploy(ZkPucePairArtifact, []);
  console.log(`ZkPucePair was deployed to ${ZkPucePairContract.address}`);
}
