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
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 111111,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 2222,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 33333,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },

      {
        number: 4444,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 77777,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 99999,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 88888,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 446967,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 9939393,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
      },
      {
        number: 33333,
        date: "11/3/2101",
        airport: "lax",
        economy: 20,
        business: 30,
        firstC: 20,
        dep: "20.30",
        arrival: "2.30",
        terminal : "3"
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
        terminal : "3"
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
        terminal : "3"
      },
    ],
    date: new Date("2014-08-18T21:11:54"),
    time: new Date("2014-08-18T21:11:54"),
    flightSearch: "",
    departureSearch:"",
    arrivalSearch:"",
    terminalSearch:""
  };
  handleModalShow() {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  }

  handleAddFlight() {
    this.handleModalShow();
  }
  handleDateChange(newDate) {
    console.log(newDate);
    this.setState({
      date: newDate,
    });
  }
  handleFlightSearch(event) {
    event.preventDefault();
    this.setState(
      {
        flightSearch: event.target.value
      }
    )
  }
  render() {

    const { flightArr, date, time, flightSearch } = this.state;
    return (
      <div>
        <div className="flex-container flex-col">
          <div className="admin-header">
            <h1>ADMIN PANEL</h1>
            <div className=" search-bar">
              {/* <h2 >Search: </h2> */}
              <Form.Control  style = {{width : '25%'}} type="text" placeholder="Flight number . . ."
                value={flightSearch}
                onChange={this.handleFlightSearch.bind(this)}
              />
              <Form.Control style = {{width : '25%'}} type="text" placeholder="Date (dd/MM/YY). . ." />
              <Form.Control style = {{width : '25%'}} type="text" placeholder="Departure time . . ." 
              value={departureSearch} onChange={this.handleTimeSearch.bind(this)} />
              <Form.Control style = {{width : '25%'}} type="text" placeholder="Arrival time . . ."
              value={arrivalSearch} onChange={this.handleTimeSearch.bind(this)} />
              <Form.Control style = {{width : '25%'}} type="text" placeholder="Terminal . . ." 
              value={terminalSearch} onChange={this.handleTimeSearch.bind(this)}/>

            </div>
          </div>

          <div className="flight-list">
            <table className="flight-table">
              <tr>
                <th>Flight <br /> Number</th>
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
              {
                flightSearch == ""
                  ?
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
                  ))
                  :
                  (flightArr.filter((f) => f.number.toString().includes(flightSearch))).map((f) => (
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
                  ))





              }
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
              fontWeight:"bold",
      
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
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a flight
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="add-flight">
              <div className="add-flight-body">
                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Flight number </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Airport </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Flight date : </Form.Label>
                  {/* <Form.Control type="text"   /> */}
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
                </Form.Group>
              </div>

              <div className="add-flight-body">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of economy seats : </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of business seats : </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number of first class seats :</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </div>
              <div className="add-flight-body">
                {/* <Form.Group style={{ flexGrow: 1 }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Arrival time : </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group style={{ flexGrow: 1 }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Departure time : </Form.Label>
                  <Form.Control type="text" />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Terminal :</Form.Label>
                  <Form.Control type="text" />
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
            <Button onClick={this.handleAddFlight.bind(this)}>
              Add fLight
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
