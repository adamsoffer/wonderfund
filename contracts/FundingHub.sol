pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./Mortal.sol";
import "./Project.sol";


contract FundingHub is Mortal {
  address public owner;
  address[] public projects;

  event ProjectCreated(address indexed sender, address project);

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
    // require deadline to be some time in the future
    require(now < deadline);

    // The project creator must set a funding goal
    require(fundingGoal > 0);

    Project newProject = new Project(
      projectName,
      description,
      imageUrl,
      beneficiary,
      deadline,
      fundingGoal
    );
    projects.push(newProject);
    ProjectCreated(msg.sender, newProject);
    return newProject;
  }

  function getProjects() public view returns (address[]) {
    return projects;
  }

  function contribute(address projectAddress) public payable {
    // Make sure project address is a valid
    require(projectAddress != 0);
    Project(projectAddress).fund.value(msg.value)(msg.sender);
  }

  function() public {
    revert();
  }
}