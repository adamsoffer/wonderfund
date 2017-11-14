pragma solidity ^0.4.2;


contract Project {
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
    if (now >= projectInfo.deadline) {
      revert();
    }
    _;
  }

  modifier afterDeadline() {
    if (now < projectInfo.deadline) {
      revert();
    }
    _;
  }

  modifier goalReached() {
    if (!successfullyFunded) {
      revert();
    }
    _;
  }

  modifier goalNotReached() {
    if (successfullyFunded) {
      revert();
    }
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
    projectInfo = ProjectInfo(
      projectName,
      description,
      imageUrl,
      beneficiary,
      deadline,
      fundingGoal
    );
  }

  function getProject() public returns (
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
    funderInfo[funder].amount += msg.value;
    funders.push(funder);
    amountRaised += msg.value;

    if (amountRaised >= projectInfo.fundingGoal) {
      successfullyFunded = true;
    }
  }

  function payout() public goalReached payable {
    require(msg.sender == projectInfo.beneficiary);
    projectInfo.beneficiary.transfer(amountRaised);
  }

  function refund() public afterDeadline goalNotReached payable {
    msg.sender.transfer(funderInfo[msg.sender].amount);
  }
}
