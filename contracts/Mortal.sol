pragma solidity ^0.4.4;


contract Mortal {
  address owner;

  function Mortal() public {
    owner = msg.sender;
  }

  /* Function to recover the funds on the contract */
  function kill() public {
    if (msg.sender == owner) {
      selfdestruct(owner);
    }
  }
}
