import React from 'react'
import { default as contract } from 'truffle-contract'
import { css } from 'glamor'
import { Div, H2, H3 } from 'glamorous'
import moment from 'moment'
import 'isomorphic-fetch'
import fundinghubArtifacts from '../build/contracts/FundingHub.json'
import projectArtifacts from '../build/contracts/Project.json'
import web3 from '../lib/web3'
import Main from '../lib/layout'
import Header from '../components/Header'
import Masthead from '../components/Masthead'
import ProjectList from '../components/ProjectList'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

const FundingHub = contract(fundinghubArtifacts)
const Project = contract(projectArtifacts)
FundingHub.setProvider(web3.currentProvider)
Project.setProvider(web3.currentProvider)

// dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof Project.currentProvider.sendAsync !== 'function') {
  Project.currentProvider.sendAsync = function() {
    return Project.currentProvider.send.apply(
      Project.currentProvider,
      arguments
    )
  }
}

export default class extends React.Component {
  static async getInitialProps({ pathname }) {
    const projects = await getProjects()
    return {
      projects
    }
  }

  componentDidMount() {
    this.setAccount()
  }

  async setAccount() {
    let accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  render() {
    return (
      <Main>
        <Header />
        <Masthead />
        <PageTitle
          heading="Featured Projects"
        />
        <ProjectList projects={this.props.projects} />
        <Footer />
      </Main>
    )
  }
}

async function getProjects() {
  const projectInstance = await FundingHub.deployed()
  const projectAddresses = await projectInstance.getProjects.call()
  let promiseArray = []
  projectAddresses.map(projectAddress => {
    return promiseArray.push(getProject(projectAddress))
  })
  return Promise.all(promiseArray)
}

function getProject(projectAddress) {
  let projectInstance = Project.at(projectAddress)
  return new Promise((resolve, reject) => {
    Promise.all([
      projectInstance.getProject.call(),
      projectInstance.amountRaised.call(),
      projectInstance.successfullyFunded.call()
    ])
      .then(result => {
        resolve({
          name: web3.utils.toAscii(result[0][0]),
          address: projectAddress,
          description: result[0][1],
          imageUrl: result[0][2],
          deadline: moment.unix(result[0][3].toString()),
          fundingGoal: web3.utils.fromWei(result[0][4].toString(), 'ether'),
          amountRaised: web3.utils.fromWei(result[1].toString(), 'ether'),
          successfullyFunded: result[2]
        })
      })
      .catch(e => {
        console.log(e)
        reject(e)
      })
  })
}

export { getProject }
