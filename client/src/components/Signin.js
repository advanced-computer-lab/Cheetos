import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class Signin extends Component {
    state={
        invalidUserName:false,
        invalidPassword:false,
        userName:"",
        password:"",
    }
    fakeLogin(){
        localStorage.setItem('userId', "61ab9713fe61452296d667ca");
    }
    render() {
        const {invalidUserName,invalidPassword,userName,password} = this.state
        return (
            // <div className="signin-form" >
                <Form >
                <Form.Group className="mb-3">
                    <Form.Control size="lg"  type="text" name="userName" value={userName} isInvalid={invalidUserName} placeholder="Enter Username" />
                    <Form.Control.Feedback type="invalid" >
                        Username does not exist.
                     </Form.Control.Feedback>
            
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control size="lg" type="password" name="password" value={password} isInvalid={invalidPassword} placeholder="Password" />
                    <Form.Control.Feedback type="invalid" >
                        Incorrect Password.
                     </Form.Control.Feedback>
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


                    {/* <a href="#" style={{marginBottom:"10px"}}>Forgotten Password?</a> */}
                    
                    <div className = "v2"> </div>
                    <Button variant="success" size="lg" style={{marginTop:"10px" , fontWeight:"600"}} type="submit">
                        Create New Account
                    </Button>
                </div>
                </Form>
                
        )
    }
}
