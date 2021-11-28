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
                <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                    <Form.Label>Number of adult passengers: </Form.Label>
                    <Form.Control

                    type="number"
                        //   placeholder="ex: 12AS"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                    />
                </Form.Group>

                <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                    <Form.Label>Number of child passengers: </Form.Label>
                    <Form.Control
                    type="number"
                        //   placeholder="ex: 12AS"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                    />
                </Form.Group>

                <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                 <Form.Label>Departure Airport: </Form.Label>
                 <Form.Control
                    type="text"
                    placeholder="ex: Lax"
                    // value={}
                    // name=""
                    onChange={this.handleSearch.bind(this)}
                />
                </Form.Group>

              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Arrival airport : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex: CAI"
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>

              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Departure date : </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>


              <Form.Group style={{ flexGrow: 1 }} className="mb-3">
                <Form.Label>Arrival date : </Form.Label>
                <Form.Control
                  style={{ width: "" }}
                  type="date"
                  placeholder="Date (dd/MM/YY). . ."
                //   value={}
                //   name=""
                  onChange={this.handleSearch.bind(this)}
                />
              </Form.Group>

           <div className="flex-col select">
             <label for="cabin"> Cabin class:</label>
              <select id="cabin" style={{height:"40px",width:"100px"}}>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="firstClass">First-Class</option>
              </select>
           </div>

            


            
                    </div>

                </div>
            
        )
    }
}
