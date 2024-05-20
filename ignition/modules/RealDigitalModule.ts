import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";

export default buildModule("RealDigitalModule", (m) => {
  const admin = m.getAccount(0);
  const authority = m.getAccount(1);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);

  const realDigital = m.contract("RealDigital", [
    "Real Digital",
    "BRL",
    admin,
    admin,
  ]);

  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("RealDigital");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realDigital,
  ]);

  m.call(realDigital, "enableAccount", [admin]);

  return { realDigital };
});
