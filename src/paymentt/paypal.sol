// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract payments {
    event transaction(address indexed _from,address _to,uint256 amount,string symb);

    function _transfer(address payable _to, string memory sym) public payable {
        _to.transfer(msg.value);
        emit transaction(msg.sender, _to, msg.value, sym);
    }


    function saveTX(address _from,address _to,uint256 amount,string memory sym) public { //erc saving
        emit transaction(_from, _to, amount, sym);
    }

    //to save recipient Details
    event recipientD(address indexed recipientof,address recipientis,string recipientName);

    function recipients(address _recipient, string memory _name) public {
        emit recipientD(msg.sender, _recipient, _name);
    }
}

// Contract Natie
// 0x534cB0d23888Ae9A9DdC1b8a0F2c7269365916ef -polygon ok
// 0x8bd6Bd652Ac44d74465851291B25dB1DAE15D8fc -goerile ok
// 0x04E10a7A65170Ff32a3B9A4420b47AA4e52BEbC8 -sepolia ok

// ERC20
// 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
