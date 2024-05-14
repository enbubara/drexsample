import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";
import RealDigitalModule from "./RealDigitalModule";

export default buildModule("SwapTwoStepsModule", (m) => {
  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const { realDigital } = m.useModule(RealDigitalModule);

  const swapTwoSteps = m.contract("SwapTwoSteps", [realDigital]);

  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("SwapTwoSteps");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    swapTwoSteps,
  ]);

  return { swapTwoSteps };
});
