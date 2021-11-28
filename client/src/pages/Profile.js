import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../style/profile.css';
import EditIcon from '@mui/icons-material/Edit';
import { fontSize } from '@mui/system';
import MyHeader from '../components/MyHeader';
import Trip from '../components/Trip';

export default class Profile extends Component {

  state = {
    editName: false,
    editPassport: false,
    editEmail: false,
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

  handleSave() {


    window.location.reload();


  }

  render() {

    const { fname, lname, passport, email } = this.props
    const { editName, editPassport, editEmail } = this.state;
    return (
      <div className="flex-col-profile" >
        <div className="header"> <MyHeader /></div>
        <div className="flex-row-profile">

          {/* <div className="profile">
            <table style={{ width: "100%" }}>
              <tr className="user-name" >
                {!editName ?
                  <>
                    <th><AccountCircleIcon style={{ color: "#12228F", fontSize: "10rem" }} /></th>
                    <td>{fname} <br />{lname}</td>
                    <td><EditIcon className="icon" onClick={this.handleEditName.bind(this)} /></td>
                  </> :
                  <>
                    <th><AccountCircleIcon style={{ color: "#12228F", fontSize: "13rem" }} /></th>
                    <td><Form.Control style={{ width: '60%' }} size="sm" name="firstName" type="text" placeholder="first name" value={fname} />
                      <Form.Control style={{ width: '60%' }} size="sm" name="lastName" type="text" placeholder="last name" value={lname} /></td>
                    <td> <p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                  </>}
              </tr>

              <tr>
                {!editPassport ?
                  <>
                    <th>Passport Number:</th>
                    <td>{passport}</td>
                    <td><EditIcon className="icon" onClick={this.handleEditPassport.bind(this)} /></td>
                  </> :

                  <>
                    <th>Passport Number:</th>
                    <td><Form.Control style={{ width: '60%' }} size="sm" name="passport" type="text" placeholder="Passport Number" value={passport} /></td>
                    <td> <p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>

                  </>}
              </tr>

              <tr>
                {!editEmail ?
                  <>
                    <th> Email:</th>
                    <td>{email}</td>
                    <td><EditIcon className="icon" onClick={this.handleEditEmail.bind(this)} /></td>
                  </> :
                  <>
                    <th> Email:</th>
                    <td><Form.Control style={{ width: '60%' }} size="sm" name="email" type="text" placeholder="Email" value={email} /></td>
                    <td><p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                  </>
                }
              </tr>
            </table>
          </div> */}
           

        </div>
        <Trip/>
            <Trip/>
            <Trip/>
            <Trip/>
            <Trip/>
            <Trip/>
      </div>
    )
  }
}
//export default Profile;
