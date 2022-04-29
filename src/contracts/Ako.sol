// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("A-KO", "AKO") {}

    mapping(uint256 => uint256) public costOfTokens; //토큰 가격을 저장하는 딕셔너리

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) //지우면 안됨
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintToken(string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function sellToken(uint _id, uint _price)
        public
    {
        require(_price>=0, "price should be greater than zero");
        address tokenOwner = ownerOf(_id);
        require(tokenOwner==msg.sender, "you are not token owner");
        _approve(address(this), _id);
        costOfTokens[_id] = _price;

    }

    function printCost(uint _index) // 토큰 가격을 확인하는 임시 함수
        public
        view
        returns (uint)
    {
        return costOfTokens[_index];
    }

    function buyToken(uint _id)
        public
        payable
    {
        require(getApproved(_id)!=address(0), "you can not buy"); // 판매 중 이어야 한다
        require(ownerOf(_id)!=msg.sender, "you are token owner"); // 내 소유가 아니어야 한다
        uint _price = costOfTokens[_id];
        address tokenOwner = ownerOf(_id);
        require(_price<=msg.value, "you need more budget"); // 자금이 부족하지 않아야 한다
        payable(tokenOwner).transfer(msg.value);
        _transfer(tokenOwner, msg.sender, _id);
        costOfTokens[_id] = 0;
    }
}
