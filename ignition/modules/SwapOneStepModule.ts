import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";
import RealDigitalModule from "./RealDigitalModule";

export default buildModule("SwapOneStepModule", (m) => {
  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const { realDigital } = m.useModule(RealDigitalModule);
 
  const swapOneStep = m.contract("SwapOneStep", [realDigital]);

  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("SwapOneStep");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    swapOneStep,
  ]);

  return { swapOneStep };
});
