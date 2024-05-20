import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, ignition } from "hardhat";
import DeployModules from "../ignition/modules/DeployModules";
import RealTokenizadoModule from "../ignition/modules/RealTokenizadoModule";
import KeyDictionaryModule from "../ignition/modules/KeyDictionaryModule";
import * as dotenv from "dotenv";
dotenv.config();

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

describe("RealTokenizado", () => {
  async function deploy() {
    const [authoritySigner, adminSigner, clienteWalletA, clienteWalletB] =
      await ethers.getSigners();
    const { realDigital, addressDiscovery } = await ignition.deploy(
      DeployModules
    );

    const bankA = await deployRealTokenizado("BancoErion", "12345678901234");
    const bankB = await deployRealTokenizado("BancoWillian", "23345678901234");

    const { keyDictionary } = await ignition.deploy(KeyDictionaryModule);

    return {
      realDigital,
      addressDiscovery,
      bankA,
      bankB,
      keyDictionary,
      clientAAddress: clienteWalletA.address,
      clientBAddress: clienteWalletB.address,
      authoritySigner,
      adminSigner,
    };
  }

  describe("Deployment", () => {

    it("Deploy and verify", async () => {
      const { realDigital, addressDiscovery } = await loadFixture(deploy);
      expect(realDigital).to.not.null;
      expect(addressDiscovery).to.not.null;
      expect(await realDigital.getAddress()).to.not.equal(ethers.ZeroAddress);
    });
  });

  describe("Accounts", () => {

    it("Should deploy RealTokenizado", async () => {
      const { bankA, bankB } = await loadFixture(deploy);
      expect(bankA).to.not.null;
      expect(bankB).to.not.null;
      expect(await bankA.getAddress()).to.not.equal(ethers.ZeroAddress);
      expect(await bankB.getAddress()).to.not.equal(ethers.ZeroAddress);
    });

    it("Should verify accounts", async () => {
      const {
        bankA,
        bankB,
        clientAAddress,
        clientBAddress,
        authoritySigner,
        keyDictionary,
      } = await loadFixture(deploy);

      let enableAccount, verifyAccount;

      enableAccount = await bankA.getFunction("enableAccount");
      await enableAccount(clientAAddress);

      enableAccount = await bankB.getFunction("enableAccount");
      await enableAccount(clientBAddress);

      verifyAccount = await bankA.getFunction("verifyAccount");
      expect(await verifyAccount(clientAAddress)).to.equal(true);

      verifyAccount = await bankB.getFunction("verifyAccount");
      expect(await verifyAccount(clientBAddress)).to.equal(true);
    });

    it("Should add a client wallet for BankA", async () => {
      let addAccount, getKey;
      const { keyDictionary, clientAAddress } = await loadFixture(deploy);

      const clientACPF = "12345678901";
      const keyA = ethers.encodeBytes32String(clientACPF); // Chave do cliente

      const taxIdA = 12345678901; // CPF do cliente
      const bankNumberA = 1; // ID de participante do banco
      const accountA = 1001; // Numero da conta do cliente
      const branchA = 101; // Agencia do cliente no banco

      addAccount = await keyDictionary.getFunction("addAccount");
      await addAccount(
        keyA,
        taxIdA,
        bankNumberA,
        accountA,
        branchA,
        clientAAddress
      );

      getKey = await keyDictionary.getFunction("getKey");

      expect(await getKey(clientAAddress)).to.equal(keyA);
    });

    it("Should add a client wallet for BankB", async () => {
      let addAccount, getKey;
      const { keyDictionary, clientBAddress } = await loadFixture(deploy);

      const clientBCPF = "22345678901";
      const keyB = ethers.encodeBytes32String(clientBCPF); // Chave do cliente

      const taxIdB = 22345678901; // CPF do cliente
      const bankNumberB = 2; // ID de participante do banco
      const accountB = 2001; // Numero da conta do cliente
      const branchB = 202; // Agencia do cliente no banco

      addAccount = await keyDictionary.getFunction("addAccount");
      await addAccount(
        keyB,
        taxIdB,
        bankNumberB,
        accountB,
        branchB,
        clientBAddress
      );

      getKey = await keyDictionary.getFunction("getKey");

      expect(await getKey(clientBAddress)).to.equal(keyB);
    });
  });
});
