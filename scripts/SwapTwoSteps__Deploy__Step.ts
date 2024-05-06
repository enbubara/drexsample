import { Signer } from "ethers";
import { ethers } from "hardhat";
import addressDiscoveryUtils from "./AddressDiscoveryUtils";
import { AddressDiscovery, RealDigital } from "../typechain-types";

const swapTwoStepsDeploy = async (
  addressDiscoveryContract: AddressDiscovery,
  realDigitalContract: RealDigital,
  authority: Signer
) => {
  const realDigitalAddress = await realDigitalContract.getAddress();
  const factory = await ethers.getContractFactory("SwapTwoSteps");
  const contract = await factory.deploy(realDigitalAddress);
  const contractAddress = await contract.getAddress();

  // Add RealDigital to AddressDiscovery
  await addressDiscoveryUtils.addToAddressDiscovery(
    addressDiscoveryContract,
    authority,
    "SwapTwoSteps",
    contractAddress
  );

  console.log("SwapTwoSteps deployed to:", contractAddress);
  return { swapTwoSteps: contract };
};

export default swapTwoStepsDeploy;
