pragma solidity ^0.6.0;

contract MyContract{
    
    uint[] public uintArry = [1,2,3];
    string[] public stringArry = ["apple", "banana", "carrot"];
    string[] values;
    uint[][] public arry2D = [[1,2,3], [4,5,6]];
    
    function addValue(string memory _value) public {
        values.push(_value);
    }
    
    function valueCount() public view returns (uint) {
        return values.length;
    }
}