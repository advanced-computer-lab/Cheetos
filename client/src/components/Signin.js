import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class Signin extends Component {
    fakeLogin(){
        localStorage.setItem('userId', "61ab9713fe61452296d667ca");
    }
    render() {
        return (
            // <div className="signin-form" >
                <Form >
                <Form.Group  controlId="formBasicEmail">
                    
                    <Form.Control size="lg"  type="email" placeholder="Enter email" />
                    <br/>
                    <Form.Text className="text-muted">
                    {/* We'll never share your email with anyone else. */}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control size="lg" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <div className="flex-col">
                   

                     <>
                    <style type="text/css">
                        {`
                        .btn-flat {
                        font-weight:600;
                        background-color: #37A1E2;
                        color: white;
                        width:100%;
                        }
                        .btn-flat:hover {
                            background-color: #2452b6;
                            color: white;
                            width:100%;
                        }

                        `}
                    </style>

                    <Button variant="flat" size="lg" onClick = {()=> this.fakeLogin()}>
                        Log in
                    </Button>
                    </>


                    <a href="#" style={{marginBottom:"10px"}}>Forgotten Password?</a>
                    
                    <div className = "v2"> </div>
                    <Button variant="success" size="lg" style={{marginTop:"10px" , fontWeight:"600"}} type="submit">
                        Create New Account
                    </Button>
                </div>
                </Form>
                // </div>
        )
    }
}
