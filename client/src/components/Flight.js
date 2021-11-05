import React from 'react';

class Flight extends React.Component{
    render(){
        const{number,date,airport,economy,business,firstC,dep,arrival} = this.props
        return(
            
            <div className = "flight-card">
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}
                <div>
                    <h4> Flight Number :  {number} </h4>
                    <h5> Flight Date :{date}</h5>
                </div>


                <div className ="flight-card-body">
                     <div>
                        <p><strong> Airport :</strong> {airport}</p>
                        <p><strong>Economy Class Seats :</strong> {economy}</p>
                       <p> <strong>Business Class Seats : </strong>{business}</p>
                       <p> <strong>First Class Seats : </strong> {firstC}</p>
                    </div>

                    <div>
                        <p> <strong>Departure time : </strong>{dep}</p>
                        <p> <strong>Arrival time :</strong> {arrival}</p>
                    </div>
                    
                </div>
                
                
            </div>
        )
    }
  }
  export default Flight;