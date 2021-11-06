import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

class Flight extends React.Component{
    handleEdit(){

    }
    render(){
        const{number,date,airport,economy,business,firstC,dep,arrival} = this.props
        
        return(
            
            <>
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}
                
                <tr className="flight-card">
                    <td>{number} </td>
                    <td>{date}</td>
                    <td>{airport}</td>
                    <td>{economy}</td>
                    <td>{business}</td>
                    <td>{firstC}</td>
                    <td>{dep}</td>
                    <td>{arrival}</td>
                    <td><EditIcon className="icon" onClick={this.handleEdit.bind(this)}/></td>
                    <td><DeleteIcon className="icon danger"/></td>
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