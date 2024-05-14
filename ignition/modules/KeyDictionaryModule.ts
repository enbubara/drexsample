import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import RealDigitalModule from "./RealDigitalModule";

export default buildModule("KeyDictionaryModule", (m) => {
  const {realDigital} = m.useModule(RealDigitalModule); 

  const keyDictionary = m.contract("KeyDictionary", [ realDigital]);

  return { keyDictionary };
});
