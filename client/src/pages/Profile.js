import React, { Component } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../style/profile.css';
import EditIcon from '@mui/icons-material/Edit';
import { fontSize } from '@mui/system';
import MyHeader from '../components/MyHeader';
import Trip from '../components/Trip';
import api from '../api'
import { withRouter } from 'react-router';
import Button from "@mui/material/Button";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from 'react-bootstrap/esm/CloseButton';

class Profile extends Component {

  state = {
    editName: false,
    editPassport: false,
    editEmail: false,
    fname: "",
    lname: "",
    email: "",
    passport: "",
    showChangePass:false,
    invalidNewPass:false,
    invalidOldPass:false,
    oldPass:"",
    newPass:"",
    passUpdated:false,
  }
  async componentDidMount() {
    if(!localStorage.getItem('token')){
      this.props.history.push('/');
    }

    this.setState({passUpdated:false})
    const userId  = localStorage.getItem('userId')
    console.log("user id is " , userId) ; 
    await api.getUserInfo(userId).then(user => {
      this.setState({
        fname: user.data.data.FirstName,
        lname: user.data.data.LastName,
        email: user.data.data.Email,
        passport: user.data.data.PassportNumber
      }, () => console.log(user.data.data))
    })

  }

  handleEditName() {

    console.log(this.state.id)
    this.setState(
      {
        editName: !this.state.editName
      }
    )
  }

  handleEditPassport() {

    console.log(this.state.id)
    this.setState(
      {
        editPassport: !this.state.editPassport
      }
    )
  }
  handleEditEmail() {
    console.log(this.state.id)
    this.setState(
      {
        editEmail: !this.state.editEmail
      }
    )
  }

  async handleSave(att) {
    const  userId  = localStorage.getItem('userId')
    console.log(userId,"user")
    const { editName, editPassport, editEmail, fname, lname, email, passport } = this.state;
    const newUser = {
      FirstName: fname,
      LastName: lname,
      Email: email,
      PassportNumber: passport
    }
    await api.updateUserInfo(userId, newUser).then(
      this.setState(
        {
          ...this.state,
          [att]: false
        }
      )
    )

  }

  handleEditChange(e) {
    // e.target byshoof anhi textbox .value => acesses the value getting from change event w7na bn7shrha tb2a bt3t textbox
    const value = e.target.value;
    this.setState({
      //spreading state 
      ...this.state,
      [e.target.name]: value,
    });

   
  }

  changePassModalShow(){
    this.setState({showChangePass : !this.state.showChangePass})
    this.setState({
      oldPass: "",
      newPass: ""
    })
  }

  handleChange(e){
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      //spreading state 
      ...this.state,
      [e.target.name]: value,
    });

    if(e.target.name==="newPass"){
      if((e.target.value).length<5){
        this.setState({invalidNewPass:true});
      }
      else{
        this.setState({invalidNewPass:false});
      }
  }

  if(e.target.name==="oldPass"){
    this.setState({invalidOldPass:false})
  }
  }

  async handleSubmitPass(e){
    e.preventDefault();
    const {oldPass,newPass,invalidOldPass,invalidNewPass} = this.state
    //validate new here wla onChange??
    /* steps :
    post req to backend validate old pass
     if valid store new pass else
     set invalid old pass*/

     const userId  = localStorage.getItem('userId')

     const passwords = {
       "oldPassword" : oldPass,
       "newPassword" : newPass
     }
     await api.updatePassword(userId,passwords).then((res) => {
       if(!invalidNewPass){
         this.setState({passUpdated:true})
        this.changePassModalShow();
        
       }
       console.log("sucessfully changed password")
     }).catch((err)=>{
       if(err.response){


         if(err.response.data.message === "incorrect"){
           this.setState({invalidOldPass : true})
         }
       }
     })
     console.log(oldPass);
     console.log(newPass);
  }

  render() {


    const { editName, editPassport, editEmail, fname, lname, email, passport ,invalidNewPass,invalidOldPass,oldPass,newPass,showChangePass,passUpdated} = this.state;
    return (
      <>
      <div className="flex-col-profile" >

        <MyHeader />

        <div className="flex-row-profile" style={{ marginTop: "25px" }}>

          <div className="profile-container">
            <div className="profile">
              <div className="account-icon"><AccountCircleIcon style={{ color: "#12228F", fontSize: "10rem" }} /></div>
              {
                !editName ?
                  <div className="name">{fname} {lname} <EditIcon className="icon" onClick={this.handleEditName.bind(this)} /></div> :
                  <div className="name">
                    <Form.Control style={{ width: '60%' }} size="sm" name="fname" type="text" placeholder="first name" value={fname} onChange={this.handleEditChange.bind(this)} />
                    <Form.Control style={{ width: '60%' }} size="sm" name="lname" type="text" placeholder="last name" value={lname} onChange={this.handleEditChange.bind(this)} />
                    <p onClick={this.handleSave.bind(this, "editName")} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p>
                  </div>
              }

              <table>
                <div style={{ width: "90%" }}></div>
                <tr style={{ borderBottom: "2px solid black", borderTop: "2px solid black", marginTop: "50px", borderWidth: "90%" }}>
                  <th className="profile-th">Passport Number:</th>
                  {!editPassport ?
                    <>
                      <td className="profile-th">{passport}</td>
                      <td className="profile-th"><EditIcon className="icon" onClick={this.handleEditPassport.bind(this)} /></td>
                    </>
                    :
                    <>
                      <td className="profile-th"><Form.Control style={{ width: '60%' }} size="sm" name="passport" type="text" placeholder="Passport Number" value={passport} onChange={this.handleEditChange.bind(this)} /></td>
                      <td className="profile-th"> <p onClick={this.handleSave.bind(this, "editPassport")} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                    </>
                  }

                </tr>
                <div></div>
                <tr>
                  <th className="profile-th"> Email:</th>
                  {!editEmail ?
                    <>
                      <td className="profile-th">{email}</td>
                      <td className="profile-th"><EditIcon className="icon" onClick={this.handleEditEmail.bind(this)} /></td>
                    </>
                    :
                    <>
                      <td className="profile-th"><Form.Control style={{ width: '60%' }} size="sm" name="email" type="text" placeholder="Email" value={email} onChange={this.handleEditChange.bind(this)} /></td>
                      <td className="profile-th"><p onClick={this.handleSave.bind(this, "editEmail")} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                    </>}

                </tr>
              </table>

             
              <Button variant="contained" style={{marginTop:"20px",width:"100%"}} show={showChangePass} onClick={this.changePassModalShow.bind(this)}>Change password</Button>
            
              {passUpdated? 
              <p className='flex-row' style={{marginTop:"10px",color:"#198754", marginBottom:"0px"}}> Password successfully reset!</p> :
              ""}
              
            </div>
          </div>




        </div>

      </div>



      
      <Modal aria-labelledby="contained-modal-title-vcenter"dialogClassName="my-modal" centered show={showChangePass}  >
                <Modal.Header  >
                    
                        <Modal.Title style={{fontWeight:"600"}}>Change Password</Modal.Title>
                        <CloseButton  onClick={this.changePassModalShow.bind(this)}/>
                    </Modal.Header>
                    <Modal.Body style={{padding:"0",height:"auto"}}>
                <div className="signup-form">
                     <Form hasValidation onSubmit={this.handleSubmitPass.bind(this)}>
                  

                    <Form.Group hasvalidation className="mb-3">
                     
                          
                          <Form.Group className='mb-3' valid>
                                <Form.Control type="password" placeholder="Old Password"  required name="oldPass" value={oldPass} isInvalid={invalidOldPass} onChange={this.handleChange.bind(this)}/>
                                <Form.Control.Feedback type="invalid" >
                                    Password doesn't match old password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" placeholder="New Password"  required name="newPass" value={newPass} isInvalid={invalidNewPass} onChange={this.handleChange.bind(this)}/>
                                <Form.Control.Feedback type="invalid" >
                                    Password must be at least 5 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                    </Form.Group>
                
                    <div className="flex-col">
                
                
                    <Button variant="contained" size="md" style={{marginTop:"10px" , fontWeight:"600",width:"50%"}} type="submit">
                            Change Password
                        </Button>

                   
                    </div>
                    </Form>
                </div>
                        
                </Modal.Body>
            </Modal>

      </>
    )
  }
}

export default withRouter(Profile)