import React, { Component } from 'react';
import Dvdo from '../abis/Dvdo.json'  // abi file for the contract
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // default by Ethereum
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
    // get accounts
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)  // current connected account
    this.setState({ account: accounts[0] })  // set first account as main account

    // get network id
    const networkId = await web3.eth.net.getId()  // returns ID that user is connected to
    console.log(networkId)  // returns 1 for mainnet, 3 for ropsten, 4 for rinkeby, 5 for goerli, 42 for kovan
    const networkData = Dvdo.networks[networkId]  // get network data from abi file

    // if network data exists
    if (networkData) {
      const dvideo = new web3.eth.Contract(Dvdo.abi, networkData.address)  // (abi, address)
      this.setState({ dvideo })  // set dvideo contract to state

      // get videos count
      const videosCount = await dvideo.methods.videoCount().call()
      this.setState({ videosCount })

      // load videos, sort by newest first
      for (var i = videosCount; i >= 1; i--) {
        const video = await dvideo.methods.videos(i).call()  // get video data
        this.setState({ videos: [...this.state.videos, video] })  // add video to state
      }

      // see latest video with title to view as default
      const latestVideo = await dvideo.methods.videos(videosCount).call()  // get latest video data
      this.setState({ currentHash: latestVideo.hash, currentTitle: latestVideo.title })
      this.setState({ loading: false })  // stop loading

    } else {
      window.alert('Contract has not been deployed to detected network.')
    }

    //Check videoAmounts
    //Add videAmounts to the state

    //Iterate throught videos and add them to the state (by newest)


    //Set latest video and it's title to view as default 
    //Set loading state to false

    //If network data doesn't exists, log error
  }

  // convert file to buffer to be uploaded on IPFS
  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]  // capture file
    const reader = new window.FileReader()  // create reader
    reader.readAsArrayBuffer(file)  // read file

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })  // set buffer to file
      console.log('buffer', this.state.buffer)  // log buffer
    }
  }


  //Upload video
  uploadVideo = title => {
    console.log("submitting to IPFS...")

    // adding file to IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Result: ", result)
      if (error) {
        console.error(error)
        return
      }
      this.setState({ loading: true })  // upload to blockchain
      this.state.dvideo.methods.uploadVideo(result[0].hash, title).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })  // stop loading
      })
    })  // (file, callback)

  }

  //Change Video
  changeVideo = (hash, title) => {
    // change playing video when clicked
    this.setState({ 'currentHash': hash })
    this.setState({ 'currentTitle': title })
  }

  constructor(props) {
    super(props)
    // default values
    this.state = {
      loading: false,
      account: '',
      dvideo: null,
      videos: [],
      // loading: true,
      currentHash: null,
      currentTitle: null
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar
          account={this.state.account}  // display connected account hash
        />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            videos={this.state.videos}
            uploadVideo={this.uploadVideo}
            captureFile={this.captureFile}
            changeVideo={this.changeVideo}
            currentHash={this.state.currentHash}
            currentTitle={this.state.currentTitle}
          />
        }
      </div>
    );
  }
}

export default App;