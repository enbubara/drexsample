import { ethers } from "hardhat";

const realDigitalDeploy = async (authority: string, admin: string) => {
  const realDigitalFactory = await ethers.getContractFactory("RealDigital");
  const realDigital = await realDigitalFactory.deploy(
    "RealDigital",
    "BRT",
    authority,
    admin
  );

  console.log("RealDigital deployed to:", await realDigital.getAddress());
  return { realDigital };
};

export default realDigitalDeploy;
