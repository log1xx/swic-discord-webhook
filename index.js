const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');

//import routes
const alertsRoute = require('./routes/alerts');

//middleware
app.use(express.json());
app.use(cors());
//middleware routes
app.use('/alerts', alertsRoute);

//run web server
app.listen(
    process.env.PORT,
    () => console.log(`alive on  http://localhost:${process.env.PORT}`)
);
