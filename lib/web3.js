const Web3 = require('web3')
Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send
module.exports = new Web3(Web3.givenProvider || 'http://localhost:7545')
