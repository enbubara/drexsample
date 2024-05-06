import { ethers } from "hardhat";
import { AddressDiscovery } from "../typechain-types";
import { Signer } from "ethers";

const __getAddressDiscoveryContractName = (humanReadableName: string) => {
  if (humanReadableName.startsWith("RealTokenizado@")) {
    const split = humanReadableName.split("@");
    return ethers.keccak256(
      ethers.solidityPacked(
        ["string", "uint256"],
        ["RealTokenizado@", split[1]]
      )
    );
  }

  return ethers.keccak256(ethers.toUtf8Bytes(humanReadableName));
};

const __addToAddressDiscovery = async (
  addressDiscovery: AddressDiscovery,
  from: Signer,
  receiverName: string,
  receiverAddress: string
) => {
  await addressDiscovery
    // .connect(from)
    .updateAddress(
      __getAddressDiscoveryContractName(receiverName),
      receiverAddress, {from}
    );

  console.log("Added", receiverName, "to AddressDiscovery");
};

const addressDiscoveryUtils = {
  addToAddressDiscovery: __addToAddressDiscovery,
  getEncryptedContractName: __getAddressDiscoveryContractName,
};

export default addressDiscoveryUtils;
