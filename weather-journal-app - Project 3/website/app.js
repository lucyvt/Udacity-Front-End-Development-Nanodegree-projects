/* Global Variables */


// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=6e982cc853f655889dc57517af0dd134';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener('click', getResults);
/* Function called by event listener */
function getResults(event) {

    event.preventDefault();

    const zipCode = document.querySelector('#zip').value;
    const userFeelings = document.querySelector('#feelings').value;

    getWeatherData(baseURL, zipCode, apiKey)
    .then( function (data) {

        postWeatherData('/add', {date: newDate, temp: data.main.temp, userFeelings })
        
    .then(function (newData) {

        // call updateElement to update browser content
        updateElement();   
    });
    
});
}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) => {

    const res = await fetch(baseURL + zipCode + apiKey);

    try {
        // if data equals to the fetch function results
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */

const postWeatherData = async (url = '', data = {}) => {
     
    const req = await fetch(url, {

        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
           
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
     });

     try {
         const newData = await req.json();
         return newData;
     } catch(error) {
         console.log('error', error);
     }
};
/* Function to GET Project Data */
const updateElement = async () => {

    const request = await fetch('/all');
    try {
        const allData = await request.json();
        
        //update values with new entry

        document.querySelector('#date').innerHTML = allData.date;
        document.querySelector('#temp').innerHTML = allData.temp;
        document.querySelector('#content').innerHTML = allData.userFeelings;
    
    } catch(error) {

        console.log('error', error);
    }
};