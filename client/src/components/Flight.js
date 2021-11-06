import React from 'react';

class Flight extends React.Component{
    render(){
        const{number,date,airport,economy,business,firstC,dep,arrival} = this.props
        return(
            
            <div className = "flight-card">
                {/* flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport */}
                
                <div className="flight-card-body">
                    <p> {number} </p>
                    <p> {date}</p>
                    <p>{airport}</p>
                    <p>{economy}</p>
                    <p> {business}</p>
                    <p>{firstC}</p>
                    <p> {dep}</p>
                    <p>{arrival}</p>
                </div>

                <div>

                </div>
            
            </div>
        )
    }
  }
  export default Flight;