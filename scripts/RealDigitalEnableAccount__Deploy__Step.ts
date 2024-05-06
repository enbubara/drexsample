import { Signer } from "ethers";
import { ethers } from "hardhat";
import addressDiscoveryUtils from "./AddressDiscoveryUtils";
import { AddressDiscovery } from "../typechain-types";

const realDigitalEnableAccountDeploy = async (
  addressDiscoveryContract: AddressDiscovery,
  authority: Signer,
  realDigitalAddress: string
) => {
  const factory = await ethers.getContractFactory("RealDigitalEnableAccount");
  const contract = await factory.deploy(realDigitalAddress);
  const contractAddress = await contract.getAddress();

  // Add Contract to AddressDiscovery
  await addressDiscoveryUtils.addToAddressDiscovery(
    addressDiscoveryContract,
    authority,
    "RealDigitalEnableAccount",
    contractAddress
  );

  console.log(
    "RealDigitalEnableAccount deployed to:",
    await contract.getAddress()
  );
  return { realDigitalEnableAccount: contract };
};

export default realDigitalEnableAccountDeploy;
