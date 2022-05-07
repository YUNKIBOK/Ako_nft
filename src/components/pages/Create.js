import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';

class Create extends Component {

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
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

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
        this.setState({ myipfsHash: response.data.IpfsHash })
        console.log(this.state.myipfsHash)
        //setIPFSHASH(response.data.IpfsHash)

    
        

        console.log('starting')

        // call the keys from .env
        //const API_KEY = '23f6b99091e6b127cc75'
        //const API_SECRET = '35edfd57203a7412d3b35ea5a2db918d720cb4e21d9a3e9e90ce4e41ea22d405'

        // the endpoint needed to upload the file
        const url2 = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
        
        const response2 = await axios.post(
            url2,{
                name: this.state.name,
                description: this.state.description,
                image: 'https://gateway.pinata.cloud/ipfs/' + this.state.myipfsHash
            },
            {
                maxContentLength: "Infinity",
                headers: {
                    //'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET
                }
            }
        )

        console.log(response2)

        // get the hash
        this.setState({ myipfsHash: response2.data.IpfsHash })
        console.log(this.state.myipfsHash)
        //setIPFSHASH(response.data.IpfsHash)

        // get the hash
        
        //setIPFSHASH(response.data.IpfsHash)

    }

    /*async handleJson() {
        console.log('starting')

        // call the keys from .env
        const API_KEY = '23f6b99091e6b127cc75'
        const API_SECRET = '35edfd57203a7412d3b35ea5a2db918d720cb4e21d9a3e9e90ce4e41ea22d405'

        // the endpoint needed to upload the file
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
        
        const response = await axios.post(
            url,
            {
                name: this.state.name,
                description: this.state.description,
                image: this.state.myipfsHash
            },
            {
                maxContentLength: "Infinity",
                headers: {
                    //'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET
                }
            }
        )

        console.log(response)

        // get the hash
        this.setState({ myipfsHash: response.data.IpfsHash })
        console.log(this.state.myipfsHash)
        //setIPFSHASH(response.data.IpfsHash)

        // get the hash
        
        //setIPFSHASH(response.data.IpfsHash)

    }*/

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
            myipfsHash: '',
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <div>
                <h1>create 페이지 입니다.</h1>
                <input type="file" name="file" onChange={(event) => {
                    event.preventDefault()
                    const fobj = event.target.files[0]
                    this.setState({ file: fobj })
                }} />
                <input type="text" name="txtname" onChange={(event) => {
                    event.preventDefault()
                    this.setState({ name: event.target.value })
                }}
                />
                <input type="text" name="description" onChange={(event) => {
                    event.preventDefault()
                    this.setState({ description: event.target.value })
                }}/>

            
            <button onClick={() => {
                this.handleFile()
                //console.log(this.state.name)
                //console.log(this.state.description)
                //this.handleJson()


            }}>Pin</button>
            </div>



        );
    }
}

export default Create;