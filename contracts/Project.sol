pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Project {  
  using SafeMath for uint;
  
  // Note: Project name description and image url are for demo purposes only.
  // In a real world application this data incurs uneccessary expense and
  // should live offchain.
  struct ProjectInfo {
    bytes32 projectName;
    string description;
    string imageUrl;
    address beneficiary;
    uint256 deadline;
    uint fundingGoal;
  }

  struct Funder {
    uint amount;
  }

  ProjectInfo public projectInfo;
  uint public amountRaised;
  bool public successfullyFunded;
  address[] public funders;
  mapping (address => Funder) public funderInfo;

  modifier beforeDeadline() {
    require(now < projectInfo.deadline);
    _;
  }

  modifier afterDeadline() {
    require(now >= projectInfo.deadline);
    _;
  }

  modifier goalReached() {
    require(successfullyFunded);
    _;
  }

  modifier goalNotReached() {
    require(!successfullyFunded);
    _;
  }

  function Project(
    bytes32 projectName,
    string description,
    string imageUrl,
    address beneficiary,
    uint256 deadline,
    uint fundingGoal
  ) public
  {
    // Make sure beneficiary is a valid address
    require(beneficiary != 0);

    // Ensure deadline is set to some time in the future
    require(now < deadline);

    // Ensure a funding goal is greater than 0
    require(fundingGoal > 0);
  
    // Store project info
    projectInfo = ProjectInfo(
      projectName,
      description,
      imageUrl,
      beneficiary,
      deadline,
      fundingGoal
    );
  }

  function getProject() public view returns (
    bytes32 projectName,
    string description,
    string imageUrl,
    uint256 deadline,
    uint fundingGoal
  ) {
    return (
      projectInfo.projectName,
      projectInfo.description,
      projectInfo.imageUrl,
      projectInfo.deadline,
      projectInfo.fundingGoal
    );
  }

  function fund(address funder) public beforeDeadline goalNotReached payable {
    require(msg.value > 0);
    funderInfo[funder].amount = funderInfo[funder].amount.add(msg.value);
    funders.push(funder);
    amountRaised = amountRaised.add(msg.value);

    if (amountRaised >= projectInfo.fundingGoal) {
      successfullyFunded = true;
    }
  }

  function payout() public afterDeadline goalReached {
    require(msg.sender == projectInfo.beneficiary);
    uint amount = amountRaised;
    amountRaised = 0;
    projectInfo.beneficiary.transfer(amount);
  }

  function refund() public afterDeadline goalNotReached {
    require(funderInfo[msg.sender].amount > 0);
    uint refundAmount = funderInfo[msg.sender].amount;
    funderInfo[msg.sender].amount = 0;
    msg.sender.transfer(refundAmount);
  }

  function() public {
    revert();
  }
}
