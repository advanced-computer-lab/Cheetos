import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
export default class Test extends Component {
    state = {
        startDate: new Date()
    };
    setStartDate = picked => {
        this.setState({ startDate: picked });
    };
    render() {
        return (
            
                    <DatePicker 
                        style = { { width : '2em' , height : '20vh' , padding : '2em'}}
                        selected={this.state.startDate}
                        onChange={date => this.setStartDate(date)}
                        // dateFormat="MMMM d, yyyy"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        // maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                    />
             
        )
    }
}
