import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import ClassStepper from './ClassStepper';
import '../style/seats.css';
//test visa  = 4242424242424242 
//test mastercard = 5555555555554444



const CURRENCY = 'USD';
const  STRIPE_PUBLISHABLE = "pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz";
const PAYMENT_SERVER_URL   = 'http://localhost/8000/api/';

const fromDollarToCent = amount => parseInt(amount * 100);
const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description) => token =>
    axios.post(PAYMENT_SERVER_URL,
        {   
            //***reconcile with backend  */
            userId : sessionStorage.getItem("userId") ,
            // TODO -this is supposed to be used to mail the user his iternary by the backend
            flight : JSON.parse(sessionStorage.getItem("paidFlight")) , 
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment);
export default class Payment extends Component {
    render() {
        const { name, description, amount } = this.props
        return (

            <div className = "flex-col">
                <div className = "stepper">
                    <ClassStepper  />
                </div>
                <StripeCheckout
                    name={name}
                    description={description}
                    amount={fromDollarToCent(amount)}
                    token={onToken(amount, description)}
                    currency={CURRENCY}
                    stripeKey={"pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz"}
                    zipCode
                    email
                    allowRememberMe
                />
            </div>
        )
    }
}
