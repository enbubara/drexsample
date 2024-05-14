import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, ignition } from "hardhat";
import DeployModules from "../ignition/modules/DeployModules";
import RealTokenizadoModule from "../ignition/modules/RealTokenizadoModule";

const deployRealTokenizado = async (_bank: string, _cnpj: string) => {
  const { realTokenizado } = await ignition.deploy(RealTokenizadoModule, {
    parameters: {
      RealTokenizadoModule: {
        bank: _bank,
        cnpj: _cnpj,
      },
    },
  });
  return realTokenizado;
};


describe("RealTokenizado", function () {
  
  async function deploy() {
    const { realDigital, addressDiscovery } = await ignition.deploy(
      DeployModules
    );

    const bankA = await deployRealTokenizado("BancoErion", "12345678901234");
    const bankB = await deployRealTokenizado("BancoWillian", "23345678901234");

    return { realDigital, addressDiscovery, bankA, bankB};
  }

  describe("Deployment", () => {

    it("Deploy and verify", async () => {
      const { realDigital, addressDiscovery } = await loadFixture(deploy);
      expect(realDigital).to.not.null;
      expect(addressDiscovery).to.not.null;
      expect(await realDigital.getAddress()).to.not.equal(ethers.ZeroAddress);
    });

    it("Should deploy RealTokenizado", async () => {
      const { bankA, bankB } = await loadFixture(deploy);
      expect(bankA).to.not.null;
      expect(bankB).to.not.null;
      expect(await bankA.getAddress()).to.not.equal(ethers.ZeroAddress);
      expect(await bankB.getAddress()).to.not.equal(ethers.ZeroAddress);
    });

  });
});
