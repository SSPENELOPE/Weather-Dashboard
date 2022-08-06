/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");







var submitCitySearch = function(event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        cityInput.value = "";
    } else {
        alert("Enter a City Name");
    }

};



function getWeatherData() {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + city + '&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                response.json().then(function(data) {
                    displayCurrentWeather(data);
                    console.log(data);
                });
            }
        })
    };



searchBtn.addEventListener("click", submitCitySearch());
