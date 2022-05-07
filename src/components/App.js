import React, { Component } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Web3 from 'web3'
import './App.css';
import Ako from '../abis/Ako.json'
import axios from 'axios';
import FormData from 'form-data';

import Header from './Header';
import Home from './Home'
import Footer from './Footer'
import Market from './pages/Market'
import Manage from './pages/Manage'
import Create from './pages/Create'

class App extends Component {
 
  async handleFile() {
    console.log('starting')

    // initialize the form data
    const formData = new FormData()

    // append the file form data to 
    formData.append('file', this.state.file)

    //formData value 확인
    for (var value of formData.values()) {
      console.log(value);
    }

    // call the keys from .env
    const API_KEY = '23f6b99091e6b127cc75'
    const API_SECRET = '35edfd57203a7412d3b35ea5a2db918d720cb4e21d9a3e9e90ce4e41ea22d405'

    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET
          }
      }
  )

  console.log(response)

  // get the hash
  this.setState({myipfsHash: response.data.IpfsHash})
  //setIPFSHASH(response.data.IpfsHash)
  
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

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

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Ako.networks[networkId]
    if(networkData) {
      const abi = Ako.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Akos
      for (var i = 1; i <= totalSupply; i++) {
        const ako = await contract.methods.akos(i - 1).call()
        this.setState({
          akos: [...this.state.akos, ako]
        })
      }
      console.log(this.state.akos)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (ako) => {
    this.state.contract.methods.mint(ako).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        akos: [...this.state.akos, ako]
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
      file: null,
      myipfsHash: ''
    }
  }

  render() {
    return(
      <div className='App'>
        <BrowserRouter>
          <Header />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/Market" element={<Market />}></Route>
                <Route path="/Manage" element={<Manage />}></Route>
                <Route path="/Create" element={<Create />}></Route>
              </Routes>
            <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
/*
const App=()=>{




  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ako Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.state.account}</span></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>




              <input type="file" name="file" onChange={(event)=> {
                event.preventDefault()
                const fobj=event.target.files[0]
                this.setState({ file: fobj })}}/>
              <button onClick={()=>this.handleFile()}>Pin</button>




              <form onSubmit={(event) => {
                event.preventDefault()
                const ako = this.ako.value
                this.mint(ako)
              }}>
                <input
                  type='text'
                  className='form-control mb-1'
                  placeholder='e.g. #FFFFFF'
                  ref={(input) => { this.ako = input }}
                />
                <input
                  type='submit'
                  className='btn btn-block btn-primary'
                  value='MINT'
                />
              </form>
            </div>
          </main>
        </div>
        <hr/>
        <div className="row text-center">
          { this.state.akos.map((ako, key) => {
            return(
              <div key={key} className="col-md-3 mb-3">
                <div className="token" style={{ backgroundColor: ako }}></div>
                <div>{ako}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;*/