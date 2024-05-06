import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../scripts/AddressDiscoveryUtils";

export default buildModule("SwapTwoStepsModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);

  const realDigital = m.contract("RealDigital", [
    "Real Digital",
    "BRL",
    authority,
    admin,
  ]);

  const swapTwoSteps = m.contract("SwapTwoSteps", [realDigital]);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("SwapTwoStepsModule");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    swapTwoSteps,
  ]);

  return { swapTwoSteps };
});
