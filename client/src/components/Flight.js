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
            
            <div className = "flight-card">
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}
                
                <div className="flight-card-body">
                    <p>{number} </p>
                    <p>{date}</p>
                    <p>{airport}</p>
                    <p>{economy}</p>
                    <p>{business}</p>
                    <p>{firstC}</p>
                    <p>{dep}</p>
                    <p>{arrival}</p>
                </div>

                <div className="buttons">
                    <EditIcon className="icon" onClick={this.handleEdit.bind(this)}/>
                    <DeleteIcon className="icon danger"/>
                </div>
            
            </div>
        )
    }
  }
  export default Flight;