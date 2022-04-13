import React, { useContext, useState } from "react";
import { Button } from 'react-bootstrap'; 
import { getContract } from "../ContractCall/DcsContractCall";
import { AuthContext } from "../../App";


function Register(props){
    const context = useContext(AuthContext);
    const [userWalletAddress] = context;
    async function registerCall(){
        console.log(userWalletAddress);
        let contractInstance = await getContract();
        await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
        let balance = await contractInstance.balanceOf(userWalletAddress);
        const amountOfToken = balance.toString();
        await props.setdcstoken(amountOfToken/(10 ** 18));
    }
    return(
        <>
            <Button className="buttons" variant="primary" onClick={registerCall}>
                Register
            </Button> 
        </>
    );

}


export default Register;