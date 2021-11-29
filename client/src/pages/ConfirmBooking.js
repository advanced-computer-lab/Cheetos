import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

export default class ConfirmBooking extends Component {

    state={
        showModal:false,
       
    }
    handleModalShow() {
        this.setState({
          showModal: this.state.showModal ? false : true,
        });
      }

    render() {
        const {showModal} = this.state
        return (
            <>
            <div className= "flex-col" >
               <MyHeader/>

                
                <div className="booking-card" style={{marginTop:"25px"}}>
                <div style={{ width: '70%'  , marginTop : '5px'}} >

                
                        <div className="booking-flight"  >


                        <div className="trip-flex-col">
                            <p className="emphasis">12-3-2021 {">"} 12-3-2021  </p>
                            <p>2:30 {">"} 17:30</p>
                        </div>

                        <div className="trip-flex-col">
                        <div className="emphasis" ><AirlineSeatReclineNormalIcon />A2,A3</div>
                        <p style={{width:"12",textAlign:"center"}}>Economy</p>
                        </div>

                        <p className="emphasis">700$</p>
                         
                        
                        
                    </div>

                    <div className="booking-flight"  >


                    <div className="trip-flex-col">
                        <p className="emphasis">12-3-2021 {">"} 12-3-2021  </p>
                        <p>2:30 {">"} 17:30</p>
                    </div>

                    <div className="trip-flex-col">
                    <div className="emphasis" ><AirlineSeatReclineNormalIcon />A2,A3</div>
                    <p style={{width:"12",textAlign:"center"}}>Economy</p>
                    </div>

                    <p className="emphasis">700$</p>
                    


                    </div>

                    

                   

               

            </div>
            <div className = "vl">

            </div>
            <div className="trip-flex-col" style={{ width: '30%' }} >
                <h3>1400$</h3>
                <Button 
                    onClick={this.handleModalShow.bind(this)}
                    style={{
                        backgroundColor: "#447fcc",
                        width: "170px",
                        height: "5vh",
                        fontSize: "small",
                    }}
                
                    variant="contained"
                >
                    Confirm Booking
                </Button>
            </div>
        </div>
    </div>
    <Modal 
          aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={this.handleModalShow.bind(this)}>
        <Modal.Header closeButton style={{backgroundColor:"#14279b"}}>
        <Modal.Title style={{color:"white"}}>Successfully Booked !</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>
            Your flight has been been booked !<br/>
                Here is your confirmation number : <strong>1891997776</strong>
                <br/>we'll also email it to you !
        </h5>
        </Modal.Body>
       
        </Modal>


    </>

            
        )
    }
}
