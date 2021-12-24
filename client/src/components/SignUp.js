import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/esm/CloseButton';
import api from '../api'


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    state = {
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
        dataValid: true,
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
            if((e.target.value).length!=11 || !(/^\d+$/.test(value)) ){
              this.setState({invalidPhone:true});
            }
            else{
              this.setState({invalidPhone:false});
            }
        }

        if(e.target.name==="passport"){
            if((e.target.value).length!=10 ){
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
              this.setState({invalidEmail:false})
          }
          if(e.target.name==="username"){
            this.setState({invalidEmail:false})
        }
     
      }

      async handleEmailValidation(e){
        e.preventDefault();
        const value = e.target.value;
        this.setState(
          {
               email : value
          });
          await api.validateEmail({Email:this.state.email})
          .then((res) => {
              this.setState({invalidEmail:res.data.invalidEmail})
              console.log(res.data,"res email")
          },() => console.log(this.state.invalidEmail,"email"))
      }

     async handleUsernameValidation(e){
        e.preventDefault();
        const value = e.target.value;
        this.setState(
          {
               username : value
          });

          await api.validateUsername({UserName:this.state.username})
          .then((res) => {
              this.setState({invalidUsername:res.data.invalidUsername})
              console.log(res.data,"res")
          },() => console.log(this.state.invalidUsername,"username"))
      }

     async handleSubmit(e){

        e.preventDefault();
       
        const {fname, lname,email,phone,code,address,passport,username,password,invalidEmail,invalidPassport,invalidPhone,invalidUsername,invalidPassword} = this.state;
        

        console.log(username,password,fname,lname,email,phone,passport,address,code);

        const newUser = {
           "UserName" : username,
           "Password": password,
           "FirstName" : fname,
           "LastName" : lname,
           "Email" : email,
           "TelephoneNumber" : phone,
           "PassportNumber" : passport,
           "HomeAddress" : address,
           "CountryCode" : code,
        }

        console.log(newUser,"hehe");

        if(!(invalidPassport || invalidPassword || invalidPhone) ) {

            await api.registerUser(newUser).then((res) => {

                this.setState({
                    invalidEmail : res.data.invalidEmail,
                    invalidUsername : res.data.invalidUsername
                },()=> console.log("email",res.data.invalidEmail,"username",res.data.invalidUsername))

                if(!(invalidEmail || invalidPassport)){
                    console.log("this is data ",res.data.data)
                    this.props.closeModal(false);
                    this.setState({
                        fname:"",
                        lname:"",
                        email:"",
                        phone:"",
                        code:"",
                        address:"",
                        passport:"",
                        username:"",
                        password:"",
                        invalidEmail : false,
                        invalidPassport : false,
                        invalidPassword : false,
                        invalidPhone : false,
                        invalidUsername : false ,
                })
                }

            
            }).catch((err) => {
               if(err.response){
                   console.log(err.response.data);
                   if(err.response.data.message==="invalid"){
                       this.setState({invalidEmail:true,invalidUsername:true})
                   }
                   else if(err.response.data.message==="invalid email"){
                       this.setState({invalidEmail:true})
                   }
                   else if(err.response.data.message==="invalid username"){
                       this.setState({invalidUsername:true})
                   }
               }
            })

        }

       

     

        /*steps : async await post to backend send all data , return if invalid email or username
        if invalid email set invalidEmail = true , if invalidUsername set invalidUserName = true
         else store data fl backend if successful registration
        if successful route to login or close modal*/

        
        //if succefsul
        
    }
    clear(){
        const{closeModal} = this.props;
        const {fname, lname,email,phone,code,address,passport,username,password,invalidEmail,invalidPassport,invalidPhone,invalidUsername,invalidPassword} = this.state;
        this.setState({
            fname:"",
            lname:"",
            email:"",
            phone:"",
            code:"",
            address:"",
            passport:"",
            username:"",
            password:"",
            invalidEmail : false,
            invalidPassport : false,
            invalidPassword : false,
            invalidPhone : false,
            invalidUsername : false ,
        },() => closeModal(false))
    }


    render() {
        
        const {fname, lname,email,phone,code,address,passport,username,password,invalidEmail,invalidPassport,invalidPhone,invalidUsername,invalidPassword} = this.state;
        const {show,closeModal} = this.props;

        return (

            <Modal aria-labelledby="contained-modal-title-vcenter"dialogClassName="my-modal" centered show={show} onSubmit={this.handleSubmit} >
                <Modal.Header  >
                    
                        <Modal.Title style={{fontWeight:"600"}}>Sign Up</Modal.Title>
                        <CloseButton  onClick = {this.clear.bind(this)}/>
                    </Modal.Header>
                    <Modal.Body style={{padding:"0",height:"auto"}}>
                <div className="signup-form">
                     <Form hasValidation onSubmit = {(e) => this.handleSubmit(e)}>
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
                
                
                    <Button variant="success" size="md" style={{marginTop:"10px" , fontWeight:"600",width:"50%"}} type="submit" >
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
