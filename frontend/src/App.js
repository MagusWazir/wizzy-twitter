import logo from './houselogo.svg';
import { ethers } from "ethers";
import Button from '@mui/material/Button';
import './App.css';
import React, {useEffect, useState} from 'react';



const provider = new ethers.providers.Web3Provider(window.ethereum);

const WIZARD_CONTRACT = "0x521f9C7505005CFA19A8E5786a9c3c9c9F5e6f42"
const WIZARD_ABI = ["function balanceOf(address owner) view returns (uint balance)"]

const onClick = async () => {
  console.log(provider)
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
}

const isConnected = () => {
  console.log(provider)
  if(provider !== undefined){
    return true
  }
  return false
}

const signMessage = async () => {
  const signer = provider.getSigner()

  const contract_object = new ethers.Contract(WIZARD_CONTRACT, WIZARD_ABI, provider)
  console.log(parseInt(await contract_object.balanceOf(signer.getAddress())))
  
  //const signature = await signer.signMessage("Hello World");
}



function App() {

  const [isLoaded, setIsLoaded] = useState(null)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState("Loading...");

  useEffect(() =>{
    fetch("http://127.0.0.1:2020/")
    .then(res=>res.json())
      .then((result) => {
        setResponse(result)
        setIsLoaded(true)
      }, (error) =>{
        setIsLoaded(true)
        setError(error)
      }
      )
  }, []);

  if(error){
    return <div>Error: { error.message }</div>;
  }
  if(isLoaded) {
    console.log(response)
    return <div>Loaded: {response.message}</div>;
  } else{}

  return (
    <div className="App">
      <header className="Center">
        <img src={logo} className="App-logo" alt="logo" />
        {isConnected() === false && 
        <p>
          Connect your wallet
          <Button variant="contained" size="large" onClick={onClick} >Connect wallet</Button>
        </p>}
        {isConnected() === true && 
        <p>
          Sign a hello
          <Button variant="contained" size="large" onClick={signMessage} >Sign some stuff</Button>
        </p>}

      </header>
    </div>
  );
}

export default App;
