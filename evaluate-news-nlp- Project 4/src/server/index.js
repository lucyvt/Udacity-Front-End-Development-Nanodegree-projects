const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
var path = require('path')

const mockAPIResponse = require('./mockAPI.js')

const app = express()

/* Middleware*/
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(express.static('dist'))

// console.log(__dirname)

/*set Aylien textAPI */

var aylien = require("aylien_textapi");

var AylienAPI = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

/* Routers */

app.get('/', function (req, res) {
    
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/article', (req, res) => {
    console.log(req);

    AylienAPI.sentiment({
        'url': req.body.url,
        mode: 'document'
    }, (error, Response) => {
        console.log('Sentiment Analysis is DONE!!!', response)
        res.send(response)
    });
})