import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../scripts/AddressDiscoveryUtils";

export default buildModule("RealDigitalEnableAccountModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);

  const realDigital = m.contract("RealDigital", [
    "Real Digital",
    "BRL",
    authority,
    admin,
  ]);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const realDigitalEnableAccount = m.contract("RealDigitalEnableAccount", [
    realDigital,
  ]);

  const encryptedContractName = addressDiscoveryUtils.getEncryptedContractName(
    "RealDigitalEnableAccount"
  );

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realDigitalEnableAccount,
  ]);

  return { realDigitalEnableAccount };
});
