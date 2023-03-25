require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_URL}`,
      accounts: [`${process.env.ACCOUNT_PRIVATE_KEY}`],
    }
  }
};
