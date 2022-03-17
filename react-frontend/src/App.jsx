import './App.scss';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Homepage from './components/Homepage/Homepage';
// import Login from './components/Login/Login'
// import Navbar from './components/Navbar/Navbar';

export const AuthContext = createContext();

function App() {
  const [userWalletAddress, setUserWalletAddress] = useState(localStorage.getItem("address"));

  useEffect(() => {
    console.log(userWalletAddress)
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(`address changed! ${accounts[0]}`);
        localStorage.setItem("address", accounts[0]);
      })
    }
  });

  return (
    <>
      {/* <Navbar clwnblnc={clwnblnc} dispAddr={dispAddr} username={username} connected={connected} /> */}
      <AuthContext.Provider value={[userWalletAddress, setUserWalletAddress]}>
        <Router>
          <Routes>
            <Route path="/" element = { (userWalletAddress !== "null") && (userWalletAddress !== null) ? 
              <Homepage /> : 
              <LoginPage />}
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;