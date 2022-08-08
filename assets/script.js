/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");
var cityName = document.getElementById("city-name");
var temp = document.getElementById("temp");
var uvIndex = document.getElementById("uv-index");
var citiesBtns = document.querySelectorAll(".cities");
var clearBtn = document.getElementById("clear-button")
var storageArray = [];





/*             Functions               */

function getLatandLon() {
    var city = cityInput.value.trim() || citiesBtns.innerHTML;
    // The "weather?" handle does not retrieve the UV-index, "onecall?" handle will but cannot call city
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                return response.json().then(function (latLon) {
                    console.log(latLon);
                });
            }
        })
        .catch(function (error) {
            alert(error + "Enter a Valid City Name")
        })
}

// Function to get the weather from desired city
var getCurrentWeather = function (latLon) {
    var city = latLon.coord
    // The "weather?" handle does not retrieve the UV-index, "onecall?" handle will but cannot call city
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                return response.json().then(function (data) {
                    displayCurrentWeather(data);
                    console.log(data);
                });
            }
        })
        .catch(function (error) {
            alert(error + "Enter a Valid City Name")
        })
}

// Display the weather of the city selected
function displayCurrentWeather(data) {
    // Create and append the searched cities
    var cities = document.createElement("button");
    cities.classList = "bg-transparent text-center cities m-3";
    cities.textContent = cityInput.value.toUpperCase();
    cityList.appendChild(cities);

    // add the weather data to the page
        //cityName.innerHTML = cityInput.value.toUpperCase();
        //temp.innerHTML = "Temprature: " + data.main.temp + "F";
   

    // Save the cities to storage
    storageArray = [];

    var savedCities = document.querySelectorAll(".cities");
    savedCities.forEach((cities) => {
        storageArray.push(cities.textContent);
    });

    localStorage.setItem("savedCities", JSON.stringify(storageArray));
    console.log(storageArray);
};

// Load the previously saved cities
function loadSavedCities() {
    storageArray = JSON.parse(localStorage.getItem('savedCities')) || [];

     storageArray.forEach((cityNames) => {
        var cities = document.createElement("button");
        cities.classList = "bg-transparent text-center cities m-3";
        cities.textContent = cityNames;
        cityList.appendChild(cities);
        });
;}


// Clear Previously Viewd
function clearPreviouslyViewed() {
    localStorage.clear();
    cityList.innerHTML = "";
};




/*       Event Listeners       */

// Clear Previously Viewed cities button
clearBtn.addEventListener("click", function() {
    clearPreviouslyViewed();
});

// Search button event listener
searchBtn.addEventListener("click", getLatandLon);

// recall preivously searched city
// TODO: Write the loadSaveCity function
citiesBtns.forEach((cities) => {
    cities.addEventListener("click", loadSavedCity);
});

// Functions to call immediatley
loadSavedCities();
