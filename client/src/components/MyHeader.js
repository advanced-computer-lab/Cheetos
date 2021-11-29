import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../components/Logo';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Link } from "react-router-dom";

export default class MyHeader extends Component {
  handleSearch() {

  }
  handleProfileClick() {

  }
  andSearch() {

  }
  render() {
    return (
      <div className="admin-header logo-buttons-search">

        <div className="logo-buttons">
          <Link style = {{ textDecoration: "none" , color : "white" , cursor : "pointer"}}to="/">
            <Logo />
          </Link>
          <div className="header-buttons-container">
            <Link to="/bookings">
              <Button className="header-buttons" style={{ marginRight: "20px" }}
                onClick={this.handleProfileClick} variant="contained" >
                My bookings
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="header-buttons"
                onClick={this.handleProfileClick} variant="contained" >
                <PersonIcon style={{ marginRight: "5px", fontSize: "x-large" }} />

                Profile

              </Button>
            </Link>
          </div>






        </div>
        <div className="flex-col" style={{ gap: 0 }}>
          <h5 style={{ alignSelf: 'flex-start', marginLeft: "5%" }}>Input fields to Search !</h5>
          <div className="search-bar" style={{ alignItems: "flex-start" }}>
            {/* n of passengers , dep airport , arr air , dep date ,arr date ,cabin class  */}

            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Adult passengers: </Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Adult Passengers"
                // value={}
                // name=""
                onChange={this.handleSearch.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Child passengers: </Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Child passengers"
                // value={}
                // name=""
                onChange={this.handleSearch.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Departure Airport: </Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Departure airport"
                // value={}
                // name=""
                onChange={this.handleSearch.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Arrival airport: </Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Arrival airport"
                //   value={}
                //   name=""
                onChange={this.handleSearch.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Departure date: </Form.Label> */}


              <Form.Control
                type="text" onFocus={
                  (e) => {
                    e.currentTarget.type = "date";
                    e.currentTarget.focus();
                  }
                }
                onBlur={
                  (e) => (e.currentTarget.type = "text")}
                placeholder="Departure date"
                //   value={}
                //   name=""
                onChange={this.handleSearch.bind(this)}
              />

            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">

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
                placeholder="Arrival date"
                //   value={}
                //   name=""
                onChange={this.handleSearch.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ flexGrow: 1, width: "12%" }} className="mb-3">
              {/* <Form.Label>Cabin class: </Form.Label> */}
              <Form.Select aria-label="Default select example">
                <option hidden>Cabin class</option>
                <option value="1">Economy</option>
                <option value="2">Business class</option>
                <option value="3">First Class</option>
              </Form.Select>
            </Form.Group>
            <Button style={{ width: "10px", height: "38px" }}
              onClick={this.andSearch} variant="contained" >
              <SearchIcon style={{ fontSize: "x-large" }} />{" "}
            </Button>

          </div>
        </div>


      </div>

    )
  }
}
