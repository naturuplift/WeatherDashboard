// declare global variables
let currentForecast;
let futureForecast;


// Add a listener for click event search for a city
$('#searchButton').on('click', function () {

  // save value for city entered to variable
  let locationCity = $('#locationInput').val();
  // console.log(locationCity) // TODO comment when tested

  // check is the location is empty
  if (locationCity === '') {

    // Alert user when searching for a empty location input
    alert('Location is empty. Please enter a city, state code, country code.');

  // if entered a location run this code
  } else {
  
    // Check if city entered already in history
    if (!isCityInHistory(locationCity)) {

      // Call function to add city to search history
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

  // split address at comma
  const parts = checkCity.split(",");

  // extract city from string
  const extractedString = parts[0];
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
function weatherDashboard(City) {

  // Call geaolocation to find city lat, lon cordinates
  cityGeocodingAPI(City)
  .then(([lat, lon]) => {

    // check API lat, lon output for the city
    console.log(City, lat, lon) // TODO comment when tested

    // Call function to display city current forecast
    currentWeather(City, lat, lon);
    // Call function to display city 5-day forecast

  })
  // catch error for Geo API call
  .catch(error => {

    // console message for API call error
    console.error("Error calling cityGeocodingAPI:", error)

  });
}


// display current weather on dashboard
// show City, Date, Weather-Icon
// show Temperature, Wind-Speed and Humidity
function currentWeather(City, lat,lon) {

  // Get the current day using Day.js
  let today = dayjs();
  // split address at comma
  const parts = City.split(",");
  // extract city from string
  const extractedString = parts[0];

  // display name of location, date and weather icon
  cityDisplayandDate = `${extractedString} (` + today.format('D/MM/YYYY') + ')';

  // set display to html card for current weather
  $('.current-card h5').text(cityDisplayandDate);

  // display current temperature, wind speed and humidity
  // display 5-day forecast for location
}


// find city latitude and longitude from city,state code,country code
function currentWeatherForecastAPI(cityGeo) {

  // configure recipe API method and parameters
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';
  let limit = 'limit=1';
  const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityGeo + '&' + AUTH + '&' + limit;

  // return a fetch promise that resolves with city latitude and longitude
  return new Promise((resolve, reject) => {

    fetchData(apiUrl)

      .then(data => {

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

// find city latitude and longitude from city,state code,country code
function fiveDayWeatherForecastAPI(cityGeo) {

  // configure recipe API method and parameters
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';
  let limit = 'limit=1';
  const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityGeo + '&' + AUTH + '&' + limit;

  // return a fetch promise that resolves with city latitude and longitude
  return new Promise((resolve, reject) => {

    fetchData(apiUrl)

      .then(data => {

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
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';
  let limit = 'limit=1';
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

  const fetcher = await fetch(url)
  const data = await fetcher.json();

  return data;
}