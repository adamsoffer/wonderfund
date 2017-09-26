pragma solidity ^0.4.2;

import "./Project.sol";

contract FundingHub {
  address public owner;
  address[] public projects;

  event ProjectCreated(address project);

  function FundingHub() {
    owner = msg.sender;
  }

  function createProject(bytes32 projectName, string description, string imageUrl, address beneficiary, uint256 deadline, uint fundingGoal) returns (address) {
    Project newProject = new Project(projectName, description, imageUrl, beneficiary, deadline, fundingGoal);
    projects.push(newProject);
    ProjectCreated(newProject);
    return newProject;
  }

  function getProjects() returns (address[]) {
    return projects;
  }

  function contribute(address projectAddress) payable {
    Project(projectAddress).fund.value(msg.value)(msg.sender);
  }
}
