import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import addressDiscoveryUtils from "../../scripts/AddressDiscoveryUtils";

export default buildModule("SwapOneStepModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);

  const realDigital = m.contract("RealDigital", [
    "Real Digital",
    "BRL",
    authority,
    admin,
  ]);

  const swapOneStep = m.contract("SwapOneStep", [realDigital]);

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("SwapOneStep");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    swapOneStep,
  ]);

  return { swapOneStep };
});
