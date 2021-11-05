import React from 'react';

class Flight extends React.Component{
    render(){
        const{number} = this.props
        return(
            
            <div className = "">
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}
                <h2> Flight Number :  {number} </h2>
                <p> Departure time :</p>
                <p> Arrival time :</p>
                <p> Flight Date :</p>
                <p> Economy Class Seats : </p>
                <p> Business Class Seats : </p>
                <p> Airport : </p>
                
            </div>
        )
    }
  }
  export default Flight;