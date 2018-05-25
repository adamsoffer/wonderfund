pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Destructible.sol";
import "./Project.sol";


/**
 * @title FundingHub
 * @dev FundingHub is the registry of all Projects to be funded.
 */
contract FundingHub is Ownable, Destructible {
  address[] public projects;

  event LogCreateProject(address indexed sender, address project);
  event LogContribute(address indexed sender, address project, uint256 amount);

  /**
   * @dev Adds a new project to the FundingHub.
   * todo: Move _projectName, _description, and _imageUrl offchain
   * @param _projectName The name of the project
   * @param _description A description of the project
   * @param _imageUrl An image url representing the project
   * @param _beneficiary The owner of the project and beneficiary of the funds
   * @param _deadline The time before which the amount has to be raised
   * @param _fundingGoal The amount to be raised
   */
  function createProject(
    string _projectName,
    string _description,
    string _imageUrl,
    address _beneficiary,
    uint256 _deadline,
    uint256 _fundingGoal
  ) public
  {
    // require deadline to be some time in the future
    require(now < _deadline);

    // The project creator must set a funding goal
    require(_fundingGoal > 0);

    Project newProject = new Project(
      _projectName,
      _description,
      _imageUrl,
      _beneficiary,
      _deadline,
      _fundingGoal
    );
    projects.push(newProject);
    LogCreateProject(msg.sender, newProject);
  }

  /**
   * @dev Returns array of project addresses
   */
  function getProjects() public view returns (address[]) {
    return projects;
  }

  /**
   * @dev Contributes to a Project identified by its address
   * @param _projectAddress The address of the project
   */
  function contribute(address _projectAddress) public payable {
    require(_projectAddress != 0);
    require(msg.value > 0);
    
    Project(_projectAddress).fund.value(msg.value)(msg.sender);
    
    LogContribute(msg.sender, _projectAddress, msg.value);
  }

  function() public {
    revert();
  }
}