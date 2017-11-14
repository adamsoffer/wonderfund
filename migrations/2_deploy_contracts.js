var FundingHub = artifacts.require('./FundingHub.sol')
var Project = artifacts.require('./Project.sol')

module.exports = function(deployer) {
  deployer.deploy(FundingHub)
  deployer.deploy(Project)
}
