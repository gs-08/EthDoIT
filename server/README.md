Create a .env file in server folder and paste your keys for following:
```shell
ALCHEMY_GOERLI_URL=''
ACCOUNT_PRIVATE_KEY=''
```

Install the dependencies:
```shell
npm install
```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
