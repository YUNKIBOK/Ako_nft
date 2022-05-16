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
import Detail from './pages/Detail'
import MyCollection from './managePages/MyCollection';
import OnMarket from './managePages/OnMarket';

class App extends Component {

  // App 마운트 시 무조건 실행하는 함수
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.callLikes()
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

  createRow() {
    fetch("http://localhost:3001/mint", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
      });
  };


  mint = (uri) => {
    this.state.contract.methods.mintToken(uri).send({ from: this.state.account })
    .on('confirmation', function(confNumber, receipt){
      this.createRow();
      window.location.replace("/Create")
        /*this.setState({
          akos: [...this.state.akos, uri]
        })*/
      })
  }

  sell = (id, price) => {
    this.state.contract.methods.sellToken(id, price).send({ from: this.state.account })
    .on('confirmation', function(confNumber, receipt){
      window.location.replace("/Manage/OnMarket")
        /*this.setState({
          prices: [...this.state.prices.slice(0, id), price, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), true, ...this.state.approved.slice(id + 1, this.state.totalSupply)]
        })*/
      })
  }

  buy = (id) => {
    this.state.contract.methods.buyToken(id).send({ from: this.state.account , value: parseInt(this.state.prices[id-1])*1000000000000000000})
    .on('confirmation', function(confNumber, receipt){
      window.location.replace("/Manage/MyCollection")
        /*this.setState({
          prices: [...this.state.prices.slice(0, id), 0, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), false, ...this.state.approved.slice(id + 1, this.state.totalSupply)],
          owners: [...this.state.owners.slice(0, id), this.state.account, ...this.state.owners.slice(id + 1, this.state.totalSupply)]
        })*/
      })
  }

  changePrice = (id, newPrice) => {
    this.state.contract.methods.changePrice(id, newPrice).send({ from: this.state.account })
    .on('confirmation', function(confNumber, receipt){
      window.location.replace("/Manage/OnMarket")
        /*this.setState({
          prices: [...this.state.prices.slice(0, id), newPrice, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
        })*/
      })
  }

  sellCancel = (id) => {
    this.state.contract.methods.sellCancel(id).send({ from: this.state.account })
    .on('confirmation', function(confNumber, receipt){
      window.location.replace("/Manage/OnMarket")
        /*this.setState({
          prices: [...this.state.prices.slice(0, id), 0, ...this.state.prices.slice(id + 1, this.state.totalSupply)],
          approved: [...this.state.approved.slice(0, id), false, ...this.state.approved.slice(id + 1, this.state.totalSupply)]
        })*/
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
      images: [],
      id: 0,
      price: 0,
      likes: []
    }
  }

  idUpdate = (key) => {
    this.setState({
      id: key
    });
  };

  priceUpdate= (key) => {
    this.setState({
      price: parseInt(this.state.prices[key]._hex, 16)
    });
  };

  likesUpdate=(value) => {
    this.setState({likes: [...this.state.likes, value]});
  }

  async callLikes() {
    /*const post = {
      totalSupply: parseInt(this.state.totalSupply._hex, 16),
    };
    fetch("http://localhost:3001/delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
      });

      fetch("http://localhost:3001/set", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((json) => {
        });*/

    console.log('callLikes 시작');
    for (var j = 1; j <= this.state.totalSupply; j++) {
      await this.callLike(j);
    }
    console.log(this.state.likes)
  }

  async callLike(tokenId) {
      const post = {
        id: tokenId,
      };
      await fetch("http://localhost:3001/likes", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          this.likesUpdate(json.likes)
        });
    };



  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header account={this.state.account}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Detail" element={<Detail account={this.state.account} owners={this.state.owners} approved={this.state.approved} sell={this.sell}  changePrice={this.changePrice} sellCancel={this.sellCancel} akos={this.state.akos} buy={this.buy} likes={this.state.likes} id={this.state.id} names={this.state.names} images={this.state.images} descriptions={this.state.descriptions} price={this.state.price}/>}></Route>
            <Route path="/Market" element={<Market likes={this.state.likes} priceUpdate={this.priceUpdate} idUpdate={this.idUpdate} names={this.state.names} images={this.state.images} approved={this.state.approved} id={this.state.id}/>}></Route>
            <Route path="/Manage" element={<Manage names={this.state.names} images={this.state.images} approved={this.state.approved} account={this.state.account} owners={this.state.owners}/>}>
              <Route path="MyCollection" element={<MyCollection likes={this.state.likes} priceUpdate={this.priceUpdate} idUpdate={this.idUpdate} names={this.state.names} images={this.state.images} approved={this.state.approved} account={this.state.account} owners={this.state.owners}/>}></Route>
              <Route path="OnMarket" element={<OnMarket likes={this.state.likes} priceUpdate={this.priceUpdate} idUpdate={this.idUpdate} names={this.state.names} images={this.state.images} approved={this.state.approved} account={this.state.account} owners={this.state.owners}/>}></Route>
            </Route>
            <Route path="/Create" element={<Create mint={this.mint} sell={this.sell}  changePrice={this.changePrice} sellCancel={this.sellCancel} akos={this.state.akos} />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;