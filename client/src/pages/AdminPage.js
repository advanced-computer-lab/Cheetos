import React, { Component } from "react";
import Flight from "../components/Flight";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";

export default class AdminPage extends Component {
  state = {
    showModal: false,
    flightArr: [
      {
        number: 123213,
        date: "2011-11-4",
        airport: "laax",
        economy: 201,
        business: 300,
        firstC: 203,
        dep: "20:31",
        arrival: "21:30",
        terminal: "32",
      },
      {
        number: 111111,
        date: "2001-11-5",
        airport: "la",
        economy: 2,
        business: 730,
        firstC: 260,
        dep: "06:00",
        arrival: "7:30",
        terminal: "3",
      },
      {
        number: 2222,
        date: "2021-11-5",
        airport: "muh",
        economy: 30,
        business: 730,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
      {
        number: 2722,
        date: "2001-01-5",
        airport: "muh",
        economy: 30,
        business: 930,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
      {
        number: 2222,
        date: "2021-11-5",
        airport: "muh",
        economy: 30,
        business: 730,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
      {
        number: 2222,
        date: "2021-11-5",
        airport: "muh",
        economy: 30,
        business: 730,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
      {
        number: 2222,
        date: "2021-11-5",
        airport: "muh",
        economy: 30,
        business: 730,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
      {
        number: 2222,
        date: "2021-11-5",
        airport: "muh",
        economy: 30,
        business: 730,
        firstC: 20,
        dep: "07:30",
        arrival: "02:30",
        terminal: "55",
      },
    
    
    ],
    filteredArr: [],
        //searching flight states
    flightSearch: "",
    departureSearch: "",
    arrivalSearch: "",
    terminalSearch: "",
    dateSearch:"2021-11-03",
    // add-flight states
    flightNumber: "",
    flightAirport: "",
    flightDate: "",
    ecSeats: 0,
    buSeats: 0,
    fcSeats: 0,
    depTime: "",
    arrTime: "",
    flightTerminal: "",
    errMsg: "",

  
  };
  handleModalShow() {
    this.setState({
      errMsg: "",
      flightNumber: "",
      flightAirport: "",
      flightDate: "",
      ecSeats: 0,
      buSeats: 0,
      fcSeats: 0,
      depTime: "",
      arrTime: "",
      flightTerminal: "",
      showModal: this.state.showModal ? false : true,
    });
  }
  handleAddFlightChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  }

  handleAddFlight() {
    if (
      !this.state.flightNumber ||
      !this.state.flightAirport ||
      !this.state.flightDate ||
      !this.state.ecSeats ||
      !this.state.buSeats ||
      !this.state.fcSeats ||
      !this.state.depTime ||
      !this.state.arrTime ||
      !this.state.flightTerminal
    ) {
      this.setState({
        errMsg: "flight info can not be empty !",
      });
    } else {
      this.handleModalShow();
    }
  }
  handleDateChange(newDate) {
    console.log(newDate);
    this.setState({
      date: newDate,
    });
  }
  
  handleFlightSearch(e) {
    e.preventDefault();


    // const name = e.target.name
    const value = e.target.value;
    this.setState({
      //spreading state
      ...this.state,
      [e.target.name]: value,

      
    });
    console.log(e.target.name);
    switch(e.target.name){
      case('flightSearch'):
      this.setState({filteredArr:this.state.flightArr.filter((f) => f.number.toString().includes(value))});
      break;

      case('arrivalSearch'):
      this.setState({filteredArr:this.state.flightArr.filter((f) => f.arrival.toString().includes(value))});
      break;

      case('departureSearch'):
      this.setState({filteredArr:this.state.flightArr.filter((f) => f.dep.toString().includes(value))});
      break;

      case('dateSearch'):
      this.setState({filteredArr:this.state.flightArr.filter((f) => f.date===(value))});
      break;

      case('terminalSearch'):
      this.setState({filteredArr:this.state.flightArr.filter((f) => f.terminal.toString().includes(value))});
      break;
    }
      


    
  }

  render() {
    const {
      flightArr,
      errMsg,
      flightNumber,
      flightAirport,
      flightDate,
      ecSeats,
      buSeats,
      fcSeats,
      depTime,
      arrTime,
      flightTerminal,
      flightSearch,
      dateSearch,
      arrivalSearch,
      departureSearch,
      terminalSearch,
      filteredArr,
    } = this.state;
    return (
      <div>
        <div className="flex-container flex-col">
          <div className="admin-header">
            <h1>ADMIN PANEL</h1>
            <div className=" search-bar">
              {/* <h2 >Search: </h2> */}
              <Form.Control
                style={{ width: "25%" }}
                type="text"
                placeholder="Flight number . . ."
                value={flightSearch}
                name="flightSearch"
                onChange={this.handleFlightSearch.bind(this)}
              />
              <Form.Control
                style={{ width: "25%" }}
                type="date"
                placeholder="Date (dd/MM/YY). . ."
                value={dateSearch}
                name="dateSearch"
                onChange={this.handleFlightSearch.bind(this)}
              />
              <Form.Control
                style={{ width: "25%" }}
                type="time"
                placeholder="Departure time . . ."
                value={departureSearch}
                name="departureSearch"
                onChange={this.handleFlightSearch.bind(this)}
              />
              <Form.Control
                style={{ width: "25%" }}
                type="time"
                placeholder="Arrival time . . ."
                value={arrivalSearch}
                name="arrivalSearch"
                onChange={this.handleFlightSearch.bind(this)}
              />
              <Form.Control
                style={{ width: "25%" }}
                type="text"
                placeholder="Terminal . . ."
                value={terminalSearch}
                name="terminalSearch"
                onChange={this.handleFlightSearch.bind(this)}
              />
            </div>
          </div>

          <div className="flight-list">
            <table className="flight-table">
              <tr>
                <th>
                  Flight <br /> Number
                </th>
                <th>Date</th>
                <th>Airport</th>
                <th>Economy</th>
                <th>Business</th>
                <th>First Class</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Terminal</th>
                <th></th>
                <th></th>
              </tr>
              {filteredArr.length==0?
              flightArr.map((f) => (
                <Flight
                  number={f.number}
                  date={f.date}
                  airport={f.airport}
                  economy={f.economy}
                  business={f.business}
                  firstC={f.firstC}
                  dep={f.dep}
                  arrival={f.arrival}
                  terminal={f.terminal}
                />
              )):
              filteredArr.map((f) => (
                <Flight
                  number={f.number}
                  date={f.date}
                  airport={f.airport}
                  economy={f.economy}
                  business={f.business}
                  firstC={f.firstC}
                  dep={f.dep}
                  arrival={f.arrival}
                  terminal={f.terminal}
                />
              ))}
            </table>
          </div>

          {/* create flight button */}
          <Button
            onClick={this.handleModalShow.bind(this)}
            style={{
              width: "80% ",
              backgroundColor: "#14279b",
              // color: "black",
              width: "25%",
              height: "10vh",
              fontSize: "large",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Create a Flight{" "}
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
          <Modal.Header className="msg-header" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a flight
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="add-flight">
              <div className="add-flight-body">
                <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                  <Form.Label>Flight number </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="flightNumber"
                    value={flightNumber}
                    type="text"
                  />
                </Form.Group>

                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Airport </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="flightAirport"
                    value={flightAirport}
                    type="text"
                  />
                </Form.Group>

                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Flight date : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="flightDate"
                    value={flightDate}
                    type="date"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Flight date : </Form.Label>
          
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={this.handleDateChange.bind(this)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group> */}
              </div>

              <div className="add-flight-body">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of economy seats : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="ecSeats"
                    value={ecSeats}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of business seats : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="buSeats"
                    value={buSeats}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of first class seats :</Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="fcSeats"
                    value={fcSeats}
                    type="number"
                  />
                </Form.Group>
              </div>
              <div className="add-flight-body">
                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Arrival time : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="arrTime"
                    value={arrTime}
                    type="time"
                  />
                </Form.Group>

                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Departure time : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="depTime"
                    value={depTime}
                    type="time"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Departure : </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={time}
                      onChange={this.handleDateChange.bind(this)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Arrival : </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={time}
                      onChange={this.handleDateChange.bind(this)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group> */}
                <Form.Group
                  style={{ flexGrow: "1" }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Terminal :</Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="flightTerminal"
                    value={flightTerminal}
                    type="number"
                  />
                </Form.Group>
              </div>
            </Form>
            {/* <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={""}
                            onChange={""}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
          </Modal.Body>
          <Modal.Footer>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "red" }}>{errMsg}</p>
              <Button onClick={this.handleAddFlight.bind(this)}>
                Add fLight
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
