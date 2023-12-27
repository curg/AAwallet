### Usage: 
1. run `yarn`
2. run `yarn run bundler`
    (or `yarn run bundler --unsafe`, if working with "hardhat node")

Now your bundler is active on local url http://localhost:3000/rpc    

To run a simple test, do `yarn run runop --deployFactory --network https://rpc-evm-sidechain.xrpl.org --entryPoint 0xE1B5Bd544fd88fedDdC2e5C62614bfECD053Eb14`

   The runop script:
   - deploys a wallet deployer (if not already there)
   - creates a random signer (owner for wallet)
   - determines the wallet address, and funds it
   - sends a transaction (which also creates the wallet)
   - sends another transaction, on this existing wallet
   - (uses account[0] or mnemonic file for funding, and creating deployer if needed)