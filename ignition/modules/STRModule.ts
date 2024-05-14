import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import RealDigitalModule from "./RealDigitalModule";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";

export default buildModule("STRModule", (m) => {
  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const { realDigital } = m.useModule(RealDigitalModule);
  
  const str = m.contract("STR", [realDigital]);

  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("STR");

  m.call(addressDiscovery, "updateAddress", [encryptedContractName, str]);

  return { str };
});