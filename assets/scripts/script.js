// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(  function () {

  // Get the current day using Day.js
  let today = dayjs();
  let weatherForecast;
  let locationCity;
  let latCity;
  let lonCity;

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
   // Here save user input to local storage using the id in the containing time-block.
   $('#searchButton').on('click', function () { // add event listener

    locationCity = $('#locationInput').val();
    // console.log(locationCity) // TODO comment when tested

    // configure recipe API method and parameters
    let query = locationCity;
    let AUTH = 'appid=22c3eb9ede3421b2f412a925f97e46ae';
    let limit = 'limit=1';
    const uri = 'http://api.openweathermap.org/geo/1.0/direct?q=' + query + '&' + AUTH + '&' + limit;

    // fetch for location latitude and longitude
    fetchData(uri).then(data => {
      weatherForecast = data;
      latCity = weatherForecast[0].lat;
      lonCity = weatherForecast[0].lon;
      displayWeatherCity(latCity,lonCity);

      const cityLocation = {
        location: locationCity,
        lat: weatherForecast[0].lat,
        lon: weatherForecast[0].lon
      };

      // Store data in local storage
      localStorage.setItem('cityLocation', JSON.stringify(cityLocation));

      // created button into html and add city searched
      var cityCard = `
        <li class="list-group-item">
          <button class="btn btn-secondary col cityButton" type="button">"${locationCity}"</button>
        </li>
      `;

      // append city search to search history
      $("#searchHistory").append(cityCard);

      // Handle clicks on city buttons
      $("#searchHistory").on("click", ".cityButton", function () {
      const cityName = $(this).text();
      // Handle the click action for the city button
      displayWeatherCity(cityName);
      console.log(cityName)
      });
    });
  });
  
  function displayWeatherCity(lat,lon) {

    cityDisplayandDate = `${locationCity} (` + today.format('D/MM/YYYY') + ')';
    $('.current-card h5').text(cityDisplayandDate);
  }

  // here we pass the url we want to call from API and await until fetch responds
  async function fetchData(url) {
    const fetcher = await fetch(url)
    const data = await fetcher.json();
    return data;
  }
});