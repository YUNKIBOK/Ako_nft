pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Ako is ERC721Full{

    string[] public akos;
    mapping(string => bool) _akoExists;
    constructor() ERC721Full("Ako", "AKO") public {
    } 

    // E.G. color = "#FFFFFF"
    function mint(string memory _ako) public {
        require(!_akoExists[_ako]);
        uint _id = akos.push(_ako);
        _mint(msg.sender, _id);
        _akoExists[_ako] = true;
    }
}