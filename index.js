import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

const retrieveButton = document.getElementById("retrieveButton")
retrieveButton.onclick = retrieve

const favnum = document.getElementById("favnum").value

const storeButton = document.getElementById("storeButton")
storeButton.onclick = store

async function connect() {
  try {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      connectButton.innerHTML = "Connected"
    } else {
      connectButton.innerHTML = "Please Install Metamask"
    }
  } catch (err) {
    console.log("Could not connect :(")
  }
}

async function store() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const tx = await contract.store()
    } catch (err) {
      console.log(err)
    }
  }
}

async function retrieve() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const simplestorage = new ethers.Contract(contractAddress, abi, signer)
  const num = await simplestorage.retrieve()
  retrieveButton.innerHTML = num
}
