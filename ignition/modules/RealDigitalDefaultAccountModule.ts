import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";
import RealDigitalModule from "./RealDigitalModule";

export default buildModule("RealDigitalDefaultAccountModule", (m) => {
  const admin = m.getAccount(0);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);

  const { realDigital } = m.useModule(RealDigitalModule);
  const realDigitalDefaultAccount = m.contract("RealDigitalDefaultAccount", [
    realDigital,
    admin,
    admin,
  ]);

  const encryptedContractName = addressDiscoveryUtils.getEncryptedContractName(
    "RealDigitalDefaultAccount"
  );

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realDigitalDefaultAccount,
  ]);

  return { realDigital, realDigitalDefaultAccount };
});
