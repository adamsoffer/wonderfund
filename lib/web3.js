import Web3 from 'web3'

// instantiate new web3 instance
const web3 = new Web3()

// providers
export const providers = {
  livenet: web3.setProvider(
    new web3.providers.HttpProvider('https://livenet.infura.io/')
  ),
  testnet: web3.setProvider(
    new web3.providers.HttpProvider('https://morden.infura.io/')
  ),
  testrpc: web3.setProvider(
    new web3.providers.HttpProvider('http://localhost:8545')
  )
}

// if window provider exists
if (
  process.browser &&
  typeof window.web3 !== 'undefined' &&
  typeof window.web3.currentProvider !== 'undefined'
) {
  providers.window = web3.setProvider(window.web3.currentProvider)
}

// export web3 object instance
export default web3
