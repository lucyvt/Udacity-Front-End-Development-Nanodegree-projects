const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

/* Middleware*/
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));
//Creating Routes
app.get('/', (req, res) => {
    
    res.sendFile('/dist/index.html');
});

app.post('/weather-data', async (req,res) => {

    //get api data from darkSky
    const getForecast = await fetch(req.body.url);

    console.log(req.body.url);

    const forecast = getForecast.json();


        const darkSky = {

            tempHigh: Math.round(forecast.daily.data[0].tempratureHigh),
            tempLow: Math.round(forecast.daily.data[0].temperatureLow),
            icon: forecast.daily.data[0].icon,
            summary: forecast.daily.data[0].summary
        }

        res.send(darkSky);
        console.log(darkSky);

    // }).catch( (error) => {
    //     console.log('Error', error);
    // })

    
})
// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    
    console.log('Example app listening on http://localhost:3000/');
    
});


module.exports = app