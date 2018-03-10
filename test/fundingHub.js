const FundingHub = artifacts.require('./FundingHub.sol')
const Project = artifacts.require('./Project.sol')
const Promise = require('bluebird')
const addEvmFunctions = require('../lib/evmFunctions.js')

contract('FundingHub', function(accounts) {
  addEvmFunctions(web3)
  Promise.promisifyAll(web3.evm, { suffix: 'Promise' })

  describe('FundingHub', function() {
    let instance
    let project
    let projectName = 'Oculus Rift'
    let description = 'Rift is unlike anything you have experienced...'
    let imageUrl =
      'http://virtualrealitytimes.com/wp-content/uploads/2017/04/3044381-ocie.jpg'
    let beneficiary = accounts[0]
    let contributor1 = accounts[1]
    let contributor2 = accounts[2]
    let deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    let fundingGoal = web3.toWei(40, 'ether')
    let contribution = web3.toWei(4, 'ether')
    before('should be possible to deploy FundingHub', function() {
      return FundingHub.new({ from: accounts[0] }).then(fundingHubInstance => {
        instance = fundingHubInstance
      })
    })

    before(
      'should create a project with a deadline a week from now and keep timestamp',
      function() {
        return instance
          .createProject(
            projectName,
            description,
            imageUrl,
            beneficiary,
            deadline,
            fundingGoal,
            { from: beneficiary }
          )
          .then(projectInstance => {
            project = Project.at(
              '0x' + projectInstance.receipt.logs[0].data.substr(-40)
            )
          })
      }
    )

    before('should contribute 4 eth from contributer 1', function() {
      return instance.contribute(project.address, {
        from: contributor1,
        value: contribution
      })
    })

    before('should contribute 4 eth from contributer 2', function() {
      return instance.contribute(project.address, {
        from: contributor2,
        value: contribution
      })
    })

    describe('Project', function() {
      it('should refund', function() {
        let increaseBefore
        let balanceBeforeRefund
        return web3.evm
          .increaseTimePromise(0)
          .then(_increaseBefore => {
            increaseBefore = _increaseBefore
            return web3.evm.increaseTimePromise(3600) // fast forward 1 hour
          })
          .then(increase => {
            assert.strictEqual(increase, increaseBefore + 3600)
            balanceBeforeRefund = web3.eth.getBalance(contributor1).toNumber()
            return project.refund({ from: contributor1 })
          })
          .then(result => {
            // contributor1's balance is greater than what it was before refund
            assert(
              web3.eth.getBalance(contributor1).toNumber() > balanceBeforeRefund
            )
          })
      })
    })
  })
})
