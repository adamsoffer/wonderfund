var FundingHub = artifacts.require('./FundingHub.sol')

module.exports = function (deployer) {
  deployer.then(() => {
    web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        console.log('There was an error fetching your accounts.', err)
      }
      if (accounts.length === 0) {
        console.log('Could not get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }
      var projectName = 'Oculus Rift'
      var description = 'Rift is unlike anything you have experienced...'
      var imageUrl = 'http://virtualrealitytimes.com/wp-content/uploads/2017/04/3044381-ocie.jpg'
      var beneficiary = accounts[0]
      var deadline = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
      var fundingGoal = web3.toWei(10, 'ether')
      FundingHub.deployed().then((instance) => {
        return instance.createProject(projectName, description, imageUrl, beneficiary, deadline, fundingGoal, { from: beneficiary })
      })
    })
  })
}
