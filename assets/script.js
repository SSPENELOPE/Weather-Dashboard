/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");
var storageArray = [];





/*             Functions               */

function displayCurrentWeather() {
    // Create and append the searched cities
    var cities = document.createElement("button");
    cities.classList = "list-group-item text-center cities";
    cities.textContent = cityInput.value.toUpperCase();
    cityList.appendChild(cities);

    // Append the weather data to the page

    // Save the cities to storage
    storageArray = [];
    var savedCities = document.querySelectorAll(".cities");
    savedCities.forEach((cities) => {
    storageArray.push(cities.textContent);        
    });
    localStorage.setItem("savedCities", JSON.stringify(storageArray));
    console.log(storageArray);
};

// 
function loadSavedCities() {
    storageArray = JSON.parse(localStorage.getItem('savedCities')) || [];
/*     storageArray.forEach((cities) => {
        var cities = document.createElement("li");
        cities.textContent = storageArray;
        cityList.appendChild(cities);
    }) */
    for (var i = 0; i < storageArray.length; i++) {
        var cityNames = storageArray[i]
        var cities = document.createElement("button");
        cities.classList = "list-group-item text-center cities";
        cities.textContent = cityNames;
        cityList.appendChild(cities);
    }

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
                    displayCurrentWeather();
                    console.log(data);
                });
            }
        })
        .catch(function(error) {
            alert("Enter a Valid City Name")
        })
        
});


// Functions to call immediatley
loadSavedCities();