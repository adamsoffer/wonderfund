import web3 from '../lib/web3'
import RPC from '../lib/rpc'

contract('FundingHub', function(accounts) {
  let beneficiary = accounts[0]
  let contributor1 = accounts[1]
  let contributor2 = accounts[2]
  let FundingHub = artifacts.require('./FundingHub.sol')
  let Project = artifacts.require('./Project.sol')
  let projectName = 'Oculus Rift'
  let description = 'Rift is unlike anything you have experienced...'
  let imageUrl =
    'http://virtualrealitytimes.com/wp-content/uploads/2017/04/3044381-ocie.jpg'
  let deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
  let fundingGoal = web3.utils.toWei('5', 'ether')
  let contribution = web3.utils.toWei('4', 'ether')
  web3.eth.getTransactionReceiptMined = require('../lib/getTransactionReceiptMined.js')
  let projectAddress
  let fundingHubInstance
  let projectInstance

  describe('createProject()', async function() {
    it('successfully creates a project', async function() {
      fundingHubInstance = await FundingHub.new({ from: accounts[0] })
      let tx = await fundingHubInstance.createProject(
        projectName,
        description,
        imageUrl,
        beneficiary,
        deadline,
        fundingGoal,
        { from: beneficiary }
      )

      let receipt = await web3.eth.getTransactionReceiptMined(tx.tx)
      projectAddress = `0x${receipt.logs[0].data.substr(-40)}`
      projectInstance = Project.at(projectAddress)
      let projectInfo = await projectInstance.projectInfo.call()
      assert(projectInfo[3], beneficiary)
      assert(projectInfo[4].toString(), deadline)
      assert(projectInfo[5].toString(), fundingGoal)
    })
  })

  describe('contribute()', async function() {
    it('should increase amount raised by contribution ', async function() {
      let amountRaisedBeforeContribution = await projectInstance.amountRaised.call()
      fundingHubInstance.contribute(projectAddress, {
        from: contributor1,
        value: contribution
      })
      let amountRaisedAfterContribution = await projectInstance.amountRaised.call()
      assert.strictEqual(
        (
          amountRaisedAfterContribution - amountRaisedBeforeContribution
        ).toString(),
        contribution.toString()
      )
    })
  })
})
