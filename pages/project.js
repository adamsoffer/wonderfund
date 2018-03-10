import React from 'react'
import { default as contract } from 'truffle-contract'
import { H1 } from 'glamorous'
import projectArtifacts from '../build/contracts/Project.json'
import fundinghubArtifacts from '../build/contracts/FundingHub.json'
import web3 from '../lib/web3'
import Main from '../lib/layout'
import { getProject, getAccount } from './index'
import Header from '../components/Header'
import ProjectForm from '../components/ProjectForm'
import { container } from '../lib/mixins'

const ProjectContract = contract(projectArtifacts)
const FundingHub = contract(fundinghubArtifacts)

ProjectContract.setProvider(web3.currentProvider)
FundingHub.setProvider(web3.currentProvider)

export default class Project extends React.Component {
  static async getInitialProps({ query }) {
    const projectAddress = query.slug
    const project = await getProject(projectAddress)
    return {
      project: project
    }
  }

  componentDidMount() {
    this.setAccount()
  }

  async setAccount() {
    let accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  handleSubmit(event) {
    event.preventDefault()
    let eth = event.target.contribution.value
    let contribution = web3.utils.toWei(eth, 'ether')
    FundingHub.deployed()
      .then(instance => {
        return instance.contribute(this.props.project.address, {
          from: this.state.account,
          value: contribution
        })
      })
      .then(project => {
        window.alert(`You've successfully contributed ${eth} ETH`)
      })
      .catch(e => {
        console.log(e)
      })
  }

  claimRefund() {
    let projectInstance = ProjectContract.at(this.props.project.address)
    projectInstance
      .refund({ from: this.state.account })
      .then(result => {
        console.log('refunded', result)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <Main>
        <Header inverse relative />
        <ProjectForm
          handleSubmit={this.handleSubmit.bind(this)}
          style={{ ...container }}
          project={this.props.project}
        />
      </Main>
    )
  }
}
