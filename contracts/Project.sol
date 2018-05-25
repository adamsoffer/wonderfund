pragma solidity ^0.4.4;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Project
 * @dev Represents a single Project managed by the FundingHub contract
 */
contract Project {  
  using SafeMath for uint256;

  struct ProjectInfo {
    string projectName;
    string description;
    string imageUrl;
    address beneficiary;
    uint256 deadline;
    uint256 fundingGoal;
  }

  struct Contributor {
    uint256 amount;
  }

  ProjectInfo public projectInfo;
  uint256 public amountRaised;
  bool public successfullyFunded;
  address[] public contributors;
  mapping (address => Contributor) public contributorInfo;

  event LogProject(address indexed sender, address project);
  event LogFund(address indexed sender, address indexed contributor, uint256 amount);
  event LogPayout(address indexed sender, uint256 amount);
  event LogRefund(address indexed sender, uint256 amount);

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

  /**
   * @dev Project constructor. Initializes ProjectInfo.
   * todo: Move _projectName, _description, and _imageUrl offchain
   * @param _projectName The name of the project
   * @param _description A description of the project
   * @param _imageUrl An image url representing the project
   * @param _beneficiary The owner of the project and beneficiary of the funds
   * @param _deadline The time before which the amount has to be raised
   * @param _fundingGoal The amount to be raised
   */
  function Project(
    string _projectName,
    string _description,
    string _imageUrl,
    address _beneficiary,
    uint256 _deadline,
    uint256 _fundingGoal
  ) public
  {
    // Make sure beneficiary is a valid address
    require(_beneficiary != 0);

    // Ensure deadline is set to some time in the future
    require(now < _deadline);

    // Ensure a funding goal is greater than 0
    require(_fundingGoal > 0);
  
    // Store project info
    projectInfo = ProjectInfo(
      _projectName,
      _description,
      _imageUrl,
      _beneficiary,
      _deadline,
      _fundingGoal
    );

    LogProject(msg.sender, this);
  }

  /**
   * @dev called when the FundingHub receives a contribution. Keeps track of 
   * each contributor and the individual amounts contributed and sets the
   * project status if funding goal is reached
   * @param _contributor The address of the contributor
   */
  function fund(address _contributor) public beforeDeadline goalNotReached payable {
    require(msg.value > 0);
    contributorInfo[_contributor].amount = contributorInfo[_contributor].amount.add(msg.value);
    contributors.push(_contributor);
    amountRaised = amountRaised.add(msg.value);

    if (amountRaised >= projectInfo.fundingGoal) {
      successfullyFunded = true;
    }

    LogFund(msg.sender, _contributor, msg.value);
  }

  /**
   * @dev Sends all funds received in the contract to the owner of the project.
   */
  function payout() public afterDeadline goalReached {
    require(msg.sender == projectInfo.beneficiary);
    uint256 amount = amountRaised;
    amountRaised = 0;
    projectInfo.beneficiary.transfer(amount);
    LogPayout(msg.sender, amount);
  }

  /**
   * @dev Lets all contributors retrieve their contributions
   */
  function refund() public afterDeadline goalNotReached {
    require(contributorInfo[msg.sender].amount > 0);
    uint256 refundAmount = contributorInfo[msg.sender].amount;
    contributorInfo[msg.sender].amount = 0;
    msg.sender.transfer(refundAmount);
    LogRefund(msg.sender, refundAmount);
  }

  function() public {
    revert();
  }
}
