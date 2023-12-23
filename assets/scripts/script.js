
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
      <button class="btn btn-secondary btn-block cityButton" style="background-color: rgb(87, 80, 117); color: white;" data-location="${updateCity}">${extractedString}</button>
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

    // console.log("City selected from search history:", cityName) // TODO comment when tested
  });
}


// function to update seach history, call weather API methods
// and call functions to display current and 5-day forecast
function weatherDashboard(city) {

  // Call geaolocation to find city lat, lon cordinates
  cityGeocodingAPI(city)
  .then(([lat, lon]) => {

    // check API lat, lon output for the city
    // console.log(city, lat, lon) // TODO comment when tested

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


// call API for current and forecast weather
function currentAndForecastWeather(city, lat, lon) {

  // Call currentAndForecastWeatherAPI for current and forecast weather
  currentAndForecastWeatherAPI(lat,lon)
  .then(([legibleDate, weatherIcon, temp, windSpeed, humidity]) => {

    // check API data output for current weather location
    // console.log(legibleDate,weatherIcon,temp,windSpeed,humidity) // TODO comment when tested

    // After searching show weather forecast

    // Show the current weather container
    $('#currentWeather').show();

    // Show the 5-day forecast container
    $('#fiveDayForecast').show();

    // Show the 5-day forecast cards
    $('#fiveDayForecastCard').show();
    
    // Call function to display city current forecast
    viewCurrentWeather(city, legibleDate[0], weatherIcon[0], temp[0], windSpeed[0], humidity[0]);

    // Remove the first element for current weather
    const DateForecast = legibleDate.slice(1);
    const weatherIconForecast = weatherIcon.slice(1);
    const tempForecast = temp.slice(1);
    const windSpeedForecast = windSpeed.slice(1);
    const humidityForecast = humidity.slice(1);

    // check API data output for forecast weather location
    // console.log(DateForecast, weatherIconForecast, tempForecast, windSpeedForecast, humidityDateForecast) // TODO comment when tested

    // Call function to display city 5-day forecast
    viewForescastWeather(DateForecast, weatherIconForecast, tempForecast, windSpeedForecast, humidityForecast);

  })
  // catch error for Geo API call
  .catch(error => {

    // console message for API call error
    console.error("Error calling currentWeatherForecastAPI:", error)

  });
}


// show City, Date, Weather-Icon, Temperature, Wind-Speed and Humidity in current weather
function viewCurrentWeather(city,legibleDate,weatherIcon,temp,windSpeed,humidity) {

  // split address, date at comma
  const partCity = city.split(",");
  const partDate = legibleDate.split(",");

  // extract city, date from string
  const extractedStringCity = partCity[0];
  const extractedStringDate = partDate[0];

  // display name of location, date and weather icon
  cityDisplayandDate = `${extractedStringCity} (${extractedStringDate})`;

  // set current weather display to html container
  $('.current-card h5').text(cityDisplayandDate);

  // display current weather icon
  cityDisplayandWeatherIcon = `${weatherIcon}`;

  // set weather icon display to html container
  $('.current-card #weather-icon').text(cityDisplayandWeatherIcon);
  
  // display current temperature
  cityDisplayandTemp = `Temp: ${temp} °C`;

  // set temperature display to html container
  $('.current-card #temp').text(cityDisplayandTemp);
  
  // display current wind speed
  cityDisplayandWind = `Wind: ${windSpeed} m/s`;

  // set wind speed display to html container
  $('.current-card #wind').text(cityDisplayandWind);

  // display current humidity
  cityDisplayandHumidity = `Humidity: ${humidity} %`;

  // set humidity display to html container
  $('.current-card #humidity').text(cityDisplayandHumidity);
}


// show Date Weather-Icon, Temperature, Wind-Speed and Humidity in 5-day forecast weather
function viewForescastWeather(legibleDate,weatherIcon,temp,windSpeed,humidity) {

  // check API data input to function for forecast weather location
  // console.log(legibleDate,weatherIcon,temp,windSpeed,humidity) // TODO comment when tested

  // loop to fill weather elements to 5-day cards
  for (let index = 0; index < temp.length; index++) {
    // set card html class index
    let elementDate = `.card-${index} h5`;
    let elementIcon = `.card-${index} #weather-icon`;
    let elementTemp = `.card-${index} #temp`;
    let elementWind = `.card-${index} #wind`;
    let elementHumidity = `.card-${index} #humidity`;

    // split date at comma
    const partDate = legibleDate[index].split(",");

    // extract date from string
    const extractedStringDate = partDate[0];

    // set date current weather display to html card
    $(elementDate).text(extractedStringDate);

    // set weather-icon to html card
    $(elementIcon).text(weatherIcon[index])

    // display current temperature
    displayTemp = `Temp: ${temp[index]} °C`;

    // set temperature display to html card
    $(elementTemp).text(displayTemp);;
    
    // display wind speed
    cityDisplayandWind = `Wind: ${windSpeed[index]} m/s`;

    // set wind speed display to html card
    $(elementWind).text(cityDisplayandWind);

    // display humidity
    cityDisplayandHumidity = `Humidity: ${humidity[index]} %`;

    // set humidity display to html card
    $(elementHumidity).text(cityDisplayandHumidity);
  }  
}


// find weather data for city with latitude and longitude
function currentAndForecastWeatherAPI(lat, lon) {

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

        // define an array to jump values on JSON data
        const array = [0, 8, 16, 24, 32, 39];

        // define arrays to store weather forecast variables
        let legibleDates = [];
        let descriptions = [];
        let weatherIcons = [];
        let temps = [];
        let humiditys = [];
        let windSpeeds = [];

        // Weather icon mapping
        const weatherIconsCondition = {
          "clear sky": "☀️",
          "few clouds": "⛅️",
          "scattered clouds": "🌤️",
          "broken clouds": "🌥️",
          "overcast clouds": "☁️",
          "light rain": "🌧️",
          "moderate rain": "🌧️",
          "heavy intensity rain": "🌧️",
          "very heavy rain": "🌧️",
          "extreme rain": "🌧️",
          "freezing rain": "🌧️❄️",
          "light snow": "🌨️❄️",
          "moderate snow": "🌨️❄️",
          "heavy snow": "🌨️❄️",
          "sleet": "🌨️🌧️",
          "shower rain": "🌦️",
          "thunderstorm": "⛈️",
          "mist": "🌫️",
          "smoke": "🌫️",
          "haze": "🌫️",
          "dust": "🌫️",
          "fog": "🌫️",
          "sand": "🌫️",
          "dust storm": "🌫️",
          "tornado": "🌪️",
          "unknown": "❓",
        };

        // loop to extract 
        for (let index = 0; index < array.length; index++) {

          // convert date to format i.e.: 12/22/2023, 5:00:00 AM
          const legibleDate = new Date(data.list[array[index]].dt * 1000).toLocaleString();
          legibleDates.push(legibleDate); // Add the value to the new array

          // describes weather condition
          const description = data.list[array[index]].weather[0].description;
          descriptions.push(description); // Add the value to the new array

          // weather condition icon
          const weatherIcon = weatherIconsCondition[description] || "Unknown";
          weatherIcons.push(weatherIcon); // Add the value to the new array

          // weather temperature
          const temp = data.list[array[index]].main.temp;
          temps.push(temp); // Add the value to the new array

          // weather wind speed
          const windSpeed = data.list[array[index]].wind.speed;
          windSpeeds.push(windSpeed); // Add the value to the new array

          // weather humidity
          const humidity = data.list[array[index]].main.humidity;
          humiditys.push(humidity); // Add the value to the new array
        }

        // Printing the extracted data
        // console.log("Legible Date:", legibleDates); // TODO comment when tested
        // console.log("Description:", descriptions); // TODO comment when tested
        // console.log("Weather Icon:", weatherIcons); // TODO comment when tested
        // console.log("Temperature:", temps); // TODO comment when tested
        // console.log("Wind Speed:", windSpeeds); // TODO comment when tested
        // console.log("Humidity:", humiditys); // TODO comment when tested

        //return current forecast
        resolve([legibleDates,weatherIcons,temps,windSpeeds,humiditys]);

      })
      // catch error
      .catch(error => {

        // reject Promise if catch error
        reject('Error fetching currentAndForecastWeatherAPI:',error);
    });
  });
}


// find city temperature
function cityGeocodingAPI(cityGeo) {

  // Required - Your unique API key
  let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';

  // optional parameters: Number of the locations in the API response
  let limit = 'limit=1';

  // API call
  const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityGeo + '&' + AUTH + '&' + limit;

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