import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AddressDiscoveryModule from "./AddressDiscoveryModule";
import RealDigitalModule from "./RealDigitalModule";
import RealDigitalDefaultAccountModule from "./RealDigitalDefaultAccountModule";
import SwapOneStepModule from "./SwapOneStepModule";
import SwapTwoStepsModule from "./SwapTwoStepsModule";
import addressDiscoveryUtils from "../../utils/AddressDiscoveryUtils";

export default buildModule("RealTokenizadoModule", (m) => {
  const admin = m.getAccount(0);
  const authority = m.getAccount(1);
  const bank = m.getParameter("bank");
  const cnpj = m.getParameter("cnpj");

  const { addressDiscovery } = m.useModule(AddressDiscoveryModule);
  const { realDigital } = m.useModule(RealDigitalModule);
  const { realDigitalDefaultAccount } = m.useModule(
    RealDigitalDefaultAccountModule
  );
  const { swapOneStep } = m.useModule(SwapOneStepModule);
  const { swapTwoSteps } = m.useModule(SwapTwoStepsModule);

  //   constructor(
  //     AddressDiscovery _ad,
  //     string memory _name,
  //     string memory _symbol,
  //     address _authority,
  //     address _admin,
  //     string memory _participant,
  //     uint256 _cnpj8,
  //     address _reserve
  // ) RealDigital(_name, _symbol, _authority, _admin) {

  // TypeError: invalid BigNumberish string: Cannot convert BancoA to a BigInt (argument="value", value="BancoA", code=INVALID_ARGUMENT, version=6.12.0)
  const realTokenizado = m.contract("RealTokenizado", [
    addressDiscovery,
    bank,
    "BND",
    authority,
    admin,
    "" + cnpj,
    cnpj,
    authority,
  ]);

  realTokenizado.dependencies
    .add(addressDiscovery)
    .add(realDigital)
    .add(realDigitalDefaultAccount)
    .add(swapOneStep)
    .add(swapTwoSteps);

  const encryptedContractName =
    addressDiscoveryUtils.getEncryptedContractName("RealTokenizado");

  m.call(addressDiscovery, "updateAddress", [
    encryptedContractName,
    realTokenizado,
  ]);

  m.call(realDigitalDefaultAccount, "addDefaultAccount", [
    cnpj,
    realTokenizado,
  ]);

  // m.call(realDigitalEnableAccount, "enableAccount", [realTokenizado]);

  return { realTokenizado, realDigital, addressDiscovery };
});
