// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract payments {
    event transaction(
        address indexed _from,
        address _to,
        uint256 amount,
        string symb
    );

    function _transfer(address payable _to, string memory sym) public payable {
        _to.transfer(msg.value);
        emit transaction(msg.sender, _to, msg.value, sym);
    }

    function saveTX(
        address _from,
        address _to,
        uint256 amount,
        string memory sym
    ) public {
        //erc saving
        emit transaction(_from, _to, amount, sym);
    }

    //to save recipient Details
    event recipientD(
        address indexed recipientof,
        address recipientis,
        string recipientName
    );

    function recipients(address _recipient, string memory _name) public {
        emit recipientD(msg.sender, _recipient, _name);
    }
}
