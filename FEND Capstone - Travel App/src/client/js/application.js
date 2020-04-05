
//create an object that will collect all city info
export let trips = {};


const date = document.querySelector('#user-date');

//constants for APIS
// GeoNames_API
const goeNames_userName = 'nohambeldin';
const geonames_baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const geonames_URL = '&maxRows=10&username=';


//weatherbit_API
const weatherbitKey = '043c1cdc1d9a4d6aa5af1e0f5b8c6797';
const current_baseURL = 'https://api.weatherbit.io/v2.0/current?lat=';
const forecast_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';

//Pixabay_API
const pixabayAPI_KEY = '15718385-e6469b99add168316507ab087';
const pixabay_baseURL = 'https://pixabay.com/api/?key=';
const pixabay_URL = '&image_type=photo&pretty=true&category=places';

//get data from GeoNames_API
export const geoNamesAPI = async (location) => {
    
    console.log('geonames API begins!');

    //send request to the geonames_ap
    const  getCoordinates = await fetch(geonames_baseURL + location + geonames_URL + goeNames_userName)
//catch the error if the api request fails
    .then( (response) => {
      
        return response.json();
            
    }).then( (data) => {

        const coordinates = {

            lat: data.postalCodes[0].lat,
            lng: data.postalCodes[0].lng,
            countryCode: data.postalCodes[0].countryCode,
            city: data.postalCodes[0].placeName,
            country: data.postalCodes[0].countryName
        }
    //add the lat and lon data to the object

          trips.coords = coordinates;

//catch the error if fetch api fails
    }).catch ( (error) => {

        console.log(error);
    });
        
    
    console.log(trips);
}

//get data from weatherbit_API
export const weatherbitAPI =  async (date) => {
    
    console.log("weatherbitAPI API Begins!");
    
    // const corsBlock = 'https://cors-anywhere.herokuapp.com/';
    //to calculate the number of days between today and user-day
    // let today = new Date().toJSON().slice(0, 10);
    // let user_date = new Date(date).toJSON().slice(0, 10);
    const user_date = Math.round(new Date(date).getTime()/1000);
    const today = Math.round(new Date().getTime()/1000);
    const Difference_In_Days = Math.round(Math.abs((today - user_date) / 86400));
    
    // let Difference_In_Days = (function(date1, date2) {

    //     const dt1 = new Date(date1);
    //     const dt2 = new Date(date2);
        
    //     return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    // })(today, user_date);

    console.log(Difference_In_Days);

    const latitude = trips.coords.lat;
    const longitude = trips.coords.lng;

    //check if the user-date is within a weekcoords or after that usin IIFE
   
    let url = (Difference_In_Days > 7) ? forecast_baseURL + latitude + '&lon=' + longitude + '&key=' + weatherbitKey : current_baseURL + latitude + '&lon=' + longitude + '&key=' + weatherbitKey;


    console.log(url);

    const postData = await fetch('http://localhost:3000/forecast', {

        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    });

    const response = postData.json();
    
    response.then( (data) => {

        trips.forecastData = data; //store the weather info. in the project Data object

        trips.dates = Difference_In_Days; //stroe the number of days in the project Data Obj.

    
    }).catch( (error) => {
        console.log(error);
    });
   
    console.log(trips.dates);
}

// Get data from pixabay 
export const pixabayAPI = async(city) => {

    console.log('Pixabay API Begins');

    city = city.replace(/\s/g, '+');
    
    const country = trips.coords.country;
    // const corsBlock = 'https://cors-anywhere.herokuapp.com/';
    //url searches by the given city name
    const url_city =  pixabay_baseURL + pixabayAPI_KEY + '&q='+ city + pixabay_URL;
    //url searches by country name in case that there are not images for the city
    const url_country = pixabay_baseURL + pixabayAPI_KEY + '&q='+ city + ',' + country + pixabay_URL;
    
    const getPixabayAPI = await fetch(url_city);
    let data = await getPixabayAPI.json();
    
        if (data.totalHits > 0) {

            const pic = {

              src: data.hits[0].largeImageURL
            }
    
        trips.pic = pic; //store the image into Object

        } else {

        const getPixabayAPI =  await fetch(url_country);
        
        let data = await getPixabayAPI.json();
        const pic = {
              src: data.hits[0].webformatURL
        }
        trips.pic = pic; //store the image into Object
       

        }
        console.log(trips);
    }
        



/*Update UI */
export function updateUI (trips) {

    console.log("updationg UI!!!!");

    const countdownDays = trips.dates;
    const days = (countdownDays === 1) ? 'day' : 'days';
    const imgUrl = trips.pic.src;
    const d_temp_high = Math.round(trips.forecastData.daily_tempHigh);
    const d_temp_low = Math.round(trips.forecastData.daily_tempLow);
    const temp = Math.round(trips.forecastData.current_temp);
    // const feelLikeTemp = Math.round(trips.forecastData.current_feeltemp);
    const d_icon = trips.forecastData.daily_icon;
    const c_icon = trips.forecastData.current_icon;
    /*
    //Skycons
	let d_icon = trips.forecastData.daily_icon;
	let c_icon = trips.forecastData.current_icon;
	let icons = new Skycons({'color' : '#437FF1'});
			
    let iconList = [

        "clear-day",
        "clear-night",
        "partly-cloudy-day",
        "partly-cloudy-night",
        "cloudy",
        "rain",
        "sleet",
        "snow",
        "wind",
        "fog"
    ];		
    console.log(icons);
    
	for (let i = 0; i < iconList.length; i++) {
        
        if (d_icon == iconList[i]) {
            
            icons.set('icon-1', iconList[i]);
					
        }
        if (c_icon == iconList[i]) {

            icons.set('icon-2', iconList[i]);
        }
	}
	icons.play();

 */

    console.log(d_temp_high);

    //display the result section
    document.querySelector('.Res-container').style.display = 'flex';
    //update the country, city Name
    if(trips.coords.country == undefined) {
        
        document.querySelector('.country').innerHTML = trips.coords.city;

    }else {
        
        document.querySelector('.country').innerHTML = trips.coords.city + ', ' + trips.coords.country;

    }
    //update the length of trip
    const end_date = document.querySelector('#end-date').value;
    const start_date = document.querySelector('#start-date').value;
    const getLength = ((date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    })(start_date, end_date);

    document.querySelector('.length').innerHTML = getLength;
    if(getLength > 1) {
        document.querySelector('.ldays').innerHTML = ' days';
    } else {
        document.querySelector('.ldays').innerHTML = 'day';
    }
    //update the countdown days
    document.querySelector('.days').innerHTML = countdownDays + ' ' + days + ' ';
    //update the image of the place
    document.querySelector('.img').src = imgUrl;
    //update the weather information 
    if (countdownDays > 7) {
           
        document.querySelector('.temps').innerHTML = 'Temperature is: ' + temp + '&#8451;';

        document.querySelector('.d-icon').src = '/weather-icons/' + d_icon + '.png';
        document.querySelector('.c-icon').style.display = 'none';

    } else {

        document.querySelector('.temps').innerHTML = 'High- ' + d_temp_high + '&#8451;, Low- ' + d_temp_low + '&#8451;';
        document.querySelector('.c-icon').src = '/weather-icons/' + c_icon + '.png';
        document.querySelector('.d-icon').style.display = 'none';
            
    }
       
}
/* main function */
export const handleSubmit = async (city)=> {

    geoNamesAPI(city)
    .then(() => weatherbitAPI(date))
    .then( () => pixabayAPI(city))
    .then( () => updateUI(trips));

}

