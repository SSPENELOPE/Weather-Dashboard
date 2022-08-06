/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");
var cityName = document.getElementById("city-name");
var temp = document.getElementById("temp");
var citiesBtns = document.querySelectorAll(".cities")
var storageArray = [];





/*             Functions               */

// Function to get the weather from desired city
var getCurrentWeather = function () {
    var city = cityInput.value.trim() || citiesBtns.innerHTML;
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,daily&appid=d56a5eb4cf852a09ec80d61b85870176';

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
    cities.classList = "list-group-item text-center cities my-2";
    cities.textContent = cityInput.value.toUpperCase();
    cityList.appendChild(cities);

    // add the weather data to the page
    for (var i = 0; i < data.length; i++) {
        cityName.innerHTML = cityInput.value;
        temp.innerHTML = data[i].main.temp;
    };

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
    /*     storageArray.forEach((cities) => {
            var cities = document.createElement("li");
            cities.textContent = storageArray;
            cityList.appendChild(cities);
        }) */
    for (var i = 0; i < storageArray.length; i++) {
        var cityNames = storageArray[i]
        var cities = document.createElement("button");
        cities.classList = "list-group-item text-center cities my-2";
        cities.textContent = cityNames;
        cityList.appendChild(cities);
    }

}

// Search button event listener
searchBtn.addEventListener("click", getCurrentWeather);


// Functions to call immediatley
loadSavedCities();