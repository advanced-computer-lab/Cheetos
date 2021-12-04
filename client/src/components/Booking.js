import React, { Component } from 'react'
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import api from '../api'
import { withRouter } from 'react-router';

export default class Booking extends Component {
  
       

    state={
        showModal:false,
       
    }
    handleModalShow() {
        this.setState({
          showModal: this.state.showModal ? false : true,
        });
      }
    handleDelete() {
        
        this.handleModalShow();
      }
      async componentDidMount() {
        const { userId } = this.props.location.data
        await api.getUserInfo(userId).then(user => {
          this.setState({
            fname: user.data.data.FirstName,
            lname: user.data.data.LastName,
            email: user.data.data.Email,
            passport: user.data.data.PassportNumber
          }, () => console.log(user.data.data))
        })
    
      }
    render() {
        let price = 0;
        const{confirmationNum,userId,reservation} = this.props
        const {showModal } = this.state

        for(let i = 0 ; i<reservation.length ;i++){
            price+=reservation[i].Price; 
         }

        return (
            <>
            <div className="booking-card">
            <div style={{ width: '70%'  , marginTop : '5px'}} >

                <div style={{marginLeft:"4rem",marginBottom:"20px",marginTop:"15px"}}><strong>
                    <h5>Confirmation Number : {confirmationNum}</h5>
                </strong></div>



               

                {
                    reservation.map((b)=>(
                        <div className="booking-flight"  >


                        <div className="trip-flex-col">
                            <p className="emphasis">12-3-2021 {">"} 12-3-2021  </p>
                            <p>2:30 {">"} 17:30</p>
                        </div>

                        <div className="trip-flex-col">
                        <div className="emphasis"><AirlineSeatReclineNormalIcon />{b.ChosenSeat}</div>
                        <p style={{width:"120px",textAlign:"center"}}>{b.CabinClass}</p>
                        </div>

                        <div className="trip-flex-col">
                            <p className="emphasis">13h 30m</p>
                                 <p>CAI-LAX</p>
                        </div>
                        
                        
                    </div>

                    

                    )) }

               

               


                
               

            </div>
            <div className = "vl">

            </div>
            <div className="trip-flex-col" style={{ width: '30%' }} >
                <h3>{price}$</h3>
                <Button 
                    onClick={this.handleModalShow.bind(this)}
                    style={{
                        backgroundColor: "rgb(201, 6, 6)",
                        width: "150px",
                        height: "5vh",
                        fontSize: "small",
                    }}
                
                    variant="contained"
                >
                    Cancel Booking
                </Button>
            </div>
        </div>

        <Modal centered show={showModal} onHide={this.handleModalShow.bind(this)}>
        <Modal.Header closeButton style={{backgroundColor:"#14279b"}}>
        <Modal.Title style={{color:"white"}}>Heads up!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
        <Modal.Footer>
        <Button variant="primary" style={{color:"red"}} onClick={this.handleModalShow.bind(this)}>
            Cancel
        </Button>
        <Button variant="secondary" onClick={this.handleDelete.bind(this)}>
            Yes
        </Button>
        </Modal.Footer>
        </Modal>


        </>
        )
    }
}
