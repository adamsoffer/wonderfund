import React from 'react'
import { default as contract } from 'truffle-contract'
import { css } from 'glamor'
import moment from 'moment'
import fundinghubArtifacts from '../build/contracts/FundingHub.json'
import projectArtifacts from '../build/contracts/Project.json'
import web3 from '../lib/web3'
import Main from '../lib/layout'
import Header from '../components/Header'
import Masthead from '../components/Masthead'
import ProjectList from '../components/ProjectList'
import 'isomorphic-fetch'

const FundingHub = contract(fundinghubArtifacts)
const Project = contract(projectArtifacts)
FundingHub.setProvider(web3.currentProvider)
Project.setProvider(web3.currentProvider)

css.global('body', {
  backgroundColor: '#f5f5f5'
})

export default class extends React.Component {
  static async getInitialProps ({ pathname }) {
    const account = await getAccount()
    const projects = await getProjects()
    return {
      account: account,
      projects: projects
    }
  }

  render () {
    return (
      <Main>
        <Header />
        <Masthead project={this.props.projects[0]} />
        <ProjectList projects={this.props.projects.slice(1)} />
      </Main>
    )
  }
}

async function getProjects () {
  const projectInstance = await FundingHub.deployed()
  const projectAddresses = await projectInstance.getProjects.call()
  let promiseArray = []
  projectAddresses.map((projectAddress) => {
    return promiseArray.push(getProject(projectAddress))
  })
  return Promise.all(promiseArray)
}

function getProject (projectAddress) {
  let projectInstance = Project.at(projectAddress)
  return new Promise((resolve, reject) => {
    Promise.all([
      projectInstance.getProject.call(),
      projectInstance.amountRaised.call(),
      projectInstance.successfullyFunded.call()
    ]).then((result) => {
      resolve({
        name: web3.toAscii(result[0][0]),
        address: projectAddress,
        description: result[0][1],
        imageUrl: result[0][2],
        deadline: moment.unix(result[0][3].toNumber()),
        fundingGoal: web3.fromWei(result[0][4].toNumber(), 'ether'),
        amountRaised: web3.fromWei(result[1].toNumber(), 'ether'),
        successfullyFunded: result[2]
      })
    }).catch((e) => {
      console.log(e)
      reject(e)
    })
  })
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

export { getAccount, getProject }
