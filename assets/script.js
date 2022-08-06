/*          Variables            */
var searchBtn = document.getElementById("search");
var cityList = document.getElementById("city-list")











function getApi()
    var requestUrl = "https://openweathermap.org/api/one-call-api";
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });



    searchBtn.addEventListener("click", function () {
        getApi(); 
    });
    