import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AddressDiscoveryModule", (m) => {
  const authority = m.getAccount(0);
  const admin = m.getAccount(1);

  const addressDiscovery = m.contract("AddressDiscovery", [authority, admin]);
  return { addressDiscovery };
});
