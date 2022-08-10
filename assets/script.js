/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");
var cityName = document.getElementById("city-name");
var citiesBtns = document.querySelectorAll(".cities");
var clearBtn = document.getElementById("clear-button")
var storageArray = [];

// Current Weather Variables
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uv-index");


/*             Functions               */

// Get the lattitude and longitute by city name
var getLatandLon = function () {
    var city = cityInput.value.trim() || citiesBtns.innerHTML;
    // The "weather?" handle does not retrieve the UV-index, "onecall?" handle will but cannot call city
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=ec2870611b1a5011e09492842b353545';

    fetch(weatherUrl, {
        cache: 'reload',
    })
        .then(function (response) {
            if (!response.ok) {
                alert("Error: " + response.statusText);
            } else {
                return response.json().then(function (latLon) {
                    getCurrentWeather(latLon);
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
    var lat = latLon.coord.lat
    var lon = latLon.coord.lon
    // Get the weather using onecall
    var newWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&lang=en&appid=ec2870611b1a5011e09492842b353545';

    fetch(newWeatherUrl, {
        method: 'get',
        credentials: 'same-origin',
        redirect: 'follow',
        cache: 'reload',
    })
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
            alert(error)
        })
}

// Get users Geolocation function
function getGeolocation() {
    var successCallback = (position) => {
        if (position) {
            getWeatherGeo(position);
        }
        console.log(position);
    };

    var errorCallback = (error) => {
        if (error) {
            alert("Change your settings to allow location \nor refresh the page and click \"Allow\"")
        } 
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

var getWeatherGeo = function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // Get the weather using onecall
    var geoUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&lang=en&appid=ec2870611b1a5011e09492842b353545';

    fetch(geoUrl, {
        method: 'get',
        credentials: 'same-origin',
        redirect: 'follow',
        cache: 'reload',
    })
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
            alert(error)
        })
} 

// Display the weather of the city selected
function displayCurrentWeather(data) {
    // Create and append the searched cities
    var cities = document.createElement("button");
    cities.classList = "bg-transparent text-center cities m-3";
    cities.textContent = cityInput.value.toUpperCase();
    cityList.appendChild(cities);

    // Convert Unix Date to readable date 
    var unixDate = data.current.dt;
    var date = new Date(unixDate * 1000);

    // add the current weather data to the page 
    if (cityInput.value) {
        cityName.textContent = cityInput.value.toUpperCase() + " (" + date.toDateString() + ")"; 
    } else {
        var userLocation = prompt("Enter Name of your Location");
        cityName.innerText = userLocation.toUpperCase() + " " + "(" + date.toDateString() + ")"; 
    }
    temp.textContent = "Temprature: " + data.current.temp + "F ";
    humidity.textContent = "Humidity: " + data.current.humidity + " %";
    wind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    uvIndex.textContent = "UV-Index: " + data.current.uvi;
    if (data.current.uvi >= 5) {
        uvIndex.setAttribute("style", "background-color:red");
    } else {
        uvIndex.setAttribute("style", "background-color:green");
    };

    // add 5 day forecast
    var dates = document.querySelectorAll(".item-1");
    var icons = document.querySelectorAll(".item-2");
    var temps = document.querySelectorAll(".item-3");
    var winds = document.querySelectorAll(".item-4");
    var humidities = document.querySelectorAll(".item-5");

    for (var i = 0; i < 5; i++) {
        var newUnixDate = data.daily[i].dt;
        var newDate = new Date(newUnixDate * 1000);
        dates[i].innerHTML = newDate.toDateString();
        temps[i].innerHTML = "Temprature: " + data.daily[i].temp.day + "F";
        winds[i].innerHTML = "Wind-Speed: " + data.daily[i].wind_speed + "MPH";
        humidities[i].innerHTML = "Humiditiy: " + data.daily[i].humidity + "%";
        
            
        
        if (data.daily[i].clouds >= 36) {
            icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-sun\" style=\"font-size:36px\"></i>"
        } else if (data.daily[i].rain >= 61) {
            icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-showers-heavy\"></i>"
        } else if (data.daily[i].rain >= 25 && data.daily[i].clouds >= 36) {
            icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-rain\"></i>"
        } else {
            icons[i].innerHTML = "<i class=\"fa-solid fa-sun\" style=\"font-size:36px\"></i>"
        }
    }

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
}


// Clear Previously Viewd
function clearPreviouslyViewed() {
    localStorage.clear();
    cityList.innerHTML = "";
};


/*       Event Listeners       */

// Clear Previously Viewed cities button
clearBtn.addEventListener("click", function () {
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
getGeolocation();
