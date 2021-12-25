import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../components/Logo';
import { Link } from "react-router-dom";
import Signin from "../components/Signin"
import { withRouter } from 'react-router';
import ProfileDropdown from '../components/ProflieDropdown'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import api from '../api'
import { Typeahead } from 'react-bootstrap-typeahead';;

class MyHeader extends Component {
  state = {
    adultCount: 1,
    childCount: 0,
    deptAirport: "",
    arrAirport: "",
    deptDate: "",
    retDate: "",
    cabinClass: "EconomySeats",
    userId: '',
    showSignin: false,
    signedIn: false,
    anchorEl: null,
    open: false,
    token: "",
    userName: "",

    anchorElCabinDep: null,
    anchorElCabin: null,

    openCabinDep: false,
    openCabin: false,

    //for the type ahead 
    deptOptions: [],
    selectedDepts: [],
    arrOptions: [],
    selectedArrivals: []

  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget, open: true
    })
  };

  handleClose = (event) => {
    this.setState({
      anchorEl: null, open: false
    })
  };

  handleClickCabin = (event) => {
    this.setState({
      anchorElCabin: event.currentTarget, openCabin: true
    })
  };

  handleCloseCabin = (event) => {
    this.setState({
      anchorElCabin: null, openCabin: false
    })
  };

  handleClickCabinDep = (event) => {
    this.setState({
      anchorElCabinDep: event.currentTarget, openCabinDep: true
    })
  };

  handleCloseCabinDep = (event) => {
    this.setState({
      anchorElCabinDep: null, openCabinDep: false
    })
  };

  handleSearch(e) {
    e.preventDefault();
    // const name = e.target.name
    //--- setting the state of search fields upon change 
    //doing the search and filtering 
    const value = e.target.value;
    this.setState(
      {
        ...this.state,
        [e.target.name]: value
      });
  }


  handleSignIn() {
    this.props.history.push("/signin")
  }

  flightSearch() {
    const { adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, cabinClass } = this.state
    if (this.props.location.pathname === "/search") {
      this.props.parentSearch(adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, cabinClass )
    } else {
      const search = { adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, cabinClass }
      sessionStorage.setItem('searchQuery', JSON.stringify(search));
      console.log(search);
      this.props.history.push("/search");
    }

  }
  async componentDidMount() {

    console.log("my pathname is ", this.props.location.pathname)
    if (localStorage.getItem('token')) {

      this.setState({
        signedIn: true,
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
      }, console.log("this is the token", this.state.token))
      console.log("ana f my header ", localStorage.getItem('userId'));
      await api.getUserInfo(localStorage.getItem('userId')).then(user => {
        this.setState({
          username: user.data.data.UserName
        })
      }).catch((err) => console.log("tt", err))
     
    }
    await api.getAllFlights().then((flights) => {
      console.log("in headerr ", flights.data);
      this.setState({
        deptOptions: (flights.data).map((f) => f.DepartureAirport).filter(this.onlyUnique.bind(this)),
        arrOptions: (flights.data).map((f) => f.ArrivalAirport).filter(this.onlyUnique.bind(this)),
      })
      //, () => console.log("i added flights ", this.state.deptOptions)
    }
    )
    const searchObject = JSON.parse(sessionStorage.getItem('searchQuery'))
    if (searchObject) {
      console.log("this is search object", searchObject);
      this.setState(
        {
          adultCount: searchObject.adultCount,
          childCount: searchObject.childCount,
          deptAirport: searchObject.deptAirport,
          arrAirport: searchObject.arrAirport,
          deptDate: searchObject.deptDate,
          retDate: searchObject.retDate,
          cabinClass: searchObject.cabinClass,
        }
      )

    }
  }


  onLogoutRedirect() {
    this.props.history.push("/");
  }
  handleMenuItemClick = (event, index) => {

    event.preventDefault();
    // const name = e.target.name
    //--- setting the state of search fields upon change 
    //doing the search and filtering 
    const value = event.target.getAttribute('value');
    this.setState(
      {
        ...this.state,
        [event.target.getAttribute('name')]: value
      }, () => { console.log("this is the state", this.state[event.target.getAttribute('name')]) })

    if (event.target.getAttribute('name') === "cabinClass") {
      this.handleCloseCabinDep(event)

    }
    else {
      this.handleCloseCabin(event)
    }


  };
  onlyUnique(value, index, self) {
    //function for returning unique values of departure and arrival airports to search with in the drop down 
    return self.indexOf(value) === index;
  }
  setDepartureSelections(arr) {
    this.setState({
      selectedDepts: arr.filter(this.onlyUnique.bind(this)),
      deptAirport: arr[0]
    }, () => console.log("------------> dropdown", this.state.deptAirport))
  }
  setArrivalSelections(arr) {
    this.setState({
      selectedArrivals: arr.filter(this.onlyUnique.bind(this)),
      arrAirport: arr[0]
    }, () => console.log("------------> dropdown", this.state.deptAirport))
  }
  render() {
    const { userId } = this.props
    const { adultCount, childCount, deptAirport, arrAirport, deptDate,
      retDate, cabinClass, showSignin, signedIn,
      open, openCabin, openCabinDep,
      deptOptions, selectedDepts, arrOptions, selectedArrivals } = this.state
    return (
      <div className="admin-header logo-buttons-search">

        <div className="logo-buttons">
          <Link style={{ textDecoration: "none", color: "white", cursor: "pointer" }} to="/">
            <Logo />
          </Link>
          <div className="header-buttons-container">
            {localStorage.getItem('token') ?
              <>
                {console.log("un", this.state.username)}
                <ProfileDropdown ParentRedirect={this.onLogoutRedirect.bind(this)} username={this.state.username} />

              </>
              :

              <Button className="header-buttons" 
                onClick={this.handleSignIn.bind(this)} variant="contained" >
                Sign in
              </Button>
            }
          </div>

        </div>
        <div className="flex-col" style={{ gap: "0", alignItems: "center", marginTop: "10px" }}>

          <div className="search-bar" style={{ gap: 0, justifyContent: "center" }} >

            <div className="flex-row" style={{ gap: " 0.5rem", width: "100%", justifyContent: "flex-start", marginTop: "-15px" }}>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls="demo-positioned-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={this.handleClick.bind(this)}
                  style={{ color: "white" }}
                >
                  {Number(childCount) + Number(adultCount) === 1 ? Number(childCount) + Number(adultCount) + " Passenger" : Number(childCount) + Number(adultCount) + " Passengers"}
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={this.state.anchorEl}
                  open={open}
                  onClose={this.handleClose.bind(this)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >

                  <MenuItem ><TextField
                    id="outlined-number"
                    label="Adults"
                    type="number"
                    size="small"
                    style={{ width: "9rem" }}
                    value={adultCount}
                    name="adultCount"
                    onChange={this.handleSearch.bind(this)}
                  />
                  </MenuItem>

                  <MenuItem > <TextField
                    id="outlined-number"
                    label="Children"
                    type="number"
                    size="small"
                    style={{ width: "9rem" }}
                    value={childCount}
                    name="childCount"
                    onChange={this.handleSearch.bind(this)}
                  />
                  </MenuItem>

                </Menu>
              </div>

              <div>
                <Button

                  id="demo-positioned-button"
                  aria-controls="demo-positioned-menu"
                  aria-haspopup="true"
                  aria-expanded={openCabin ? 'true' : undefined}
                  onClick={this.handleClickCabinDep.bind(this)}
                  style={{ color: "white" }}
                >
                  {cabinClass === "" ? "Departure Cabin " : cabinClass === "EconomySeats" ? "Economy" : cabinClass === "BusinessSeats" ? "Business Class" : "First Class"}

                  <KeyboardArrowDownIcon />
                </Button>
                
                <Menu
                  name="cabinClass"
                  onChange={this.handleSearch.bind(this)}
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={this.state.anchorElCabinDep}
                  open={openCabinDep}
                  onClose={this.handleCloseCabinDep.bind(this)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >

                  <MenuItem onClick={(event) => this.handleMenuItemClick(event)} name="cabinClass" value="EconomySeats">Economy
                  </MenuItem>

                  <MenuItem onClick={(event) => this.handleMenuItemClick(event)} name="cabinClass" value="BusinessSeats">Business-Class
                  </MenuItem>

                  <MenuItem onClick={(event) => this.handleMenuItemClick(event)} name="cabinClass" value="FirstClassSeats">First-Class
                  </MenuItem>

                </Menu>
              </div>


            </div>


            <div className="flex-row " style={{ gap: " 0.5rem", width: "100%", alignItems: "stretch" }}>

              <Form.Group style={{ flexGrow: 1 }} className="mb-2">

                <Typeahead

                  id="deptDropDown"
                  labelKey="name"
                  onChange={(arr) => { this.setDepartureSelections(arr) }}
                  options={deptOptions}
                  placeholder="Departure airport"
                  selected={selectedDepts}

                />
                {/* <Form.Control
                  type="text"
                  placeholder="Departure airport"
                  value={deptAirport}
                  name="deptAirport"
                  onChange={this.handleSearch.bind(this)}
                /> */}
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 }} className="mb-2">
                <Typeahead

                  id="arrDropDown"
                  labelKey="name2"
                  onChange={(arr) => { this.setArrivalSelections(arr) }}
                  options={arrOptions}
                  placeholder="Arrival airport"
                  selected={selectedArrivals}

                />
                {/* <Form.Control
                  type="text"
                  placeholder="Arrival airport"
                  value={arrAirport}
                  name="arrAirport"
                  onChange={this.handleSearch.bind(this)}
                /> */}


              </Form.Group>
              <Form.Group style={{ flexGrow: 1 }} className="mb-2">

                <Form.Control

                  type="text"
                  onFocus={
                    (e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }
                  }
                  onBlur={
                    (e) => (e.currentTarget.type = "text")
                  }
                  placeholder="Departure date"
                  value={deptDate}
                  min={new Date().toISOString().substring(0, 10)}
                  name="deptDate"
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1, width: "15%" }} className="mb-2">

                <Form.Control
                
                  style={{ width: "" }}
                  type="text" onFocus={
                    (e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }
                  }
                  onBlur={
                    (e) => {
                      e.currentTarget.type = "text";
                      e.currentTarget.blur();
                    }}
                  placeholder="Return date"
                  value={retDate}
                  min = { deptDate ? new Date(deptDate).toISOString().substring(0, 10) : ""}
                  name="retDate"
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>

              <div >
                <Button style={{ width: "100px", height: "38px" }}
                  onClick={this.flightSearch.bind(this)} variant="contained" >
                  <SearchIcon style={{ fontSize: "large" }} />{" "}
                  Search
                </Button>
              </div >




            </div>

            <div className="flex-row" style={{ gap: " 0.5rem", width: "100%", alignItems: "stretch" }}>


            </div>



          </div>
        </div>


      </div>

    )
  }
}

export default withRouter(MyHeader)