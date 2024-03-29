import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";

import "solidity-coverage";

import * as fs from "fs";

const mnemonicFileName =
  process.env.MNEMONIC_FILE ??
  `${process.env.HOME}/.secret/testnet-mnemonic.txt`;
let mnemonic = "test ".repeat(11) + "junk";
if (fs.existsSync(mnemonicFileName)) {
  mnemonic = fs.readFileSync(mnemonicFileName, "ascii");
}

function getNetwork1(url: string): {
  url: string;
  accounts: { mnemonic: string };
} {
  return {
    url,
    accounts: { mnemonic },
  };
}

function getNetwork(name: string): {
  url: string;
  accounts: { mnemonic: string };
} {
  return getNetwork1(`https://${name}.infura.io/v3/${process.env.INFURA_ID}`);
  // return getNetwork1(`wss://${name}.infura.io/ws/v3/${process.env.INFURA_ID}`)
}

const optimizedCompilerSettings = {
  version: "0.8.23",
  settings: {
    optimizer: { enabled: true, runs: 1000000 },
    viaIR: true,
  },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
    ],
    overrides: {
      "contracts/core/EntryPoint.sol": optimizedCompilerSettings,
      "contracts/samples/SimpleAccount.sol": optimizedCompilerSettings,
    },
  },
  typechain: {
    target: "ethers-v5",
    outDir: "typechain-types",
  },
  networks: {
    dev: { url: "http://localhost:8545" },
    // github action starts localgeth service, for gas calculations
    localgeth: { url: "http://localgeth:8545" },
    goerli: getNetwork("goerli"),
    sepolia: getNetwork("sepolia"),
    proxy: getNetwork1("http://localhost:8545"),
    xrplSideChain: {
      url: "https://rpc-evm-sidechain.xrpl.org",
      chainId: 1440002,
      accounts: [
        `0xdac8325ff3f4dd22bc3a1a897c07ff75525bd19a476953e9773b5f9ccf262e6e`,
      ],
    },
  },
  mocha: {
    timeout: 10000,
  },
  // @ts-ignore
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

// coverage chokes on the "compilers" settings
if (process.env.COVERAGE != null) {
  // @ts-ignore
  config.solidity = config.solidity.compilers[0];
}

export default config;
