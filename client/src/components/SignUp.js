import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'


export default class SignUp extends Component {
    render() {
        return (


            <Modal aria-labelledby="contained-modal-title-vcenter" dialogClassName="my-modal" centered show={true}  >
                <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:"0"}}>
                <div className="signup-form">
                     <Form >
                    <Form.Group className="mb-3">
                        <Row>
                            <Col className=" pe-0" >
                            <Form.Control  type="text" placeholder="First name" required isInvalid />
                            </Col>
                            <Col className="ms-0" >
                            <Form.Control  placeholder="Last name" required isValid/>
                            </Col>
                        </Row>
                    </Form.Group>
                
                    <Form.Control className="mb-3" size="md"  type="email" placeholder="Email" required />
                    <Form.Control className="mb-3" size="md"  type="text" placeholder="Phone number" />
                    <Form.Group className="mb-3">
                        <Row>
                            <Col className=" pe-0">
                            <Form.Control type="text" placeholder="Country code" required isInvalid />
                            </Col>
                            <Col>
                            <Form.Control type="text" placeholder="Home address" required isInvalid={false} />
                            </Col>
                        </Row>
                    </Form.Group>
                
                
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control size="md" type="text" placeholder="Passport number" />
                    </Form.Group>
                
                    <div className="flex-col">
                
                
                        <Button variant="success" size="md" style={{marginTop:"10px" , fontWeight:"600",width:"50%"}} type="submit">
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
