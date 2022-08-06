/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");






/*             Functions               */

function displayCurrentWeather() {
    
}

// Search button event listener
searchBtn.addEventListener("click", function(){
    var city = cityInput.value.trim();
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                response.json().then(function (data) {
                    //displayCurrentWeather();
                    console.log(data);
                });
            }
        })
        .catch(function(error) {
            alert("Enter a Valid City Name")
        })
});
