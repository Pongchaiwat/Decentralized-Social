import React, { useState, useContext } from 'react'
import {Button} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'
import { useWeb3React } from '@web3-react/core';
import Register from '../../components/Register/Register';

function Navbar() {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [usernameModalShow, setUsernameModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);
  const [dcsToken, setDcsToken] = useState();
	const web3reactContext = useWeb3React();
 
  return (
    <div className='navBar'>
      <img src="/assets/logo.png" alt="" />
      <div className="appName">
        <h1>Decentralized Social</h1>
      </div>
      <div className='buttonContainer'>
        <Button className="buttons" variant="primary" onClick={() => setUsernameModalShow(true)}>
          Change username
        </Button>
        <UserNameInfo
          show={usernameModalShow}
          onHide={() => setUsernameModalShow(false)}
        />
        <Button className="buttons" variant="primary" onClick={() => setAddPostModalShow(true)}>
          Make a Post
        </Button>
        <AddPostComponent
          userwalletaddress={userWalletAddress}
          show={addPostModalShow}
          onHide={() => setAddPostModalShow(false)}
        />
        <Register setdcstoken={setDcsToken}/>
        </div>
        <div className="amountOfToken"> {dcsToken} DCS </div>
    </div>
  )
}

export default Navbar