import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AddressDiscoveryModule", (m) => {
  const admin = m.getAccount(0);

  const addressDiscovery = m.contract("AddressDiscovery", [admin, admin]);
  return { addressDiscovery };
});
