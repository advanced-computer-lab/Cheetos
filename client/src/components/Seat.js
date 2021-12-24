import React, { Component } from 'react'

export default class Seat extends Component {
    state = {
        chosen: this.props.parentChosen
    }
    handleChoseSeat(seat) {

        if (this.props.canChose) {
            this.setState({
                //increment/decrement num of chosen seats
                chosen: !this.state.chosen
            }, () => this.props.parentChoseSeats(seat, this.state.chosen))
        } else {
            if (this.state.chosen) {
                this.setState({
                    //increment/decrement num of chosen seats
                    chosen: false
                }, () => this.props.parentChoseSeats(seat, this.state.chosen))
            }

        }

    }
    render() {
        const { seat } = this.props
        return (
            <div className={seat.Reserved ? "taken-seat" : this.state.chosen ? "chosen-seat" : "seat"} onClick={!seat.Resrved ? this.handleChoseSeat.bind(this, seat) : ''}>
                <p>{seat.Seat}</p>
            </div>
        )
    }
}
