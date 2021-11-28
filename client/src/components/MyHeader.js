import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";


export default class MyHeader extends Component {
    handleSearch(){

    }
    handleProfileClick(){

    }
    render() {
        return (
            <div className="admin-header logo-buttons-search">
                
                    <div className="logo-buttons"> <Button
            onClick={this.handleProfileClick}
            style={{
             
              backgroundColor: "#37A1E2",
              width: "12%",
              height: "7vh",
              fontSize: "medium",

            }}
            variant="contained"
          >
            <PersonIcon style={{marginRight:"5px" , fontSize:"xx-large"}}/>Profile{" "}
          </Button>
          </div>
                    <div className="search-bar">
                        {/* n of passengers , dep airport , arr air , dep date ,arr date ,cabin class  */}
                <Form.Group style={{ flexGrow: 1 ,width:"12%" }} className="mb-3">
                    <Form.Label>Adult passengers: </Form.Label>
                    <Form.Control

                    type="number"
                         placeholder="ex: 1"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                    />
                </Form.Group>

                <Form.Group style={{ flexGrow: 1 ,width:"12%"}} className="mb-3">
                    <Form.Label>Child passengers: </Form.Label>
                    <Form.Control
                    type="number"
                        placeholder="ex: 2"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                    />
                </Form.Group>

                <Form.Group style={{ flexGrow: 1 ,width:"12%"}} className="mb-3">
                 <Form.Label>Departure Airport: </Form.Label>
                 <Form.Control
                    type="text"
                    placeholder="ex: LAX"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                />
                </Form.Group>

              <Form.Group style={{ flexGrow: 1 ,width:"12%"}} className="mb-3">
                <Form.Label>Arrival airport: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex: CAI"
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>

              <Form.Group style={{ flexGrow: 1 ,width:"12%"}} className="mb-3">
                <Form.Label>Departure date: </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 ,width:"12%"}} className="mb-3">
                <Form.Label>Arrival date: </Form.Label>
                <Form.Control
                  style={{ width: "" }}
                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Cabin class: </Form.Label>
                <Form.Select aria-label="Default select example">
                <option>click to select</option>
                <option value="1">Economy</option>
                <option value="2">Business class</option>
                <option value="3">First Class</option>
              </Form.Select>
              </Form.Group>


                    </div>

                </div>
            
        )
    }
}
