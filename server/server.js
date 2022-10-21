// Postman: https://app.getpostman.com/join-team?invite_code=ec1609658824064deb784ec6d1b8f935&target_code=135223c5ce89b72bf6a15576f6cb73c7

const express = require("express");
const app = express();
const cors = require("cors");

const port = 5001;

// use middle-ware
app.use(cors());
app.use(express.json());

// use rountes
app.use(require('./routes/route'));

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`)
})