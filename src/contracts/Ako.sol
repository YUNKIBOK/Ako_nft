// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Ako is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // unique한 id를 부여하기 위한 카운터
    
    string [] public akos; // id-1 인덱스에 uri 저장하는 배열
    address [] public akos_owners; // id-1 인덱스에 owner의 주소를 저장하는 배열
    uint [] public akos_price; // id-1 인덱스에 price를 저장하는 배열
    bool [] public akos_approved; // id-1 인덱스에 판매 상태 여부를 저장하는 배열

    //생성자
    constructor() ERC721("A-KO", "AKO") {}

    mapping(uint256 => uint256) public costOfTokens; // id와 가격을 맵핑하는 컨트랙트 딕셔너리

    // 전송 전 후크 함수
    function _beforeTokenTransfer( 
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // 토큰을 연결을 끊는 함수
    function _burn(uint256 tokenId) 
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // 지우면 안되는 함수
    function supportsInterface(bytes4 interfaceId) 
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // id를 매개 변수로 토큰 URI를 구하는 함수
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // 토큰 URI를 매개 변수로 토큰을 발행하는 함수
    function mintToken(string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, _tokenURI);
        akos.push(_tokenURI);
        akos_owners.push(msg.sender);
        akos_price.push(0);
        akos_approved.push(false);

        return newItemId;
    }

    // 토큰 id와 가격을 매개 변수로 토큰 가격을 설정하는 함수
    function sellToken(uint _id, uint _price)
        public
    {
        require(_exists(_id), "token is not exist");
        require(_price>=0, "price should be greater than zero");
        address tokenOwner = ownerOf(_id);
        require(tokenOwner==msg.sender, "you are not token owner");
        require(getApproved(_id)==address(0), "you can not buy"); // 판매 중이 아니어야 한다
        _approve(address(this), _id);
        costOfTokens[_id] = _price;
        akos_price[_id-1]=_price;
        akos_approved[_id-1]=true;
    }

    // 인덱스로 토큰 가격을 출력하는 함수
    function printCost(uint _index) 
        public
        view
        returns (uint)
    {
        return costOfTokens[_index];
    }

    // 토큰 id를 매개 변수로 토큰을 구매하는 함수
    function buyToken(uint _id)
        public
        payable
    {
        require(_exists(_id), "token is not exist");
        require(getApproved(_id)!=address(0), "you can not buy"); // 판매 중 이어야 한다
        require(ownerOf(_id)!=msg.sender, "you are token owner"); // 내 소유가 아니어야 한다
        uint _price = costOfTokens[_id];
        address tokenOwner = ownerOf(_id);
        require(_price*1000000000000000000<=msg.value, "you need more budget"); // 자금이 부족하지 않아야 한다
        
        // gas가 두 번 소비되는 것을 방지하기 위해 call 사용
        (bool paid, ) = tokenOwner.call{gas:0, value: _price*1000000000000000000}("");
        payable(msg.sender).transfer(msg.value - _price*1000000000000000000);
        
        /*
        payable(tokenOwner).transfer(_price*1000000000000000000);
        (bool refunded, ) = msg.sender.call{gas:0, value: msg.value - _price*1000000000000000000}("");
        */
        
        _transfer(tokenOwner, msg.sender, _id); //approved 초기화 포함
        costOfTokens[_id] = 0;
        akos_owners[_id-1]=msg.sender;
        akos_price[_id-1]=0;
        akos_approved[_id-1]=false;
    }

    //토큰 id와 가격을 매개 변수로 판매 중인 토큰의 가격을 수정하는 함수
    function changePrice(uint _id, uint _newPrice)
        public
    {
        require(_exists(_id), "token is not exist");
        require(_newPrice>=0, "new price should be greater than zero");
        address tokenOwner = ownerOf(_id);
        require(tokenOwner==msg.sender, "you are not token owner");
        require(getApproved(_id)!=address(0), "you can not buy"); // 판매 중 이어야 한다
        costOfTokens[_id] = _newPrice;
        akos_price[_id-1]=_newPrice;
    }

    // 토큰 id를 매개 변수로 판매를 취소하는 함수
    function sellCancel(uint _id)
        public
    {
        address tokenOwner = ownerOf(_id);
        require(_exists(_id), "token is not exist");
        require(tokenOwner==msg.sender, "you are not token owner");
        require(getApproved(_id)!=address(0), "you can not buy"); // 판매 중 이어야 한다
        costOfTokens[_id] = 0;
        _approve(address(0), _id);
        akos_price[_id-1]=0;
        akos_approved[_id-1]=false;
    }
}
