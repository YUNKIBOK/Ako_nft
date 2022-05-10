import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3'
import './App.css';
import Ako from '../abis/Ako.json'

import Header from './Header';
import Home from './Home'
import Footer from './Footer'
import Market from './pages/Market'
import Manage from './pages/Manage'
import Create from './pages/Create'

class App extends Component {

  // App 마운트 시 무조건 실행하는 함수
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // web3를 로드하는 함수
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async getJSON(url) {
    const response = await fetch(url);
    return response.json(); // get JSON from the response 
  }

  // blockchain data를 로드하는 함수
  async loadBlockchainData() {
    const web3 = window.web3

    // 계정을 가져오고 세팅한다
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(this.state.account)

    const networkId = await web3.eth.net.getId()
    const networkData = Ako.networks[networkId]
    if (networkData) {
      const abi = Ako.abi
      const address = networkData.address
      console.log(address)

      // 컨트랙트를 가져오고 세팅한다
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract: contract })
      console.log(this.state.contract)

      // 전체 토큰 수를 가져오고 세팅한다
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply: totalSupply })
      console.log(this.state.totalSupply)

      // 전체 토큰의 id와 URI를 프론트 단에서 배열화한다
      for (var j = 1; j <= totalSupply; j++) {
        const ako = await contract.methods.akos(j - 1).call()
        const price = await contract.methods.akos_price(j - 1).call()
        const approved = await contract.methods.akos_approved(j - 1).call()
        const owner = await contract.methods.akos_owners(j - 1).call()
        this.setState({
          akos: [...this.state.akos, ako],
          prices: [...this.state.prices, price],
          approved: [...this.state.approved, approved],
          owners: [...this.state.owners, owner],
        })
      }
      console.log(this.state.akos)
      console.log(this.state.prices)
      console.log(this.state.approved)
      console.log(this.state.owners)

      for (var i = 0; i < totalSupply; i++) {
        console.log("Fetching JSON data...");
        await this.getJSON(this.state.akos[i])
          .then(data => {
            console.log(data)
            this.setState({
              names: [...this.state.names, data["name"]],
              descriptions: [...this.state.descriptions, data["description"]],
              images: [...this.state.images, data["image"]]
            })
          });
      }
      console.log(this.state.names)
      console.log(this.state.descriptions)
      console.log(this.state.images)

    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (uri) => {
    this.state.contract.methods.mintToken(uri).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          akos: [...this.state.akos, uri]
        })
      })
  }

  sell = (id, price) => {
    this.state.contract.methods.sellToken(id, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          prices: [...this.state.prices.slice(0, id), price, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), true, ...this.state.approved.slice(id + 1, this.state.totalSupply)]
        })
      })
  }

  buy = (id) => {
    this.state.contract.methods.buyToken(id).send({ from: this.state.account , value: parseInt(this.state.prices[id-1])*1000000000000000000})
      .once('receipt', (receipt) => {
        this.setState({
          prices: [...this.state.prices.slice(0, id), 0, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), false, ...this.state.approved.slice(id + 1, this.state.totalSupply)],
          owners: [...this.state.owners.slice(0, id), this.state.account, ...this.state.owners.slice(id + 1, this.state.totalSupply)]
        })
      })
  }

  changePrice = (id, newPrice) => {
    this.state.contract.methods.changePrice(id, newPrice).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          prices: [...this.state.prices.slice(0, id), newPrice, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
        })
      })
  }

  sellCancel = (id) => {
    this.state.contract.methods.sellCancel(id).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          prices: [...this.state.prices.slice(0, id), 0, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), false, ...this.state.approved.slice(id + 1, this.state.totalSupply)]
        })
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      akos: [],
      prices: [],
      approved: [],
      owners: [],
      names: [],
      descriptions: [],
      images: []
    }
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Market" element={<Market names={this.state.names} images={this.state.images} approved={this.state.approved}/>}></Route>
            <Route path="/Manage" element={<Manage names={this.state.names} images={this.state.images} approved={this.state.approved} account={this.state.account} owners={this.state.owners}/>}></Route>
            <Route path="/Create" element={<Create mint={this.mint} sell={this.sell} buy={this.buy} changePrice={this.changePrice} sellCancel={this.sellCancel} akos={this.state.akos} />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;