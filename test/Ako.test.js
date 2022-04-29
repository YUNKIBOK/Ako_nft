const { assert } = require('chai')

const Ako = artifacts.require('./Ako.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Ako', (accounts) => {
  let contract
  let address

  before(async () => {
    contract = await Ako.deployed()
  })

  describe('deployment', async () => {

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

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mintToken('dongguk')
    })

    it('total supply plused', async () => {
      const totalSupply = await contract.totalSupply()
      assert.equal(totalSupply, 1)
    })

    it('blance plused', async () => {
      const balance = await contract.balanceOf(accounts[0])
      assert.equal(balance, 1)
    })

    it('is not approved', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, 0)
    })

    it('owner check', async () => {
      const owner = await contract.ownerOf(1)
      assert.equal(owner, accounts[0])
    })

    it('token uri check', async () => {
      const uri = await contract.tokenURI(1)
      assert.equal(uri, 'dongguk')
    })

  })

  describe('selling', async () => {

    it('sells the token', async () => {
      const result = await contract.sellToken(1, 10)
    })

    it('is approved', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, address)
    })

  })

  describe('buying', async () => {

    it('buy the token', async () => {
      const result = await contract.buyToken(1, {from: accounts[1], value: 20*1000000000000000000})
    })

    it('balance check', async () => {
      const balance1 = await contract.balanceOf(accounts[0])
      assert.equal(balance1, 0)
      const balance2 = await contract.balanceOf(accounts[1])
      assert.equal(balance2, 1)
    })

    it('is not approved', async () => {
      const approved = await contract.getApproved(1)
      assert.equal(approved, 0)
    })

    it('owner changed', async () => {
      const owner = await contract.ownerOf(1)
      assert.equal(owner, accounts[1])
    })

  })

})