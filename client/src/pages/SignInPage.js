import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Signin from '../components/Signin';
// import Button from "@mui/material/Button";
import Logo from "../components/Logo"

export default class SignInPage extends Component {
    render() {
        return (
            <div className ="signin-page" >
                <div className="signin-logo"><Logo/> <p>Boomerang can help you<br/> find your ideal flight !</p></div>
               <div className="signin-form"><Signin/></div>
            </div>
        )
    }
}
