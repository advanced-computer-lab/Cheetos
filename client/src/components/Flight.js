import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Flight extends React.Component {
    state = {
        edit: false,
        showModal : false
    }
    handleEdit() {
        this.setState(
            {
                edit: !this.state.edit
            }
        )
    }

    handleModalShow() {
        this.setState({
          showModal: this.state.showModal ? false : true,
        });
      }
    render() {
        const { number, date, airport, economy, business, firstC, dep, arrival,terminal } = this.props
        const { edit ,showModal} = this.state

        return (

            <>
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}

                <tr className="flight-card">
                    {!edit ?
                        <>
                            <td> {number}</td>
                            <td>{date}</td>
                            <td>{airport}</td>
                            <td>{economy}</td>
                            <td>{business}</td>
                            <td>{firstC}</td>
                            <td>{dep}</td>
                            <td>{arrival}</td>
                            <td>{terminal}</td>
                        </>
                        :

                        <>
                            <td> <Form.Control style={{ width: '60%'  }} size="sm" type="text" placeholder="Small text" value={number} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={date} /> </td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={airport} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={economy} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={business} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={firstC} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={dep} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={arrival} /></td>
                            <td> <Form.Control style={{ width: '60%' }} size="sm" type="text" placeholder="Small text" value={terminal} /></td>
                        </>
                    }
                    <td onClick={this.handleEdit.bind(this)}>
                        {!edit ?
                            <EditIcon className="icon" onClick={this.handleEdit.bind(this)} />
                            : <p style = {{margin : '0' , fontWeight : 'bold'}}className="icon"> save </p>}
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
          <Button variant="primary" onClick={this.handleModalShow.bind(this)}>
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