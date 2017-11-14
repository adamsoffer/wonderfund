pragma solidity ^0.4.2;

import "./Project.sol";
import "./Mortal.sol";


contract FundingHub is Mortal {
  address public owner;
  address[] public projects;

  event ProjectCreated(address project);

  function FundingHub() public {
    owner = msg.sender;
  }

  function createProject(
    bytes32 projectName,
    string description,
    string imageUrl,
    address beneficiary,
    uint256 deadline,
    uint fundingGoal
  ) public returns (address)
  {
    Project newProject = new Project(
      projectName,
      description,
      imageUrl,
      beneficiary,
      deadline,
      fundingGoal
    );
    projects.push(newProject);
    ProjectCreated(newProject);
    return newProject;
  }

  function getProjects() public returns (address[]) {
    return projects;
  }

  function contribute(address projectAddress) public payable {
    Project(projectAddress).fund.value(msg.value)(msg.sender);
  }
}
