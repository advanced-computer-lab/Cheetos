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
import api from '../api'

export default class AdminPage extends Component {
  state = {
    showModal: true,
    flightArr: [],
    filteredArr: [],
    //searching flight states
    flightSearch: "",
    departureSearch: "",
    arrivalSearch: "",
    terminalSearch: "",
    arrDateSearch: "",
    depDateSearch: "",
    // add-flight states
    flightNumber: "",
    departureAirport: "",
    arrivalAirport: "",
    arrDate: "",
    depDate: "",
    ecSeats: 0,
    buSeats: 0,
    fcSeats: 0,
    depTime: "",
    arrTime: "",
    departureTerminal: "",
    arrivalTerminal: "",
    errMsg: "",


  };

  async componentDidMount() {
    await api.getAllFlights().then(flights => {
      console.log(flights)
      this.setState({
        flightArr: flights.data,
        filteredArr: flights.data
      })
    })
  }








  handleModalShow() {
    this.setState({
      errMsg: "",
      flightNumber: "",
      departureAirport: "",
      flightDate: "",
      ecSeats: 0,
      buSeats: 0,
      fcSeats: 0,
      depTime: "",
      arrTime: "",
      departureTerminal: "",
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

  async handleAddFlight() {
    if (
      !this.state.flightNumber ||
      !this.state.departureAirport ||
      !this.state.arrivalAirport ||
      !this.state.departureTerminal ||
      !this.state.arrivalTerminal||
      !this.state.depDate ||
      !this.state.arrDate ||
      !this.state.ecSeats ||
      !this.state.buSeats ||
      !this.state.fcSeats ||
      !this.state.depTime ||
      !this.state.arrTime ||
      !this.state.departureTerminal
    ) {
      this.setState({
        errMsg: "flight info can not be empty !",
      });
    } else {
      const flight = {
        "FlightNumber": this.state.flightNumber,
        "DepartureTime": this.state.depTime,
        "ArrivalTime": this.state.arrTime,
        "DepartureDate": this.state.depDate,
        "ArrivalDate": this.state.arrDate,
        "EconomySeats": this.state.ecSeats,
        "BusinessSeats": this.state.buSeats,
        "FirstClassSeats": this.state.fcSeats,
        "DepartureTerminal": this.state.departureTerminal,
        "ArrivalTerminal": this.state.arrivalTerminal,
        "DepartureAirport": this.state.departureAirport,
        "ArrivalAirport": this.state.arrivalAirport,
      }
      await api.insertFlight(flight).then(
        (res) => {
          console.log(res)
          this.setState({
            flightArr: [...this.state.flightArr, res.data.data],
          })
        }
      )





      this.handleModalShow();
    }
  }

  fieldsEmpty() {
    // 

    if (
      this.state.departureSearch != "" ||
      this.state.flightSearch != "" ||
      this.state.arrivalSearch != "" ||
      this.state.terminalSearch != "" ||
      this.state.depDateSearch != "" ||
      this.state.arrDateSearch != "") {
      return false;
    }
    return true;

  }



  switchSearch(e) {
    const value = e.target.value;
    console.log(e.target.name);
    switch (e.target.name) {
      case ('flightSearch'):
        if (this.state.filteredArr.length != 0) {

          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.FlightNumber.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.FlightNumber.toString().includes(value)) });
        }

        break;

      case ('arrivalSearch'):
        if (this.state.filteredArr.length != 0) {
          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.ArrivalTime.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.ArrivalTime.toString().includes(value)) });
        }


        break;

      case ('departureSearch'):
        if (this.state.filteredArr.length != 0) {
          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.DepartureTime.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.DepartureTime.toString().includes(value)) });
        }

        break;

      case ('arrDateSearch'):
        if (this.state.filteredArr.length != 0) {
          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.ArrivalDate.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.ArrivalDate.toString().includes(value)) });
        }
        break;

      case ('depDateSearch'):
        if (this.state.filteredArr.length != 0) {
          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.DepartureDate.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.DepartureDate.toString().includes(value)) });
        }

        break;

      case ('terminalSearch'):
        if (this.state.filteredArr.length != 0) {
          this.setState({ filteredArr: this.state.filteredArr.filter((f) => f.Terminal.toString().includes(value)) });
        } else {
          this.setState({ filteredArr: this.state.flightArr.filter((f) => f.Terminal.toString().includes(value)) });
        }

        break;
    }
  }


  filterSearch(value) {
    const { filteredArr, flightSearch, departureSearch, arrivalSearch, terminalSearch, arrDateSearch, depDateSearch } = this.state
    this.setState({
      filteredArr: this.state.flightArr
    })
    if (flightSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.FlightNumber.toString().includes(value))
      })
    }
    if (departureSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.DepartureTime.toString().includes(value))
      })
    }
    if (arrivalSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.ArrivalTime.toString().includes(value))
      })
    }
    if (terminalSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.Terminal.toString().includes(value))
      })
    }
    if (arrDateSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.ArrivalDate.toString().includes(value))
      })
    }
    if (depDateSearch != "") {
      this.setState({
        filteredArr: this.filteredArr.filter((f) => f.DepartureDate.toString().includes(value))
      })
    }

  }

  andSearch() {
    const { flightArr, flightSearch, departureSearch, arrivalSearch, terminalSearch, arrDateSearch, depDateSearch } = this.state

    console.log(flightSearch, arrDateSearch, arrivalSearch, depDateSearch, departureSearch, terminalSearch)
    this.setState({
      filteredArr: flightArr.filter((f) =>
        f.FlightNumber.toString().includes(flightSearch)
        && f.ArrivalDate.toString().includes(arrDateSearch)
        && f.ArrivalTime.toString().includes(arrivalSearch)
        && f.DepartureDate.toString().includes(depDateSearch)
        && f.DepartureTime.toString().includes(departureSearch)
        && f.Terminal.toString().includes(terminalSearch)


      )
    })
  }

  handleFlightSearch(e) {

    e.preventDefault();
    console.log(this.fieldsEmpty());
    console.log("flight arr", this.state.flightArr)
    console.log("filtered arr", this.state.filteredArr)
    // const name = e.target.name
    //--- setting the state of search fields upon change 
    //doing the search and filtering 
    const value = e.target.value;
    this.setState({
      //spreading state
      ...this.state,
      [e.target.name]: value,


    }, () => {
      this.andSearch();
    });






  }

  render() {
    const {
      flightArr,
      errMsg,
      flightNumber,
      departureAirport,
      arrivalAirport,
      arrDate,
      depDate,
      ecSeats,
      buSeats,
      fcSeats,
      depTime,
      arrTime,
      departureTerminal,
      arrivalTerminal,
      flightSearch,
      arrDateSearch,
      arrivalSearch,
      depDateSearch,
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
              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Flight number : </Form.Label>
                <Form.Control

                  type="text"
                  placeholder="ex: 12AS3"
                  value={flightSearch}
                  name="flightSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>

              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Arrival date : </Form.Label>
                <Form.Control
                  style={{ width: "" }}
                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                  value={arrDateSearch}
                  name="arrDateSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Arrival time : </Form.Label>
                <Form.Control

                  type="time"
                  value={arrivalSearch}
                  name="arrivalSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Departure date : </Form.Label>
                <Form.Control

                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                  value={depDateSearch}
                  name="depDateSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>

              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Departure time : </Form.Label>
                <Form.Control

                  type="time"
                  placeholder="Departure time . . ."
                  value={departureSearch}
                  name="departureSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>

              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Terminal : </Form.Label>
                <Form.Control

                  type="text"
                  placeholder="ex: 3"
                  value={terminalSearch}
                  name="terminalSearch"
                  onChange={this.handleFlightSearch.bind(this)}
                />
              </Form.Group>

            </div>
          </div>

          <div className="flight-list">
            <table className="flight-table">
              <tr>
                <th>
                  Flight <br /> Number
                </th>
                {/* <th>Date</th> */}
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
                filteredArr.map((f) => (
                  <Flight
                    number={f.FlightNumber}
                    arrDate={f.ArrivalDate}
                    depDate={f.DepartureDate}
                    airport={f.Airport}
                    economy={f.EconomySeats}
                    business={f.BusinessSeats}
                    firstC={f.FirstClassSeats}
                    dep={f.DepartureTime}
                    arrival={f.ArrivalTime}
                    terminal={f.Terminal}
                    id={f._id}
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
            Create a Flight
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

            <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                  <Form.Label>Flight number </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="flightNumber"
                    value={flightNumber}
                    type="text"
                  />
                </Form.Group>


              <div className="add-flight-body">


                

                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"

                >
                  <Form.Label>Departure Airport </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="departureAirport"
                    value={departureAirport}
                    type="text"
                  />
                </Form.Group>
                <Form.Group
                  style={{ flexGrow: "1" }}
                  className="mb-3"
                >
                  <Form.Label>Departure Terminal :</Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="departureTerminal"
                    value={departureTerminal}
                    type="number"
                  />
                </Form.Group>
                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"
                >
                  <Form.Label>Arrival Airport </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="arrivalAirport"
                    value={arrivalAirport}
                    type="text"
                  />
                </Form.Group>

                <Form.Group
                  style={{ flexGrow: "1" }}
                  className="mb-3"
                >
                  <Form.Label>Arrival Terminal :</Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="arrivalTerminal"
                    value={arrivalTerminal}
                    type="number"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3"  >
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
                <Form.Group className="mb-3"  >
                  <Form.Label>Number of economy seats : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="ecSeats"
                    value={ecSeats}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3"  >
                  <Form.Label>Number of business seats : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="buSeats"
                    value={buSeats}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3"  >
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

                >
                  <Form.Label>Departure time : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="depTime"
                    value={depTime}
                    type="time"
                  />
                </Form.Group>

                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"

                >
                  <Form.Label>Arrival date : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="arrDate"
                    value={arrDate}
                    type="date"
                  />
                </Form.Group>
                <Form.Group
                  style={{ flexGrow: 1 }}
                  className="mb-3"

                >
                  <Form.Label>Departure date : </Form.Label>
                  <Form.Control
                    onChange={this.handleAddFlightChange.bind(this)}
                    name="depDate"
                    value={depDate}
                    type="date"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3"  >
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
                <Form.Group className="mb-3"  >
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
                Add flight
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
