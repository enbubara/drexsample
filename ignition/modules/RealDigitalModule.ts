import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../scripts/AddressDiscoveryUtils";

export default buildModule("RealDigitalModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);

  const realDigital = m.contract("RealDigital", [
    "Real Digital",
    "BRL",
    authority,
    admin,
  ]);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("RealDigital");
    
  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realDigital,
  ]);

  return { realDigital };
});
