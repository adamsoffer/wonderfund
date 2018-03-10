var FundingHub = artifacts.require('./FundingHub.sol')

module.exports = function(deployer, network, accounts) {
  if (accounts.length === 0) {
    console.log(
      'Could not get any accounts! Make sure your Ethereum client is configured correctly.'
    )
    return
  }
  var projectName = 'Oculus Rift'
  var description = 'Rift is unlike anything you have experienced...'
  var imageUrl =
    'https://s3.amazonaws.com/static.oculus.com/website/2016/03/riftshipping2.jpg'
  var beneficiary = accounts[0]
  var deadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  var fundingGoal = web3.toWei(10, 'ether')
  FundingHub.deployed().then(instance => {
    return instance.createProject(
      projectName,
      description,
      imageUrl,
      beneficiary,
      deadline,
      fundingGoal,
      { from: beneficiary }
    )
  })
}
