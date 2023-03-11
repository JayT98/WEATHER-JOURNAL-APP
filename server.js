// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for Cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, function(){
    console.log("listening on port: " + port);
});

// Initialize all route with a callback function
app.get("/all", getAll);

// Callback function to complete GET
function getAll(req,res){
    res.status(200).send(projectData);
}

// Post Route
app.post("/add", postData);

function postData(req,res){
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}