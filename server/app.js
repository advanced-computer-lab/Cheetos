const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require("dotenv").config();
const connectDB = require('./db.js')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


const routes = require("./routes/api/flights");

connectDB()
app.use("/api", routes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
