// declare global variables
let currentForecast;
let futureForecast;


// Add a listener for click event search for a location
$('#searchButton').on('click', function () {

  // save value for location entered to variable
  let locationCity = $('#locationInput').val();
  // console.log(locationCity) // TODO comment when tested

  // check is the location is empty
  if (locationCity === '') {

    // Alert user when searching for a empty location input
    alert('Location is empty. Please enter a city, state code, country code.');

  // if entered a location run this code
  } else {
  
    // Check if location entered already in history
    if (!isCityInHistory(locationCity)) {

      // Call function to add location to search history
      updateSearchHistory(locationCity);
    }

    // call weather dashboard to display weather forecast
    weatherDashboard(locationCity);

    // After searching show weather forecast

    // Show the current weather container
    $('#currentWeather').show();

    // Show the 5-day forecast container
    $('#fiveDayForecast').show();

    // Show the 5-day forecast cards
    $('#fiveDayForecastCard').show();
  }
});


// Function to check if a city is already in history
function isCityInHistory(checkCity) {

  // split location at comma
  const parts = checkCity.split(",");

  // extract city from string
  const extractedString = parts[0];

  // set reference for history items from html city buttom list
  const historyItems = $('#searchHistory li');

  // run loop over the search history to find if location match
  for (let i = 0; i < historyItems.length; i++) {

    // select and store reference to button element that have location name
    const historyItemButton = historyItems.eq(i).find('.cityButton');
    //extract location name text from search history button
    const historyItemText = historyItemButton.text();

    // return true so city is not added to search history
    if (historyItemText === extractedString) {

      // when location is already in history stop checking
      return true;
    }
  }

  // when location is not in search history
  return false;
}


// show city on search history as a click button
function updateSearchHistory(updateCity) {

  // split address at comma
  const parts = updateCity.split(",");

  // extract city from string
  const extractedString = parts[0];

  // created button into html and add city searched
  const cityCard = `
    <li class="list-group-item">
      <button class="btn btn-secondary btn-block cityButton" data-location="${updateCity}">${extractedString}</button>
    </li>
  `;

  // append city search to search history
  $("#searchHistory").append(cityCard);

  // Handle clicks on city buttons
  $("#searchHistory").on("click", ".cityButton", function () {

    // extract city, state code and country code
    const cityName = $(this).data("location");

    // Handle the click action for the city button
    weatherDashboard(cityName);

    console.log("City selected from search history:", cityName) // TODO comment when tested
  });
}


// function to update seach history, call weather API methods
// and call functions to display current and 5-day forecast
function weatherDashboard(city) {

  // Call geaolocation to find city lat, lon cordinates
  cityGeocodingAPI(city)
  .then(([lat, lon]) => {

    // check API lat, lon output for the city
    console.log(city, lat, lon) // TODO comment when tested

    // Call function to display city current forecast
    currentAndForecastWeather(city, lat, lon);
    // Call function to display city 5-day forecast
    // display 5-day forecast for location

  })
  // catch error for Geo API call
  .catch(error => {

    // console message for API call error
    console.error("Error calling cityGeocodingAPI:", error)

  });
}


// display current and forecast weather on dashboard
// show City, Date, Weather-Icon, Temperature, Wind-Speed and Humidity in current weather
// show Date Weather-Icon, Temperature, Wind-Speed and Humidity in forecast weather
function currentAndForecastWeather(city, lat,lon) {

  // Call currentAndForecastWeatherAPI to current and forecast weather
  currentAndForecastWeatherAPI(lat,lon)
  .then(([lat, lon]) => {

    // check API lat, lon output for the city
    console.log(city, lat, lon) // TODO comment when tested

    // Call function to display city current forecast
    viewCurrentWeather(city);
    // Call function to display city 5-day forecast
    // display 5-day forecast for location

  })
  // catch error for Geo API call
  .catch(error => {

    // console message for API call error
    console.error("Error calling currentWeatherForecastAPI:", error)

  });
}


// 
function viewCurrentWeather(city) {
  // 
  // Get the current day using Day.js
  let today = dayjs();

  // split address at comma
  const parts = city.split(",");

  // extract city from string
  const extractedString = parts[0];

  // display name of location, date and weather icon
  cityDisplayandDate = `${extractedString} (` + today.format('D/MM/YYYY') + ')';

  // set display to html card for current weather
  $('.current-card h5').text(cityDisplayandDate);

  // display current temperature, wind speed and humidity
}


function viewForescastWeather() {
  // 
}


// find city latitude and longitude from city,state code,country code
function currentAndForecastWeatherAPI(lat, lon) {

  // configure recipe API method and parameters

  // Required - Your unique API key
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';

  // Required -  	Latitude, decimal (-90; 90), Longitude, decimal (-180; 180)
  let geoLocation = 'lat=' + lat + '&' + 'lon=' + lon;

  // optional parameters: exclude, units and lang
  let parameters = 'exclude=minutely,hourly,daily,alerts' + '&' + 'units=metric' + '&' + 'lang=eng';

  // API call
  const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?' + geoLocation + '&' + parameters + '&' + AUTH;

  // return a fetch promise that resolves with city latitude and longitude
  return new Promise((resolve, reject) => {
    fetchData(apiUrl)
      .then(data => {

        // save latitude and longitude from data
        const latCity = data[0].lat;
        const lonCity = data[0].lon;

        //return latitude and longitude for city
        resolve([latCity, lonCity]);

      })
      // catch error
      .catch(error => {

        // reject Promise if catch error
        reject('Error fetching Geocoding:',error);
    });
  });
}


// find city temperature
function cityGeocodingAPI(cityGeo) {

  // configure recipe API method and parameters

  // Required - Your unique API key
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';

  // optional parameters: Number of the locations in the API response
  let limit = 'limit=1';

  // API call
  const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityGeo + '&' + AUTH + '&' + limit;

  // return a fetch promise that resolves with city latitude and longitude
  return new Promise((resolve, reject) => {
    fetchData(apiUrl)
      .then(data => {

        // save latitude and longitude from data
        const latCity = data[0].lat;
        const lonCity = data[0].lon;

        //return latitude and longitude for city
        resolve([latCity, lonCity]);

      })
      // catch error
      .catch(error => {

        // reject Promise if catch error
        reject('Error fetching Geocoding:',error);
    });
  });
}


// here we pass the url we want to call from API and await until fetch responds
async function fetchData(url) {
  // await to return json fetch
  const fetcher = await fetch(url)
  const data = await fetcher.json();

  return data;
}