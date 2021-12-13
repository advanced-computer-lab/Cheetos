import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import PersonIcon from '@mui/icons-material/Person';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../components/Logo';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Link } from "react-router-dom";
import Signin from "../components/Signin"
import { withRouter } from 'react-router';
import ProfileDropdown from '../components/ProflieDropdown'
import PassengerCounter from '../components/PassengerCounter'
import CabinSelect from '../components/CabinSelect'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

class MyHeader extends Component {
  state = {
    adultCount: 1,
    childCount: 0,
    deptAirport: "",
    arrAirport: "",
    deptDate: "",
    retDate: "",
    deptCabinClass: "",
    arrCabinClass: "",
    userId: '',
    showSignin: false,
    signedIn: false,
    anchorEl:null,
    open : false,

    anchorElCabinDep:null,
    anchorElCabin:null,

    openCabinDep:false,
    openCabin:false,
    
  }

  handleClick = (event) => {
    this.setState({
      anchorEl:event.currentTarget,open:true
    })
  };

  handleClose = (event) => {
    this.setState({
      anchorEl:null,open:false
    })
  };

  handleClickCabin = (event) => {
    this.setState({
      anchorElCabin:event.currentTarget,openCabin:true
    })
  };

  handleCloseCabin = (event) => {
    this.setState({
      anchorElCabin:null,openCabin:false
    })
  };

  handleClickCabinDep = (event) => {
    this.setState({
      anchorElCabinDep:event.currentTarget,openCabinDep:true
    })
  };

  handleCloseCabinDep = (event) => {
    this.setState({
      anchorElCabinDep:null,openCabinDep:false
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


  handleSignInModal() {
    sessionStorage.setItem('userId', "61ab9713fe61452296d667ca");
    this.setState({
      showSignin: !this.state.showSignin,
      userId: sessionStorage.getItem('userId')
    });


  }
  flightSearch() {
    const { adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass } = this.state
    if (this.props.location.pathname === "/search") {
      this.props.parentSearch(adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass)
    } else {
      const search = { adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass }
      sessionStorage.setItem('searchQuery', JSON.stringify(search));
      console.log(search);
      this.props.history.push("/search");
    }

  }
  componentDidMount() {

    console.log("my pathname is ", this.props.location.pathname)
    if (sessionStorage.getItem('userId')) {
      this.setState({
        signedIn: true,
        userId: sessionStorage.getItem('userId')
      })
    }
    const searchObject = JSON.parse(sessionStorage.getItem('searchQuery'))
    if (searchObject) {
      console.log("this is search object",searchObject);
      this.setState(
        {
          adultCount: searchObject.adultCount,
          childCount: searchObject.childCount,
          deptAirport: searchObject.deptAirport,
          arrAirport: searchObject.arrAirport,
          deptDate: searchObject.deptDate,
          retDate: searchObject.retDate,
          deptCabinClass: searchObject.deptCabinClass,
          arrCabinClass: searchObject.arrCabinClass,
        }
      )

    }
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
      },()=>{console.log("this is the state",this.state[event.target.getAttribute('name')])})
     
      if(event.target.getAttribute('name')==="deptCabinClass"){
        this.handleCloseCabinDep(event)
        
      }
      else{
        this.handleCloseCabin(event)
      }
      

  };
  

  render() {
    const { userId } = this.props
    const { adultCount, childCount, deptAirport, arrAirport, deptDate, retDate, deptCabinClass, arrCabinClass, showSignin, signedIn ,open,openCabin,openCabinDep} = this.state
    return (
      <div className="admin-header logo-buttons-search">

        <div className="logo-buttons">
          <Link style={{ textDecoration: "none", color: "white", cursor: "pointer" }} to="/">
            <Logo />
          </Link>
          <div className="header-buttons-container">
            {sessionStorage.getItem('userId') ?
              <>
                <ProfileDropdown username="Mark Potter"/>
                
              </>
              :
              <Button className="header-buttons" style={{ marginRight: "20px" }}
                onClick={this.handleSignInModal.bind(this)} variant="contained" >
                Sign in
              </Button>
            }
          </div>

        </div>
        <div className="flex-col" style={{ gap: "0", alignItems: "center", marginTop: "10px" }}>
          
          <div className="search-bar" style={{ gap: 0, justifyContent: "center" }} >

            <div className="flex-row" style={{ gap: " 0.5rem", width: "100%", justifyContent: "flex-start" ,marginTop:"-15px" }}>
            <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={this.handleClick.bind(this)}
        style={{color:"white"}}
      >
        {Number(childCount)+Number(adultCount)===1?Number(childCount)+Number(adultCount) +" Passenger":Number(childCount)+Number(adultCount)+" Passengers"} 
        <KeyboardArrowDownIcon/>
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
 
        <MenuItem >  <TextField
          id="outlined-number"
          label="Adults"
          type="number"
          size="small"
          style={{width:"9rem"}}
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
          style={{width:"9rem"}}
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
        style={{color:"white"}}
      >
        {deptCabinClass==="" ?"Departure Cabin ": deptCabinClass==="EconomySeats"? "Economy" : deptCabinClass==="BusinessSeats"? "Business Class" : "First Class" }
        
        <KeyboardArrowDownIcon/>
      </Button>
      <Menu 
                  name="deptCabinClass"
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
 
        <MenuItem  onClick={(event) => this.handleMenuItemClick(event) }  name="deptCabinClass" value="EconomySeats">Economy
        </MenuItem>

        <MenuItem  onClick={(event) => this.handleMenuItemClick(event)}   name="deptCabinClass" value="BusinessSeats">Business-Class
        </MenuItem>

        <MenuItem  onClick={(event) => this.handleMenuItemClick(event) }  name="deptCabinClass" value="FirstClassSeats">First-Class
        </MenuItem>
   
      </Menu>
              </div>

              <div>
              <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={openCabin ? 'true' : undefined}
        onClick={this.handleClickCabin.bind(this)}
        style={{color:"white"}}
      >
        {arrCabinClass==="" ?"Return Cabin ": arrCabinClass==="EconomySeats"? "Economy" : arrCabinClass==="BusinessSeats"? "Business Class" : "First Class" }
        <KeyboardArrowDownIcon/>
      </Button>
      <Menu value={arrCabinClass}
                  name="arrCabinClass"
                  onChange={this.handleSearch.bind(this)}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={this.state.anchorElCabin}
        open={openCabin}
        onClose={this.handleCloseCabin.bind(this)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
 
        <MenuItem  onClick={(event) => this.handleMenuItemClick(event)}  name="arrCabinClass" value="EconomySeats">Economy
        </MenuItem>

        <MenuItem  onClick={(event) => this.handleMenuItemClick(event)}  name="arrCabinClass" value="BusinessSeats">Business-Class
        </MenuItem>

        <MenuItem  onClick={(event) => this.handleMenuItemClick(event)}  name="arrCabinClass" value="FirstClassSeats">First-Class
        </MenuItem>
   
      </Menu>
              </div>
            </div>
      

            <div className="flex-row " style={{ gap: " 0.5rem", width: "100%", alignItems: "stretch" }}>
              
              <Form.Group style={{ flexGrow: 1 }} className="mb-2">
            
                <Form.Control
                  type="text"
                  placeholder="Departure airport"
                  value={deptAirport}
                  name="deptAirport"
                  onChange={this.handleSearch.bind(this)}
                />
                 </Form.Group>
                

                <Form.Group style={{ flexGrow: 1 }} className="mb-2">
            
                <Form.Control
                  type="text"
                  placeholder="Arrival airport"
                  value={arrAirport}
                  name="arrAirport"
                  onChange={this.handleSearch.bind(this)}
                />
             
                   
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

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="my-modal"
          centered show={showSignin} onHide={this.handleSignInModal.bind(this)}>
               <Modal.Header closeButton >
                        <Modal.Title style={{fontWeight:"600"}}>Sign In</Modal.Title>
                    </Modal.Header>


          <div className="signup-form">
            <Signin />
          </div>


        </Modal>
      </div>

    )
  }
}

export default withRouter(MyHeader)