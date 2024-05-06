import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const { AUTHORITY_KEY, ADMIN_KEY } = process.env;

//"0x68e51bac1577b5b2f94c3c41e28fb463acf60e7c25399fbfd771edb72009fc0c";// node2
// "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"; // carteira-3 qbtConfigFile.json
// "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // hardhat-0

// const PRIVATE_KEY =
//"c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // carteira-2 qbtConfigFile.json
// "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // hardhat-1

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
