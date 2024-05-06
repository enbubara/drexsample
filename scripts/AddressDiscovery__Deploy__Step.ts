import { ethers } from "hardhat";

const addressDiscoveryDeploy = async (authority: string, admin: string) => {
  const AddressDiscovery = await ethers.getContractFactory("AddressDiscovery");
  const addressDiscovery = await AddressDiscovery.deploy(authority, admin, {
    from: authority,
  });

  console.log(
    "AddressDiscovery deployed to:",
    await addressDiscovery.getAddress()
  );

  return { addressDiscovery };
};

export default addressDiscoveryDeploy;
