import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Button from "@mui/material/Button";
import Logo from "../components/Logo"

export default class SignIn extends Component {
    render() {
        return (
            <div className ="signin-page" >
                <div className="signin-logo"><Logo/> <p>Boomerang can help you<br/> find your ideal flight !</p></div>
                <div className="signin-form" >
                <Form >
                <Form.Group  controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <div className="flex-col">
                    <Button variant="primary" style={{width:"100%"}} type="submit">
                        log in
                    </Button>
                    <div className = "v2"> </div>
                    <Button variant="success" type="submit">
                        Create a new Account
                    </Button>
                </div>
                </Form>
                </div>
            </div>
        )
    }
}
