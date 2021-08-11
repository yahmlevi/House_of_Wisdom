pragma solidity ^0.6.0;

contract MyContract{
    // mapping(KEY => VALUE) public NAME;
    mapping(uint => string) public names;
    mapping(uint => Book) public books;
    mapping(address => mapping(uint => Book)) public myBooks;
    
    struct Book {
        string title;
        string author;
    }
    
    // like python's init func https://www.tutorialspoint.com/solidity/solidity_constructors.htm
    constructor() public {
        names[1] = "Adam";
        names[2] = "Bruce";
        names[3] = "Carl";
    }
    
    function addBook(uint _id, string memory _title, string memory _author) public {
        books[_id] = Book(_title, _author);
    }
    
    function addMyBook(uint _id, string memory _title, string memory _author) public {
        // msg.sender is the user's address
        myBooks[msg.sender][_id] = Book(_title, _author);
    }
}