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
            <div>
                <h1>hello   </h1>
                <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={date => this.setStartDate(date)}
                        // dateFormat="MMMM d, yyyy"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        // maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                    />
                </div>
            </div>
        )
    }
}
