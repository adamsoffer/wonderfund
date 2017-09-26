import React from 'react'
import { default as contract } from 'truffle-contract'
import { H1 } from 'glamorous'
import moment from 'moment'
import fundinghubArtifacts from '../build/contracts/FundingHub.json'
import web3 from '../lib/web3'
import Main from '../lib/layout'
import { Router } from '../lib/routes'
import Header from '../components/Header'
import CampaignForm from '../components/CampaignForm'
import { container } from '../lib/mixins'

const FundingHub = contract(fundinghubArtifacts)
FundingHub.setProvider(web3.currentProvider)

export default class extends React.Component {
  static async getInitialProps ({ pathname }) {
    const account = await getAccount()
    return {
      account: account
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    let projectName = event.target.projectName.value
    let description = event.target.description.value
    let imageUrl = event.target.imageUrl.value
    let beneficiary = event.target.beneficiary.value
    let deadline = moment(event.target.deadline.value).unix()
    let fundingGoal = web3.toWei(parseInt(event.target.fundingGoal.value), 'ether')
    FundingHub.deployed().then((instance) => {
      return instance.createProject(projectName, description, imageUrl, beneficiary, deadline, fundingGoal, {from: this.props.account})
    }).then((projectInstance) => {
      // Get contract address from logs
      let projectAddress = '0x' + projectInstance.receipt.logs[0].data.substr(-40)
      Router.pushRoute(`/project/${projectAddress}`)
    }).catch((e) => {
      console.log(e)
    })
  }

  render () {
    return (
      <Main>
        <Header inverse relative />
        <H1 css={{...container, fontSize: '40px', lineHeight: '48px', marginBottom: '20px'}}>Start a campaign</H1>
        <CampaignForm handleSubmit={this.handleSubmit.bind(this)} />
      </Main>
    )
  }
}

function getAccount () {
  return new Promise(function (resolve, reject) {
    web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        reject('There was an error fetching your accounts.')
      }
      if (accounts.length === 0) {
        reject('Could not get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }
      resolve(accounts[0])
    })
  })
}
