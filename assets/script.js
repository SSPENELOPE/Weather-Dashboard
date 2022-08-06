/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");










function getWeatherData() {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
        });
    };



searchBtn.addEventListener("click", getWeatherData());
