/*
const submitBtn = document.querySelector('.save-btn');

const resetBtn = document.querySelector('.remove-btn');

submitBtn.addEventListener('click', function () {
    
    console.log(cityName);
    
});

*/

//create an object that will collect all city info
const projectData = {};

//DOM the date and location inputs
// const userDate = document.querySelector('#user-date').value;
// const cityName = document.querySelector('#user-location').value;

//get data from GeoNames_API
export const geoNamesAPI = async (city) => {
    //send request to the geonames_api

    const user_name = 'nohambeldin';

    const url = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + city + '&maxRows=10&username=' + user_name;

    const  getCoordinates = await fetch(url);
//catch the error if the api request fails
    getCoordinates.then( (response) => {
      
        return response.json();
            
    }).then((data) => {

        const coordinates = {

            lat: data.postalCodes[0].lat,
            lng: data.postalCodes[0].lng,
            countryCode: data.postalCodes[0].countryCode,
            city: data.postalCodes[0].placeName,
            country: data.postalCodes[0].countryName
        }

        //add the lat and lon data to the object
        projectData.coordinates = coordinates;
        console.log(projectData);

//catch the error if fetch api fails
    }).catch ( (error) => {

        console.log('Error', error);
    });
        

}
/*get data from DarkSky_API */
const darkSkyAPI =  async (projectData, date) => {

    const darkSkyKey = '542c4f372860bb9b5bb69fcf6f394842';
    const corsBlock = 'https://cors-anywhere.herokuapp.com/';
    //convert the user-date into unix time
    const unix_user_date= Math.round(new Date(userDate.value).getTime()/1000);
    const unix_today_date = Math.round(new Date().getTime()/1000);
    const unix_daysBetween = Math.round(new Date((unix_user_date - unix_today_date))/86400); //to calculate the number of days between today and user-day
    const latitude = projectData.coordinates.lat;
    const longitude = projectData.coordinates.lng;

    //check if the user-date is within a week or after that
    const url = (unix_daysBetween > 7) ? corsBlock + 'https://api.darksky.net/forecast/' + darkSkyKey + '/' + latitude + ',' + longitude + ',' + unix_user_date : corsBlock + 'https://api.darksky.net/forecast/' + darkSkyKey + '/' + latitude + ',' + longitude;

    const postData = await fetch('http://localhost:3000/weather-data', {

        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    });

    postData.then( (response) => {
        return response.json();
    })
    .then( (data) => {

        projectData.weatherData = data; //store the weather info. in the project Data object

        projectData.date = daysBetween; //stroe the number of days in the project Data Obj.

        console.log(projectData);

    }).catch( (error) => {
        console.log('Error', error);
    });
  
}
/* Get data from pixabay */
const pixabayAPI = async(city) => {

    keyword = city.replace(/\s/g, '+');
    const pixabayAPI_KEY = '15718385-e6469b99add168316507ab087';
    const country = projectData.coordinates.country;
    const corsBlock = 'https://cors-anywhere.herokuapp.com/';
    //url searches by the given city name
    const url_city = corsBlock + 'https://pixabay.com/api/?key=' + pixabayAPI_KEY + '&q='+ keyword + '&image_type=photo&pretty=true';
    //url searches by country name in case that there are not images for the city
    const url_country = corsBlock + 'https://pixabay.com/api/?key=' + pixabayAPI_KEY + '&q='+ keyword + ',' + country + '&image_type=photo&pretty=true';
    
    const getPixabayAPI = await fetch(url_city);
    const data = getPixabayAPI.json();
    
    if (data.hits.length > 0) {

        const cityImage = {

            src: data.hits[0].webformatURL
        }
    
        projectData.cityPic = cityImage; //store the image into Object
        console.log(projectData);

    } else {

        const getPixabayAPI =  await fetch(url_country);
        const data = getPixabayAPI.json();
        const cityImage = {
            src: data.hits[0].webformatURL
        }
        projectData.cityPic = cityImage; //store the image into Object
        console.log(projectData);
    } 
}
/*Update UI */
const updateUI = (data) => {


    const countdownDays = projectData.date;
    const days = (countdownDays === 1) ? 'day' : 'days';

       //update the country, city Name
    document.querySelector('.country').innerHTML = projectData.coordinates.city + ', ' + projectData.coordinates.country;
       //update the countdown days
    document.querySelector('.days').innerHTML = countdownDays + ' ' + days + ' ';
       //update the image of the place
    document.querySelector('.image-loc').setAttribute('src', projectData.cityPic.src);
       //update the weather information 
       if (projectData.weatherData.summary == undefined) {
           
            document.querySelector('.temps').innerHTML = 'High- ' + projectData.weatherData.tempHigh + ', Low- ' + projectData.weatherData.tempLow;

            document.querySelector('.weather-info').style.display = 'none';
       } else {

            document.querySelector('.temps').innerHTML = 'High- ' + projectData.weatherData.tempHigh + ', Low- ' + projectData.weatherData.tempLow;
            document.querySelector('.weather-info').innerHTML = projectData.weatherData.summary + projectData.weatherData.icon;

       }
       
}

/* main functions */

export const get_API = async (city)=> {

    geoNamesAPI(city)
    .then(() => darkSkyAPI(projectData, date))
    .then( () => pixabayAPI(city))
    .then( () => updateUI(projectData));
}