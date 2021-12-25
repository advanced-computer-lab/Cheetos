import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import ClassStepper from "./ClassStepper";
import "../style/seats.css";
import api from "../api";
//test visa       =     4242424242424242
//test mastercard =     5555555555554444
const CURRENCY = "USD";
const STRIPE_PUBLISHABLE =
    "pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz";
const PAYMENT_SERVER_URL = "http://localhost:8000/api/payment/";

//PassengerFirstName, PassengerLastName, PassengerType, PassengerPassportNumber , FlightId ,  ChosenSeat , CabinSeat
const fromDollarToCent = (amount) => parseInt(amount * 100);



// let updateFlight = {
//     OldFlightId :  , 
//     OldChosenSeat : , 
//     OldCabinClass : , 
//     NewFlightId : , 
//     NewChosenSeat : , 
//     NewCabinClass : ,
//     PassengerFirstName : , PassengerLastName: , PassengerType: , PassengerPassportNumber
// }

// updateFlight: 
// OldFlightId, OldChosenSeat, OldCabinClass, 
// NewFlightId, NewChosenSeat, NewCabinClass, 
// PassengerFirstName, PassengerLastName, PassengerType, PassengerPassportNumber

async function successPayment(data) {



    alert('Payment Successful');
    const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = JSON.parse(sessionStorage.getItem('deal'))
    let deptSeats = JSON.parse(sessionStorage.getItem("deptSeats"))
    let arrSeats = JSON.parse(sessionStorage.getItem("arrSeats"))
    let passengersInfo = JSON.parse(sessionStorage.getItem("passengersInfo"));
    let deptTickets = []
    let arrTickets = []
    let totalPrice = 0;
    console.log("passengerss areeeeeeeee", passengersInfo);
    // making dept tickets 

    for (let i = 0; i < passengersInfo.length; i++) {
        let passenger = passengersInfo[i];
        let ticket = {
            PassengerFirstName: passenger.firstName,
            PassengerLastName: passenger.lastName,
            PassengerType: passenger.type,
            PassengerPassportNumber: passenger.passport,
            FlightId: deptFlight._id,
            ChosenSeat: deptSeats[i].Seat,
            CabinClass: deptCabin === "EconomySeats" ? "Economy" :
                deptCabin === "BusinessSeats" ? "Business"
                    : deptCabin === "FirstClass" ? "FirstClass" : ''
        }
        deptTickets.push(ticket)
        if (passenger.type === "adult") {
            totalPrice += deptFlight[deptCabin]["PriceAdult"]
        } else {
            totalPrice += deptFlight[deptCabin]["PriceChild"]
        }

        for (let i = 0; i < passengersInfo.length; i++) {
            let passenger = passengersInfo[i];
            let ticket = {
                PassengerFirstName: passenger.firstName,
                PassengerLastName: passenger.lastName,
                PassengerType: passenger.type,
                PassengerPassportNumber: passenger.passport,
                FlightId: deptFlight._id,
                ChosenSeat: deptSeats[i].Seat,
                CabinClass:
                    deptCabin === "EconomySeats"
                        ? "Economy"
                        : deptCabin === "BusinessSeats"
                            ? "Business"
                            : deptCabin === "FirstClass"
                                ? "FirstClass"
                                : "",
            };
            deptTickets.push(ticket);
            if (passenger.type === "adult") {
                totalPrice += deptFlight[deptCabin]["PriceAdult"];
            } else {
                totalPrice += deptFlight[deptCabin]["PriceChild"];
            }
        }

        // return tickets
        for (let i = 0; i < passengersInfo.length; i++) {
            let passenger = passengersInfo[i];
            let ticket = {
                PassengerFirstName: passenger.firstName,
                PassengerLastName: passenger.lastName,
                PassengerType: passenger.type,
                PassengerPassportNumber: passenger.passport,
                FlightId: arrFlight._id,
                ChosenSeat: arrSeats[i].Seat,
                CabinClass: arrCabin === "EconomySeats" ? "Economy" :
                    deptCabin === "BusinessSeats" ? "Business" :
                        deptCabin === "FirstClass" ? "FirstClass" : ''
            }
            arrTickets.push(ticket)
            if (passenger.type === "adult") {
                totalPrice += arrFlight[arrCabin]["PriceAdult"]
            } else {
                totalPrice += arrFlight[arrCabin]["PriceChild"]
            }
        }
        let ticketsArr = deptTickets.concat(arrTickets)
        console.log(ticketsArr);
        sessionStorage.setItem("ticketsArr", JSON.stringify(ticketsArr))
        sessionStorage.setItem("totalPrice", totalPrice)
        let reservation = {
            UserId: localStorage.getItem("userId"),
            TotalPrice: sessionStorage.getItem("totalPrice"),
            Reservation: JSON.parse(sessionStorage.getItem("ticketsArr"))
        }
        console.log("reservation object--->", reservation)
        let payload = {
            depFlight: deptFlight,
            arrFLight: arrFlight
        }
        await api.confirmFlight(reservation).then((res) => {
            console.log("ressssssss is ", res)
            api.payReservation(res.data.data, payload).then(
                alert("mail sent successfuly")
            )
        }
        )

    }
}

const errorPayment = (data) => {
    alert("Payment Error");
};

const onToken = (amount, description) => token =>
    axios.post(PAYMENT_SERVER_URL,
        {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount)
        },

        {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }

    )
        .then(successPayment)
// .catch(errorPayment);
export default class Payment extends Component {
    render() {
        const { name, description, amount } = this.props;
        return (
            <div className="flex-col">
                <StripeCheckout
                    name={name}
                    description={description}
                    amount={fromDollarToCent(amount)}
                    token={onToken(amount, description)}
                    currency={CURRENCY}
                    stripeKey={
                        "pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz"
                    }
                    zipCode
                    email
                    allowRememberMe
                />
            </div>
        );
    }
}
