import { ethers } from "hardhat";
import addressDiscoveryUtils from "./AddressDiscoveryUtils";

import addressDiscoveryDeploy from "./AddressDiscovery__Deploy__Step";
import realDigitalDeploy from "./RealDigital__Deploy__Step";
import swapOneStepDeploy from "./SwapOneStep__Deploy__Step";
import swapTwoStepsDeploy from "./SwapTwoSteps__Deploy__Step";
import realDigitalDefaultAccountDeploy from "./RealDigitalDefaultAccount__Deploy__Steps";
import realDigitalEnableAccountDeploy from "./RealDigitalEnableAccount__Deploy__Step";

async function main() {
  const bootNodePrivateKey =
    //"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // carteira-3 qbtConfigFile.json
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // hardhat-0
  const adminPrivateKey =
    //"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // carteira-2 qbtConfigFile.json
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // carteira-2 qbtConfigFile.json

  const provider = ethers.provider;
  const bootNodeWallet = new ethers.Wallet(bootNodePrivateKey, provider);
  const adminWallet = new ethers.Wallet(adminPrivateKey, provider);
  const authority = bootNodeWallet.address;
  const admin = adminWallet.address;


  // Deploy AddressDiscovery
  const { addressDiscovery } = await addressDiscoveryDeploy(authority, admin);

  // Deploy RealDigital
  const { realDigital } = await realDigitalDeploy(authority, admin);
  const realDigitalAddress = await realDigital.getAddress();

  // Add RealDigital to AddressDiscovery
  await addressDiscoveryUtils.addToAddressDiscovery(
    addressDiscovery,
    bootNodeWallet,
    "RealDigital",
    realDigitalAddress
  );

  // Deploy SwapOneStep
  const { swapOneStep } = await swapOneStepDeploy(
    addressDiscovery,
    bootNodeWallet,
    realDigitalAddress
  );

  // Deploy SwapTwoSteps
  const { swapTwoSteps } = await swapTwoStepsDeploy(
    addressDiscovery,
    realDigital,
    bootNodeWallet
  );

  const { realDigitalDefaultAccount } = await realDigitalDefaultAccountDeploy(
    addressDiscovery,
    bootNodeWallet,
    adminWallet
  );

  const { realDigitalEnableAccount } = await realDigitalEnableAccountDeploy(
    addressDiscovery,
    bootNodeWallet,
    realDigitalAddress
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
