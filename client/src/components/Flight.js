import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Form from "react-bootstrap/Form";
class Flight extends React.Component {
    state = {
        edit: false
    }
    handleEdit() {
        this.setState(
            {
                edit: !this.state.edit
            }
        )
    }
    render() {
        const { number, date, airport, economy, business, firstC, dep, arrival } = this.props
        const { edit } = this.state
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
                        </>
                    }
                    <td onClick={this.handleEdit.bind(this)}>
                        {!edit ?
                            <EditIcon className="icon" onClick={this.handleEdit.bind(this)} />
                            : <p style = {{margin : '0' , fontWeight : 'bold'}}className="icon"> save </p>}
                    </td>
                    <td><DeleteIcon className="icon danger" /></td>
                </tr>

                {/* <div className="buttons">
                    <EditIcon className="icon" onClick={this.handleEdit.bind(this)}/>
                    <DeleteIcon className="icon danger"/>
                </div> */}

            </>
        )
    }
}
export default Flight;