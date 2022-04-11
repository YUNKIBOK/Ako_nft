//SPDX-License-Identifier: MIT
//스마트 컨트랙트에 대한 신뢰를 높이고, 저작권과 같은 문제를 해소하기 위해 솔리디티 코드의 최상단에 SPDX 라이센스를 명시한다. (* SPDX 라이센스는 주석으로 표시)

pragma solidity ^0.8.0;   

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; //NFT를 정의하는 인터페이스
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintAko is ERC721Enumerable{
    string uri;

    constructor(string memory _uri) ERC721("Ako", "AKO"){
        uri = _uri;
    }

    struct AkoData {
        uint akoRank;
        uint akoType;
    }

    mapping(uint => AkoData) public akoData;

    // 1 ETH 
    uint akoPrice = 1000000000000000000;

    function tokenURI(uint _tokenId) override public view returns (string memory) {
        string memory akoRank = Strings.toString(akoData[_tokenId].akoRank);
        string memory akoType = Strings.toString(akoData[_tokenId].akoType);

        return string(
            abi.encodePacked(uri, '/', akoRank, '/', akoType, '.json')
        );
    }


    function mintAko() public { 
        uint tokenId = totalSupply() + 1;
        //totalSupply(): ERC721Enumerable이 제공해주는 것으로 지금까지 민팅된 양을 나타냄.

        akoData[tokenId] = AkoData(4,4);
        
        _mint(msg.sender, tokenId);
    }
 }

