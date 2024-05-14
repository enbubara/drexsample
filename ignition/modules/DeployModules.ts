import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import RealDigitalModule from "./RealDigitalModule";
import KeyDictionaryModule from "./KeyDictionaryModule";
import SwapOneStepModule from "./SwapOneStepModule";
import SwapTwoStepsModule from "./SwapTwoStepsModule";
import RealDigitalDefaultAccountModule from "./RealDigitalDefaultAccountModule";
import RealDigitalEnableAccountModule from "./RealDigitalEnableAccountModule";

export default buildModule("DeployModule", (m) => {
  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);

  const { realDigital } = m.useModule(RealDigitalModule);
  realDigital.dependencies.add(addressDiscovery);

  const { realDigitalDefaultAccount } = m.useModule(
    RealDigitalDefaultAccountModule
  );
  realDigitalDefaultAccount.dependencies.add(addressDiscovery).add(realDigital);

  const { realDigitalEnableAccount } = m.useModule(
    RealDigitalEnableAccountModule
  );
  realDigitalEnableAccount.dependencies.add(addressDiscovery).add(realDigital);

  const { keyDictionary } = m.useModule(KeyDictionaryModule);

  const { swapOneStep } = m.useModule(SwapOneStepModule);
  swapOneStep.dependencies.add(addressDiscovery).add(realDigital);

  const { swapTwoSteps } = m.useModule(SwapTwoStepsModule);
  swapTwoSteps.dependencies.add(addressDiscovery).add(realDigital);

  return {
    addressDiscovery,
    realDigital,
    keyDictionary,
    swapOneStep,
    swapTwoSteps,
    realDigitalDefaultAccount,
    realDigitalEnableAccount,
  };
});
