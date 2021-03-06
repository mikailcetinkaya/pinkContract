//SPDX-License-Identifier: 0BSD
pragma solidity ^0.8.4;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
