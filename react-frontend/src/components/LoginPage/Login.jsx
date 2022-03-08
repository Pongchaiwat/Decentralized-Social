import React from 'react'
import './login.scss';
import { ethers } from 'ethers';
import anemonethJSON from '../../utils/anemoneth.json'

function Login() {

const anemonethProxyAddress = "0x25a0C89a55dfF4b779bde0DDa7897F6Ef06e6565";
// const anemonethImpAddress = "0x4a391779abcc217c3beab96a639934116069b830";

const [address, setAddress] = React.useState("");
const [balance, setBalance] = React.useState(0);
// const [nemBalance, setNemBalance] = React.useState(0);

const { ethereum } = window;
let provider;

if(ethereum) {
  ethereum.request({ method: 'eth_requestAccounts'});
  provider = new ethers.providers.Web3Provider(ethereum);
  getUserDetails();
} else {
  console.log("Metamask not found. Pleast install MetaMask!")
}

async function getUserDetails() {
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  const userBalance = await provider.getBalance(addr);
  setAddress(addr);
  setBalance(ethers.utils.formatEther(userBalance));
}

async function callRegister() {
  let regAmt = parseInt(document.querySelector('.regAmt').value);
  const username = document.querySelector('.usrnm').value;
  console.log(`register amount is: ${regAmt}. Username is: ${username}`);
  console.log(typeof(regAmt))
  console.log(typeof(username))
  if (regAmt >= .000000001 ) {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(anemonethProxyAddress, anemonethJSON.abi, signer);

    // const overrides = {
    //   value: regAmt,
    //   gasLimit: 230000 
    // };

    await contractInstance.register(username, { value: regAmt, gasLimit: 125000 });
  } else console.log("Increase msg.value")
}
  return (
    <div className='loginpage'>
      <div className='title'>
        Anemoneth
      </div>
      <div className='userinfo'>
          <b>Your address:</b> {address}
          <b>Your balance:</b> {balance}
      </div>
      <div className='registercall'>
        <p>Must send .000000001 or more ether (1000000000 wei) to be able to register </p>
        <label htmlFor='msgValue'>Amount in wei:   </label>
        <input type="number" className='msgValue' placeholder='Amount'></input>
        <label htmlFor='usrnm'> Username: (cannot be changed) </label>
        <input type="text" className='usrnm' placeholder='username'></input>
        <button className='registerBtn' onClick={callRegister}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Login