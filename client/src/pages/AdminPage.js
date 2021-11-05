import React, { Component } from "react";
import Flight from "../components/Flight";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import "bootstrap/dist/css/bootstrap.min.css";
export default class AdminPage extends Component {
  state = {
    showModal: false,
    flightArr: [
      {
        number: 123213,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
      },
      {
        number: 123213,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
      },
      {
        number: 123213,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
      },
      {
        number: 123213,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
      },
    ],
  };
  handleModalShow() {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  }

  handleAddFlight() {}
  render() {
    const { flightArr } = this.state;
    return (
      <div>
        <div className="flex-container flex-col">
          <h1>Admin Panel</h1>
          <div className="flex-row search-bar">
            <p>hh</p>
            <p>hh</p>
            <p>hh</p>
            <p>hh</p>
          </div>
          <div className="flex-col flight-list">
            {flightArr.map((f) => (
              <Flight number={f.number} date ={f.date} airport={f.airport} economy={f.economy} business={f.business} firstC={f.firstC} dep={f.dep} arrival={f.arrival} />
            ))}
          </div>
          <Button
            onClick={this.handleModalShow.bind(this)}
            style={{ width: "65%" }}
            variant="outlined"
          >
            Add Flight{" "}
          </Button>
        </div>

        {/* adding modal for the adding flight */}
        <Modal
          show={this.state.showModal}
          onHide={this.handleModalShow.bind(this)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a flight
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="start">Date:</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                defaultValue="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
              />
            </div>
            {/* <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={""}
                            onChange={""}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalShow.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
