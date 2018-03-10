const Web3 = require('web3')

module.exports = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545')
