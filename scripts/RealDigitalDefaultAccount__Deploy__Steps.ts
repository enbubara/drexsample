import { Signer } from "ethers";
import { ethers } from "hardhat";
import addressDiscoveryUtils from "./AddressDiscoveryUtils";
import { AddressDiscovery } from "../typechain-types";

const realDigitalDefaultAccountDeploy = async (
  addressDiscoveryContract: AddressDiscovery,
  authority: Signer,
  admin: Signer
) => {
  const addressDiscoveryAddress = await addressDiscoveryContract.getAddress();
  const authorityAddress = await authority.getAddress();
  const adminAddress = await admin.getAddress();

  const factory = await ethers.getContractFactory("RealDigitalDefaultAccount");
  const contract = await factory.deploy(
    addressDiscoveryAddress,
    authorityAddress,
    adminAddress
  );
  const contractAddress = await contract.getAddress();

  // Add Contract to AddressDiscovery
  await addressDiscoveryUtils.addToAddressDiscovery(
    addressDiscoveryContract,
    authority,
    "RealDigitalDefaultAccount",
    contractAddress
  );

  console.log(
    "RealDigitalDefaultAccount deployed to:",
    await contract.getAddress()
  );
  return { realDigitalDefaultAccount: contract };
};

export default realDigitalDefaultAccountDeploy;
