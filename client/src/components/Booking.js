import React, { Component } from 'react'
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import Button from "@mui/material/Button";
import '../style/booking.css';
import '../style/trip.css';
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EventSeatIcon from '@mui/icons-material/EventSeat';

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

    render() {
       
        const{confirmNum,price} = this.props
        const {showModal } = this.state
        return (
            <>
            <div className="booking-card">
            <div style={{ width: '70%'  , marginTop : '5px'}} >

                <div style={{marginLeft:"4rem",marginBottom:"20px",marginTop:"15px"}}><strong>
                    <h3>Confirmation Number : A71836782</h3>
                </strong></div>

                <div className="booking-flight"  >
                    <div className="trip-flex-col">
                        <h5>12/3/2021 : 2.30</h5>
                        <p>CAI-LAX</p>
                    </div>
                    
                    <div className="seats"><AirlineSeatReclineNormalIcon />A1,A2,A3</div>
                    <h5>Economy</h5>
                </div>

                <div className="booking-flight"  >
                    <div className="trip-flex-col">
                        <h5>12/3/2021 : 2.30</h5>
                        <p>CAI-LAX</p>
                    </div>
                    
                    <div className="seats"><AirlineSeatReclineExtraIcon/>A1,A2,A3</div>
                    <h5>Economy</h5>
                </div>


                
               

            </div>
            <div className = "vl">

            </div>
            <div className="trip-flex-col" style={{ width: '30%' }} >
                <h3>10,000$</h3>
                <Button 
                    onClick={this.handleModalShow.bind(this)}
                    style={{
                        backgroundColor: "rgb(201, 6, 6)",
                        width: "60%",
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
        <Button variant="primary" onClick={this.handleModalShow.bind(this)}>
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
