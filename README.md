
# Weather Dashboard Project

<br/>
<p align="center">
    <a href="https://unb.ca/cel/bootcamps/coding.html">
        <img alt="University of New Brunswick" src="https://img.shields.io/static/v1.svg?label=bootcamp&message=UNB&color=red" /></a>
    <a href="https://jquery.com/" >
        <img alt="JavaScript - jQuery" src="https://img.shields.io/static/v1.svg?label=JavaScripts&message=jQuery&color=blue" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction" >
        <img alt="JavaScript - Web APIs" src="https://img.shields.io/static/v1.svg?label=JavaScripts&message=Web APIs&color=green" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces" >
        <img alt="JavaScript - DOM" src="https://img.shields.io/static/v1.svg?label=JavaScript&message=DOM&color=violet" /></a>
</p>
<br/>

Welcome to the Weather Dashboard Project! This web application allows users to search for a location and retrieve the current weather conditions and forecast for a specific location. The dashboard provides real-time weather information using the OpenWeather API, ensuring you stay informed about the atmospheric conditions when you plan a trip.

## Getting Started

To use the weather dashboard, simply visit the [Weather Dashboard Page][weather-dash]. Enter the desired location in the search bar and press the search button to retrieve the weather data.

## Weather Information for a City

![weather](https://github.com/naturuplift/weather-dashboard/assets/23546356/9067f272-4af1-4924-b435-897cf3f3b984)

The weather Dashboard for a city display the following information:

-   Current Weather
    - Date
    - Icon Representation of Weather Conditions
    - Temperature
    - Wind Speed
    - Humidity

-   5-Day Forecast
    - Date
    - Icon Representation of Weather Conditions
    - Temperature
    - Wind Speed
    - Humidity

## Search History

The application keeps a record of your search history, allowing you to quickly revisit weather information for previously searched locations.

## Source Code
Explore the inner workings of the Password Generator by checking out the [source code on GitHub][javascript-code]. Feel free to contribute and enhance the project!

# User Interface Overview

## Search Bar

Enter the desired location **City name, state code and country code** in the search bar to retrieve weather information.

![search](https://github.com/naturuplift/weather-dashboard/assets/23546356/472f63d9-a70b-47c3-ac4c-c98b155adc8c)


Search-Bar

## Weather Information Display

View real-time weather information, including temperature, humidity, wind speed, and humidity.

![information](https://github.com/naturuplift/weather-dashboard/assets/23546356/87350154-ae7b-4386-80d0-7323f29d5ce6)


Weather-Information

## 5-Day Forecast

Check the 5-day forecast to plan ahead.

![5-day](https://github.com/naturuplift/weather-dashboard/assets/23546356/9e7b4968-6200-4d06-89dc-3e674a6f454c)


5-Day-Forecast

## How to Use the OpenWeather API

To use the OpenWeather API to fetch weather data for a location, follow these steps:

### 1. Sign Up for an API Key

You'll need an API key from OpenWeather to access their API. You can sign up for a free API key on the [OpenWeather website](https://openweathermap.org/api).

### 2. Include Your API Key

Once you have your API key, you should include it in your JavaScript code where you make API requests. You can store it as a constant or in a configuration file for security.

```javascript
const apiKey = 'YOUR_API_KEY';
```
### 3. Making API Requests

a. Geocoding API

To retrieve the current location latitude and longitude, you can make a GET request to the following API endpoint:

```
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
```

Replace {city name},{state code},{country code} with the name of the city, state code, country code or location you want to get the weather data for, {limit} with the number of the locations in the API response and {apiKey} with your OpenWeather API key.

b. Current and 5-Day Weather Forecast

To retrieve the current and 5-day weather forecast for a location, you can make a GET request to the following API endpoint:

```
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
```

Replace {lat}, {lon} with the latitude and longitude of the city or location you want to get the weather data for, and {apiKey} with your OpenWeather API key.

Here's an example using JavaScript and the Fetch API:

```
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=45.272812&lon=-66.063026&appid={API key}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the 5-day weather forecast data here
    console.log(data);
  })
```

### 4. Handling the API Response

You'll need to parse the JSON data returned by the API and extract the relevant information to display it on your Weather Dashboard.

That's it! You can now use the OpenWeather API to retrieve the city geolocation, the current and 5-day weather forecasts for any location of your choice in your Weather Dashboard project.

Make sure to replace `'YOUR_API_KEY'` in the code examples with your actual OpenWeather API key. Users of your Weather Dashboard project will need to follow these steps to set up their own API keys and make API requests to retrieve weather data.

## State Flow Diagram
For a visual representation of the sequence of actions involved in the weather dashboard, refer to the [State Flow Diagram][state-flow] provided in the project documentation.

Feel free to reach out, contribute, or provide feedback to make the Password Generator Project even more robust and user-friendly!

## License

This project is licensed under the MIT License. See the [LICENSE][MIT] file for details.

[weather-dash]: <https://naturuplift.github.io/weather-dashboard/>
[javascript-code]: <https://github.com/naturuplift/weather-dashboard/blob/main/assets/scripts/script.js>
[state-flow]: <https://github.com/naturuplift/weather-dashboard/blob/main/assets/img/Weather%20Dashboard%20State%20Diagram%20v1.png>
[MIT]: <https://github.com/naturuplift/weather-dashboard/blob/main/LICENSE>
