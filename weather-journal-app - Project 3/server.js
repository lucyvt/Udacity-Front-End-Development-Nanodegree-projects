// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependancies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

server = app.listen(port, listening);

function listening() {

	console.log('server running');
}

//GET route returns projectData

app.get('/all', function (req, res) {

	res.send(projectData);
});

//POST route that adds incoming data to projectData

const data = [];

app.post('/add', function(req, res) {

	projectData['date'] = req.body.date;
	projectData['temperature'] = req.body.temp;
	projectData['content'] = req.body.content;

	res.send(projectData);
	
});