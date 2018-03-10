pragma solidity ^0.4.4;


contract Mortal {
  address private owner;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Mortal() public {
    owner = msg.sender;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  /* Function to recover the funds on the contract */
  function kill() public onlyOwner {
    selfdestruct(owner);
  }
}
