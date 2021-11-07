import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from '../api'
class Flight extends React.Component {
  state = {
    edit: false,
    showModal: false,
    number: this.props.number,
    arrDate: this.props.arrDate,
    depDate: this.props.depDate,
    airport: this.props.airport,
    economy: this.props.economy,
    business: this.props.business,
    firstC: this.props.firstC,
    dep: this.props.dep,
    arrival: this.props.arrival,
    terminal: this.props.terminal,
    id: this.props.id
  }
  
  async handleSave() {
    const flight = { 
      "FlightNumber":  this.state.number,
      "DepartureTime":  this.state.dep,
      "ArrivalTime":  this.state.arrival,
      "DepartureDate": this.state.depDate,
      "ArrivalDate": this.state.arrDate,
      "EconomySeats": this.state.economy,
      "BusinessSeats":     this.state.business,
      "FirstClassSeats": this.state.firstC,
      "Terminal": this.state.terminal , 
      "Airport": this.state.airport,
    }
    await api.updateFlightbyId(this.state.id , flight ).then(
      
      window.location.reload()
    )

  }
  async handleDelete() {
    await api.deleteFlightById(this.state.id).then(

      window.location.reload()
    )

    this.handleModalShow();
  }
  handleEdit() {
    this.setState(
      {
        edit: !this.state.edit
      }
    )
  }

  handleEditChange(e) {
    // e.target byshoof anhi textbox .value => acesses the value getting from change event w7na bn7shrha tb2a bt3t textbox
    const value = e.target.value;
    this.setState({
      //spreading state 
      ...this.state,
      [e.target.name]: value,
    });
  }

  handleModalShow() {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  }
  render() {
    const { number, arrDate, depDate, airport, economy, business, firstC, dep, arrival, terminal } = this.props
    const { edit, showModal } = this.state

    return (

      <>
        {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}

        <tr className="flight-card">
          {!edit ?
            <>
              <td> {number}</td>
              {/* <td>{date}</td> */}
              <td>{airport}</td>
              <td>{economy}</td>
              <td>{business}</td>
              <td>{firstC}</td>
              <td>{arrDate}: {dep}</td>
              <td>{depDate}: {arrival}</td>
              <td>{terminal}</td>
            </>
            :

            <>
              {/* Edit text boxes */}
              <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" value={this.state.number} name="number" onChange={this.handleEditChange.bind(this)} /></td>

              <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" value={this.state.airport} name="airport" onChange={this.handleEditChange.bind(this)} /></td>
              <td> <Form.Control style={{ width: '60%' }} size="sm" type="number" value={this.state.economy} name="economy" onChange={this.handleEditChange.bind(this)} /></td>
              <td> <Form.Control style={{ width: '60%' }} size="sm" type="number" value={this.state.business} name="business" onChange={this.handleEditChange.bind(this)} /></td>
              <td> <Form.Control style={{ width: '60%' }} size="sm" type="number" value={this.state.firstC} name="firstC" onChange={this.handleEditChange.bind(this)} /></td>

              <td>
                <Form.Control style={{ width: '60%' }} size="sm" type="date" value={this.state.arrDate} name="arrDate" onChange={this.handleEditChange.bind(this)} />
                <Form.Control style={{ width: '60%' }} size="sm" type="time" value={this.state.dep} name="dep" onChange={this.handleEditChange.bind(this)} />
              </td>
              <td>
                <Form.Control style={{ width: '60%' }} size="sm" type="date" value={this.state.depDate} name="arrDate" onChange={this.handleEditChange.bind(this)} />
                <Form.Control style={{ width: '60%' }} size="sm" type="time" value={this.state.arrival} name="arrival" onChange={this.handleEditChange.bind(this)} />
              </td>
              <td> <Form.Control style={{ width: '60%' }} size="sm" type="number" value={this.state.terminal} name="terminal" onChange={this.handleEditChange.bind(this)} /></td>
            </>
          }
          <td onClick={this.handleEdit.bind(this)}>
            {!edit ?
              <EditIcon className="icon" onClick={this.handleEdit.bind(this)} />
              : <p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold' }} className="icon"> save </p>}
          </td>
          <td><DeleteIcon className="icon danger" onClick={this.handleModalShow.bind(this)} /></td>

        </tr>

        <Modal centered show={showModal} onHide={this.handleModalShow.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Heads up!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this flight?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalShow.bind(this)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleDelete.bind(this)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <div className="buttons">
                    <EditIcon className="icon" onClick={this.handleEdit.bind(this)}/>
                    <DeleteIcon className="icon danger"/>
                </div> */}

      </>
    )
  }
}
export default Flight;