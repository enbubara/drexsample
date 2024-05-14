import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";
import RealDigitalModule from "./RealDigitalModule";

export default buildModule("RealDigitalEnableAccountModule", (m) => {
  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);

  const { realDigital } = m.useModule(RealDigitalModule);
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
