import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


export default class SignUp extends Component {
    state={
        fname:"",
        lname:"",
        email:"",
        phone:"",
        code:"",
        address:"",
        passport:"",
        username:"",
        password:"",
        invalidEmail:false,
        invalidPhone:false,
        invalidPassport:false,
        invalidUsername:false,
        invalidPassword:false,
    }

    

    handleChange(e) {
        const {email,phone,passport,username,password} = this.state;
        e.preventDefault();
        const value = e.target.value;
        this.setState(
          {
            ...this.state,
            [e.target.name]: value
          });


          if(e.target.name==="phone"){
            if((e.target.value).length<11 || !(/^\d+$/.test(value)) ){
              this.setState({invalidPhone:true});
            }
            else{
              this.setState({invalidPhone:false});
            }
        }

        if(e.target.name==="passport"){
            if((e.target.value).length<9 ){
              this.setState({invalidPassport:true});
            }
            else{
              this.setState({invalidPassport:false});
            }
        }

          if(e.target.name==="password"){
              if((e.target.value).length<5){
                this.setState({invalidPassword:true});
              }
              else{
                this.setState({invalidPassword:false});
              }
          }
        
          if(e.target.name==="email"){
            //do a get req if email exists 
            // if(){
            //   this.setState({invalidEmail:true});
            // }
            // else{
            //   this.setState({invalidEmail:false});
            // }
        }
        if(e.target.name==="username"){
            //do a get req if userName exists 
            // if(){
            //   this.setState({invalidUsername:true});
            // }
            //if doesn't exist
            // else{
            //   this.setState({invalidUsername:false});
            // }
        }

          
      }

    handleSubmit(){
        
    }
    render() {
        
        const {fname, lname,email,phone,code,address,passport,username,password,invalidEmail,invalidPassport,invalidPhone,invalidUsername,invalidPassword} = this.state;

//add check for country code exists or no?



        return (

            <Modal aria-labelledby="contained-modal-title-vcenter"dialogClassName="my-modal" centered show={true}  >
                
                <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:"0",height:"auto"}}>
                <div className="signup-form">
                     <Form >
                    <Form.Group className="mb-3">
                        <Row>
                            <Col className=" pe-0" >
                            <Form.Control  type="text" placeholder="First name" name="fname" value={fname} required onChange={this.handleChange.bind(this)}/>
                            </Col>
                            <Col className="ms-0" >
                            <Form.Control  placeholder="Last name" name="lname" value={lname} required onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Control  size="md"  type="email" placeholder="Email" name="email" value={email} required isInvalid={invalidEmail} onChange={this.handleChange.bind(this)}/>
                    <Form.Control.Feedback type="invalid">
                        This email is already registered.
                    </Form.Control.Feedback>
                    </Form.Group>

                  


                    <Form.Control className="mb-3" type="text" placeholder="Home address" name="address" value={address} required onChange={this.handleChange.bind(this)} />

                    <Form.Group className="mb-3">
                        <Row>
                            <Col className=" pe-0">
                            <Form.Control type="text" placeholder="Country code" name="code" value={code} required onChange={this.handleChange.bind(this)}/>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Control  size="md"  type="text" placeholder="Phone number" name="phone" value={phone} required isInvalid={invalidPhone} onChange={this.handleChange.bind(this)}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            </Col>
                        </Row>
                    </Form.Group>
                
                
                
                    <Form.Group className="mb-3" >
                        <Form.Control size="md" type="text" placeholder="Passport number" name="passport" value={passport} required isInvalid={invalidPassport} onChange={this.handleChange.bind(this)}/>
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid passport number.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group hasValidation className="mb-3">
                        <Row>
                            <Col className=" pe-0">

                             <Form.Group>
                                 <Form.Control type="username" placeholder="Username" name="username" value={username} required isInvalid={invalidUsername} onChange={this.handleChange.bind(this)}/>
                                 <Form.Control.Feedback type="invalid" >
                                       Username already exists.
                                    </Form.Control.Feedback>
                             </Form.Group>
                            </Col>
                            <Col>

                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" name="password" value={password} required isInvalid={invalidPassword} onChange={this.handleChange.bind(this)}/>
                                <Form.Control.Feedback type="invalid" >
                                    Password must be at least 5 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                
                    <div className="flex-col">
                
                
                    <Button variant="success" size="md" style={{marginTop:"10px" , fontWeight:"600",width:"50%"}} type="submit" onClick={this.handleSubmit.bind(this)}>
                            Sign Up
                        </Button>
                    </div>
                    </Form>
                </div>
                        
                </Modal.Body>
            </Modal>
        )
    }
}
