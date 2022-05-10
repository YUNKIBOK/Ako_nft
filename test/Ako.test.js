const { assert } = require('chai')

//Ako.sol이 있는지 확인
const Ako = artifacts.require('./Ako.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

//Ako 컨트랙트 생성
contract('Ako', (accounts) => {
  let contract // 컨트랙트 객체를 저장하는 변수
  let address // 컨트랙트 주소를 저장하는 변수

  before(async () => {
    contract = await Ako.deployed() // 배포하고 기다린다
  })

  // 배포 테스트
  describe('deployment test', async () => {

    it('deploys successfully', async () => {
      address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'A-KO')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'AKO')
    })

  })

  // 민팅 테스트
  describe('minting test', async () => {

    it('creates a new token', async () => {
      const result = await contract.mintToken('dongguk')
    })

    it('plus total supply', async () => {
      const totalSupply = await contract.totalSupply()
      assert.equal(totalSupply, 1)
    })

    it('plus blance', async () => {
      const balance = await contract.balanceOf(accounts[0])
      assert.equal(balance, 1)
    })

    it('is not approved yet', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, 0)
    })

    it('is owner right', async () => {
      const owner = await contract.ownerOf(1)
      assert.equal(owner, accounts[0])
    })

    it('is token URI right', async () => {
      const uri = await contract.tokenURI(1)
      assert.equal(uri, 'dongguk')
    })

    it('is price 0', async () => {
      const price = await contract.printCost(1)
      assert.equal(price, 0)
    })

  })

  // 판매 테스트
  describe('selling test', async () => {

    it('sells the token', async () => {
      const result = await contract.sellToken(1, 10)
    })

    it('is approved', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, address)
    })

    it('is price right', async () => {
      const price = await contract.printCost(1)
      assert.equal(price, 10)
    })

  })

  // 판매 취소 테스트
  describe('cancel selling test', async () => {

    it('cancel selling the token', async () => {
      const result = await contract.sellCancel(1)
    })

    it('is not approved again', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, 0)
    })

    it('is price cleared', async () => {
      const price = await contract.printCost(1)
      assert.equal(price, 0)
    })

  })

  // 재판매 테스트
  describe('selling test', async () => {

    it('sells the token', async () => {
      const result = await contract.sellToken(1, 10)
    })

    it('is approved', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, address)
    })

    it('is price right', async () => {
      const price = await contract.printCost(1)
      assert.equal(price, 10)
    })

  })

  // 판매 가격 수정 테스트
  describe('changing price of the token token', async () => {

    it('change price', async () => {
      const result = await contract.changePrice(1, 5)
    })

    it('is price changed', async () => {
      const changedPrice = await contract.printCost(1)
      assert.equal(changedPrice, 5)
    })

  })

  // 구매 테스트
  describe('buying the token test', async () => {

    it('the other buy the token', async () => {
      const result = await contract.buyToken(1, {from: accounts[1], value: 5*1000000000000000000})
    })

    it('is owner changed', async () => {
      const owner = await contract.ownerOf(1)
      assert.equal(owner, accounts[1])
    })

    it("minus seller's balance", async () => {
      const balance1 = await contract.balanceOf(accounts[0])
      assert.equal(balance1, 0)
    })

    it("plus buyer's balance", async () => {
      const balance2 = await contract.balanceOf(accounts[1])
      assert.equal(balance2, 1)
    })

    it('is approved cleared', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, 0)
    })

    it('is price clear', async () => {
      const price = await contract.printCost(1)
      assert.equal(price, 0)
    })

  })

})