pragma solidity ^0.4.2;

contract Project {
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
    if (now >= projectInfo.deadline) {
      throw;
    }
    _;
  }

  modifier afterDeadline() {
    if (now < projectInfo.deadline) {
      throw;
    }
    _;
  }

  modifier goalReached() {
    if (amountRaised < projectInfo.fundingGoal) {
      throw;
    }
    _;
  }

  modifier goalNotReached() {
    if (amountRaised >= projectInfo.fundingGoal) {
      throw;
    }
    _;
  }

  function Project(bytes32 projectName, string description, string imageUrl, address beneficiary, uint256 deadline, uint fundingGoal) {
    projectInfo = ProjectInfo(projectName, description, imageUrl, beneficiary, deadline, fundingGoal);
  }

  function getProject() returns (bytes32, string, string, uint256, uint) {
    return (projectInfo.projectName, projectInfo.description, projectInfo.imageUrl, projectInfo.deadline, projectInfo.fundingGoal);
  }

  function fund(address funder) beforeDeadline goalNotReached payable {
    if (msg.value > 0) {
      funderInfo[funder].amount += msg.value;
      funders.push(funder);
      amountRaised += msg.value;

      if(amountRaised >= projectInfo.fundingGoal) {
        successfullyFunded = true;
        payout();
      }
    }
  }

  function payout() private goalReached {
    projectInfo.beneficiary.transfer(amountRaised);
  }

  function refund() afterDeadline goalNotReached {
    msg.sender.transfer(funderInfo[msg.sender].amount);
  }
}
