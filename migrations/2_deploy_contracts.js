let FundingHub = artifacts.require('./FundingHub.sol')

module.exports = function(deployer) {
  deployer.deploy(FundingHub)
}
