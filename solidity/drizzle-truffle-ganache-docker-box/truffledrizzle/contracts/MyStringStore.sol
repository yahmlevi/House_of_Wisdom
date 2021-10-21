// pragma solidity ^0.5.0;
pragma solidity >=0.4.21 <0.6.0;

contract MyStringStore {
    // string public myString = "Hello World";
    string private myString = "Hello World";

    function set(string memory x) public {
        myString = x;
    }

    function getString() public view returns(string memory) {
        return myString;
    }
}