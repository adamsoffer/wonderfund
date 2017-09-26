const FundingHub = artifacts.require('./FundingHub.sol')
const Project = artifacts.require('./Project.sol')
const Promise = require('bluebird')
const addEvmFunctions = require('../lib/evmFunctions.js')

contract('FundingHub', function(accounts) {
  addEvmFunctions(web3)
  Promise.promisifyAll(web3.eth, { suffix: 'Promise' })
  Promise.promisifyAll(web3.version, { suffix: 'Promise' })
  Promise.promisifyAll(web3.evm, { suffix: 'Promise' })

  let isTestRPC

  before('should identify TestRPC', function() {
    return web3.version
      .getNodePromise()
      .then(node => (isTestRPC = node.indexOf('EthereumJS TestRPC') >= 0))
  })

  describe('FundingHub', function() {
    let instance
    let project
    let projectName = 'Oculus Rift'
    let description = 'Rift is unlike anything you have experienced...'
    let imageUrl =
      'http://virtualrealitytimes.com/wp-content/uploads/2017/04/3044381-ocie.jpg'
    let beneficiary = accounts[0]
    let contributor = accounts[1]
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

    before('should contribute 4 eth', function() {
      return instance.contribute(project.address, {
        from: contributor,
        value: contribution
      })
    })

    describe('Project', function() {
      it('should refund', function() {
        if (!isTestRPC) this.skip('Needs TestRPC')
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
            balanceBeforeRefund = web3.eth.getBalance(contributor).toNumber()
            return project.refund({ from: contributor })
          })
          .then(result => {
            // Contributor's balance is greater than what it was before refund
            assert(
              web3.eth.getBalance(contributor).toNumber() > balanceBeforeRefund
            )
            // Project balance is zero after refund
            assert.strictEqual(
              web3.eth.getBalance(project.address).toNumber(),
              0
            )
          })
      })
    })
  })
})
