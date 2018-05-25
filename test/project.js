import web3 from '../lib/web3'
import RPC from '../lib/rpc'

contract('Project', function(accounts) {
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
  let rpc
  let currentSnapshotId

  before(async () => {
    rpc = new RPC(web3)
  })

  beforeEach('Create and contribute to project', async function() {
    currentSnapshotId = await rpc.snapshot()
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
    fundingHubInstance.contribute(projectAddress, {
      from: contributor1,
      value: contribution
    })
  })

  afterEach(async () => {
    await rpc.revert(currentSnapshotId)
  })

  describe('refund()', async function() {
    it('should refund contributor', async function() {
      let balanceBeforeRefund = await web3.eth.getBalance(contributor1)
      await rpc.increaseTime(72000)
      await projectInstance.refund({ from: contributor1 })
      let balanceAfterRefund = await web3.eth.getBalance(contributor1)
      assert(balanceAfterRefund.toString(10) > balanceBeforeRefund.toString(10))
    })
  })

  // describe('payout()', async function() {
  //   it('should payout the project beneficiary', async function() {
  //     fundingHubInstance.contribute(projectAddress, {
  //       from: contributor1,
  //       value: contribution
  //     })
  //     let balanceBeforePayout = await web3.eth.getBalance(beneficiary)
  //     await rpc.increaseTime(72000)
  //     await projectInstance.payout({ from: beneficiary })
  //     let balanceAfterPayout = await web3.eth.getBalance(beneficiary)
  //     assert(balanceAfterPayout.toString(10) > balanceBeforePayout.toString())
  //   })
  // })
})
