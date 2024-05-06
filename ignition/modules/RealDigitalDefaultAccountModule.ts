import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../scripts/AddressDiscoveryUtils";

export default buildModule("RealDigitalDefaultAccountModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);


  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const realDigitalDefaultAccount = m.contract("RealDigitalDefaultAccount", [
    addressDiscovery,
    authority,
    admin,
  ]);

  const encryptedContractName = addressDiscoveryUtils.getEncryptedContractName(
    "RealDigitalDefaultAccount"
  );

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realDigitalDefaultAccount,
  ]);

  return { realDigitalDefaultAccount };
});
