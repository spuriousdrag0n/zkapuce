pragma solidity =0.5.16;

import '../ZkPuceERC20.sol';

contract ERC20 is ZkPuceERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
