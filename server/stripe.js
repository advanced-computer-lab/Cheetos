const configureStripe = require("stripe");

const STRIPE_SECRET_KEY = process.env.NODE_ENV;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
