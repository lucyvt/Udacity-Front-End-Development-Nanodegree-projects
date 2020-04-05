const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const skycons = require('skycons');

/* Middleware*/
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));
//Creating Routes
app.get('/', function (req, res) {
    
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    
})

app.post('/forecast', async (req,res) => {

    //get api data from weatherbit
    const getForecast = await fetch(req.body.url);

    // console.log(req.body.url);
    const response = getForecast.json();
    // .then( (response) => {
    //     return response.json();
    // })
    response.then ( (forecast) => {
        
        const weatherbit = {
            current_temp: forecast.data[0].temp,
            // current_feeltemp: forecast.data[0].app_temp,
            current_icon: forecast.data[0].weather.icon,
            daily_tempHigh: forecast.data[0].max_temp,
            daily_tempLow: forecast.data[0].low_temp,
            daily_icon: forecast.data[0].weather.icon
            
        }

        res.send(weatherbit);

    }).catch ( (error) => {
        console.log(error);
    })
        // console.log(darkSky);
    
})

// app.post('/all', (req, res) => {
//     res.send(trips);
//     console.log(trips);
// })
// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    
    console.log('Example app listening on http://localhost:3000/');
    
});


module.exports = app