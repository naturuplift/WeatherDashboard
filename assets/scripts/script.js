// declare global variables
let currentForecast;
let futureForecast;
let locationCity;

// Add a listener for click event search for a city
$('#searchButton').on('click', function () {
  // save value for city entered to variable
  locationCity = $('#locationInput').val();
  // console.log(locationCity) // TODO comment when tested
  // Check if city entered already in history
  if (!isCityInHistory(locationCity)) {
    // Call function to add city to search history
    updateSearchHistory(locationCity);
  }
  weatherDashboard(locationCity);  
});

// function to update seach history, call weather API methods
// and call functions to display current and 5-day forecast
function weatherDashboard(City) {
  // Call geaolocation to find city lat, lon cordinates
  cityGeocodingAPI(City)
    .then(([lat, lon]) => {
      
      currentWeather(City, lat, lon);
    })
    .catch(error => {
      console.error("Error calling cityGeocodingAPI:", error)
    });
  // console.log(geoReturn[0], geoReturn[1]) // TODO comment when tested

  // Call function to display city current forecast
  
  // Call function to display city 5-day forecast
}

// display current weather on dashboard
function currentWeather(City, lat,lon) {
  // Get the current day using Day.js
  let today = dayjs();
  // display name of location, date and weather icon
  cityDisplayandDate = `${City} (` + today.format('D/MM/YYYY') + ')';
  $('.current-card h5').text(cityDisplayandDate);
  // display current temperature, wind speed and humidity
  // display 5-day forecast for location
}

// find city latitude and longitude from city,state code,country code
function cityGeocodingAPI(cityGeo) {
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
        resolve([latCity, lonCity]);
      })
      .catch(error => {
        reject('Error fetching Geocoding:',error); // reject Promise if catch error
    });
  });
}

// here we pass the url we want to call from API and await until fetch responds
async function fetchData(url) {
  const fetcher = await fetch(url)
  const data = await fetcher.json();
  return data;
}

// Function to check if a city is already in history
function isCityInHistory(checkCity) {
  const parts = checkCity.split(",");
  const extractedString = parts[0]; // extract city from string
  const historyItems = $('#searchHistory li');
  for (let i = 0; i < historyItems.length; i++) {
      const historyItemButton = historyItems.eq(i).find('.cityButton');
      const historyItemText = historyItemButton.text();
      if (historyItemText === extractedString) {
          return true; // City is already in history
      }
  }
  return false; // City is not in history
}

// show city on search history as a click button
function updateSearchHistory(updateCity) {
  const parts = updateCity.split(",");
  const extractedString = parts[0]; // extract city from string
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
  const cityName = $(this).data("location");
  // Handle the click action for the city button
  weatherDashboard(cityName);
  console.log(cityName) // TODO comment when tested
  });
}