// Postman: https://app.getpostman.com/join-team?invite_code=ec1609658824064deb784ec6d1b8f935&target_code=135223c5ce89b72bf6a15576f6cb73c7

const express = require("express");
const app = express();
const cors = require("cors");

// Question 1: 'dotenv' is the module name, why? config path to specific file... wut's this mean?
require('dotenv').config({ path : "./config.env"});
const port = process.env.PORT || 5000;      // Use this process object can access the env variable

// use middle-ware
app.use(cors());
app.use(express.json());

// use rountes
app.use(require('./routes/route'));

app.listen(port, ()=> {
    console.log(`Server is running on port: http://localhost:${port}`)
    
})