import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const { AUTHORITY_KEY, ADMIN_KEY } = process.env;

const config = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
      // accounts: [AUTHORITY_KEY, ADMIN_KEY],
    },
    besu: {
      url: "http://localhost:8545",
      chainId: 1217,
      accounts: [AUTHORITY_KEY, ADMIN_KEY],
    },
  },
};

export default config;
