import React, { Component } from 'react'
import Trip from '../components/Trip'
import MyHeader from '../components/MyHeader'
import Booking from '../components/Booking'

export default class Home extends Component {
    


        
    
    render() {
        return (
            <div className="flex-col" >
                <MyHeader/>
                <div className="trip-search-results">
                    <Trip/>
                    <Trip/>
                    <Trip/>
                    <Trip/>
                    <Trip/>
                    <Trip/>
                    
                </div>
            </div>
        )
    }
}
