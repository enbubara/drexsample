import { Signer } from "ethers";
import { ethers } from "hardhat";
import addressDiscoveryUtils from "./AddressDiscoveryUtils";
import { AddressDiscovery } from "../typechain-types";

const swapOneStepDeploy = async (
  addressDiscoveryContract: AddressDiscovery,
  authority: Signer,
  realDigitalAddress: string
) => {
  const factory = await ethers.getContractFactory("SwapOneStep");
  const contract = await factory.deploy(realDigitalAddress);
  const contractAddress = await contract.getAddress();

  // Add RealDigital to AddressDiscovery
  await addressDiscoveryUtils.addToAddressDiscovery(
    addressDiscoveryContract,
    authority,
    "SwapOneStep",
    contractAddress
  );

  console.log("SwapOneStep deployed to:",contractAddress);
  return { swapOneStep: contract };
};

export default swapOneStepDeploy;