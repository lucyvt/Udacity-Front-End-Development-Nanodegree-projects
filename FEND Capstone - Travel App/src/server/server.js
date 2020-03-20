const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

/* Middleware*/
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    
    console.log('Example app listening on port 3000!');
    
});