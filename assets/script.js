/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list");
var cityInput = document.getElementById("city");
var storageArray = [];





/*             Functions               */

function displayCurrentWeather() {
    // Create and append the searched cities
    var cities = document.createElement("li");
    cities.classList = "list-group-item text-center cities";
    cities.textContent = cityInput.value.toUpperCase();
    cityList.appendChild(cities);

    // Save the cities to storage
    storageArray = [];
    var savedCities = document.querySelectorAll(".cities");
    savedCities.forEach((cities) => {
    storageArray.push(cities.textContent);        
    });
    localStorage.setItem("saveCities", JSON.stringify(storageArray));
    console.log(storageArray);
};

function loadSavedCities(cities) {
    storageArray = JSON.parse(localStorage.getItem('savedCities')) || [];
  /*   cityList.forEach((cities) => {
        cities.textContent = storageArray[i];
        cityList.appendChild(cities);
    }) */
    
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