//Variables for 5 Day Forecast

var fiveDayTemp = $(".5DayTemp");

var fiveDayHumidity = $(".5DayHumidity");

//Img variables for images

var weatherClear = ["Assets/Clear1.jpg", "Assets/Clear2.jpg", "Assets/Clear3.jpg"];
var weatherPartlyCloudy = ["Assets/PartlyCloudy1.jpeg", "Assets/PartlyCloudy2.png", "Assets/PartlyCloudy3.jpg"];
var weatherCloudy = ["Assets/Cloudy1.jpg", "Assets/Cloudy2.jpg", "Assets/Cloudy3.jpg"];
var weatherRainy = ["Assets/Rainy1.png", "Assets/Rainy2.png", "Assets/Rainy3.jpg"];
var weatherThunderstorm = ["Assets/ThunderStorm1.jpg", "Assets/ThunderStorm2.jpg", "Assets/ThunderStorm3.jpg"];
var weatherSnow = ["Assets/Snow1.jpg", "Assets/Snow2.webp", "Assets/Snow3.webp"];
var weatherMist = ["Assets/Mist1.jpg", "Assets/Mist2.jpg", "Assets/Mist3.jpg"];
var weatherSmog = ["Assets/Smog-Dust1.jpg", "Assets/Smog-Dust2.jpg", "Assets/Smog-Dust3.jpg"];
var weatherTornado = ["Assets/Tornado1.jpg", "Assets/Tornado2.jpg", "Assets/Tornado3.jpg"];

// Check Local Storage

var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

// If Storage is Empty, Create New Storage

if (searchHistory == null) {
    var searchHistory = [];
}

// Create Previous Search Results

for (var i = 0; i < searchHistory.length; i++) {

    // Create a new card to store previous search
    var newCard = $("<div class='card rounded shadow-sm newCard font-weight-bold'></div>");

    // Add the new card
    $("#previousSearches").prepend(newCard);

    // Add the previous search as text to the card
    newCard.text(searchHistory[i])

    // Create an array to check how many cards
    var cardArray = $(".newCard");

}

// Setting Dates for the 5 Day Forecast
for (var i = 0; i < 5; i++) {

    $(".fiveDayCardName").eq(i).text(moment().add(i + 1, 'days').calendar());
}

// Click Search Button To Search For Weather

$("#searchWeather").on("click", function (event) {
    event.preventDefault();

    var location = $("#inputWeather").val().trim();

    var APIKey = "c1062a71be569dde5d7f4b6638152083";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKey;

    $("h1").text(location + " " + moment().format('MMMM Do') + ", " + moment().format('YYYY'))

    // Get information about TODAY's weather from the OpenWeather API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherData) {

        // Get Icon Number to display Icon
        var iconNumber = weatherData.weather[0].icon;

        // Set icon number for URL for icon image
        var iconURL = "http://openweathermap.org/img/w/" + iconNumber + ".png";

        // Set Icon URL
        $('#icon').attr('src', iconURL);

        // Entering current Weather Info
        var currentTempF = (((weatherData.main.temp) - 273.15) * 9 / 5 + 32);

        var currentTempFCut = currentTempF.toFixed(2);

        $("#currentTemp").text("Temperature: " + currentTempFCut + "°F");

        $("#currentHumidity").text("Humidity: " + weatherData.main.humidity + "%");

        $("#currentWind").text("Wind Speed: " + weatherData.wind.speed + " MPH");

        var lat = weatherData.coord.lat;

        var lon = weatherData.coord.lon;

        // Grab the 5 day forcast from the API as well
        var location = $("#inputWeather").val().trim();

        var APIKey = "c1062a71be569dde5d7f4b6638152083";

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (weatherForecastData) {
            console.log(weatherForecastData);

            // Weather Image for each of the 5 Day Forcast Cards
            for (var i = 0; i < 5; i++) {

                console.log(weatherForecastData.list[i].weather[0].main);

                if (weatherForecastData.list[i].weather[0].main === "Clear") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherClear[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Clouds") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherCloudy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Drizzle") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherRainy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Rain") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherRainy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Squall") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherRainy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Thunderstorm") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherThunderstorm[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Snow") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherSnow[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Mist") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Fog") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Smog") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Haze") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Dust") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Sand") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Dust") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Ash") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherMist[randomNum]);
                }
            }

            //Temperatures and Humidity for each of the 5 Day Forcast Cards
            for (var i = 0; i < 5; i++) {

                // Temperature conversion

                var tempF = ((weatherForecastData.list[i].main.temp) - 273.15) * 9 / 5 + 32;

                var tempFCut = tempF.toFixed(2);

                $(".fiveDayTemp").eq(i).text("Temperature: " + tempFCut + "°F");

                $(".fiveDayHumidity").eq(i).text("Humidity: " + weatherForecastData.list[i].main.humidity + "%");
            }

            //Type of weather for next day ICON

            console.log(weatherForecastData.list[0].weather[0].icon);

            //Calling API for UV index
            var APIKey = "c1062a71be569dde5d7f4b6638152083";

            var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (UVIndexData) {

                //UV Index
                $("#currentUV").text("UV Index: " + UVIndexData.value);

                $("#currentUV").removeClass("greenUV  yellowUV redUV")

                if (UVIndexData.value <= 2) {
                    $("#currentUV").addClass("greenUV");
                }

                if (UVIndexData.value > 2 && UVIndexData.value < 8) {
                    $("#currentUV").addClass("yellowUV");
                }

                if (UVIndexData.value >= 8) {
                    $("#currentUV").addClass("redUV");
                }
            });

        });
    });

    // Create a new card to store previous search
    var newCard = $("<div class='card rounded shadow-sm newCard font-weight-bold'></div>");

    // Add the new card
    $("#previousSearches").prepend(newCard);

    // Add the previous search as text to the card
    newCard.text(location)

    // Create an array to check how many cards
    var cardArray = $(".newCard");

    // Add newest search to search history array
    searchHistory.push(location);

    // Update local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    if (cardArray.length > 10) {

        // Remove last search history element if there's more than 10.
        cardArray[cardArray.length - 1].remove();

        // Remove last item from the search history array if there's more than 10.
        searchHistory.pop();
    }

    else {
        return;
    }
});

// Click on History Location

$(".newCard").on("click", function (event) {
    event.preventDefault();

    for (var i = 0; i < searchHistory.length; i++) {
        $(".newCard").removeClass("bg-dark text-light");
    }

    $(this).addClass("bg-dark text-light");

    var location = $(this).text().trim();

    console.log(location);

    var APIKey = "c1062a71be569dde5d7f4b6638152083";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKey;

    $("h1").text(location + " " + moment().format('MMMM Do') + ", " + moment().format('YYYY'))

    // Get information about TODAY's weather from the OpenWeather API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherData) {

        // Get Icon Number to display Icon
        var iconNumber = weatherData.weather[0].icon;

        // Set icon number for URL for icon image
        var iconURL = "http://openweathermap.org/img/w/" + iconNumber + ".png";

        // Set Icon URL
        $('#icon').attr('src', iconURL);

        // Entering current Weather Info
        var currentTempF = ((weatherData.main.temp) - 273.15) * 9 / 5 + 32;

        var currentTempFCut = currentTempF.toFixed(2);

        $("#currentTemp").text("Temperature: " + currentTempFCut + "°F");

        $("#currentHumidity").text("Humidity: " + weatherData.main.humidity + "%");

        $("#currentWind").text("Wind Speed: " + weatherData.wind.speed + " MPH");

        var lat = weatherData.coord.lat;

        var lon = weatherData.coord.lon;

        // Grab the 5 day forcast from the API as well
        var APIKey = "c1062a71be569dde5d7f4b6638152083";

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (weatherForecastData) {
            console.log(weatherForecastData);

            // Weather Image for each of the 5 Day Forcast Cards
            for (var i = 0; i < 5; i++) {

                console.log(weatherForecastData.list[i].weather[0].main);

                if (weatherForecastData.list[i].weather[0].main === "Clear") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherClear[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Clouds") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherCloudy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Rain") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherRainy[randomNum]);
                }

                else if (weatherForecastData.list[i].weather[0].main === "Thunderstorm") {

                    var randomNum = Math.floor(Math.random() * 3);

                    $(".fiveDayCardImg").eq(i).attr("src", weatherThunderstorm[randomNum]);
                }
            }

            //Temperatures and Humidity for each of the 5 Day Forcast Cards
            for (var i = 0; i < 5; i++) {

                // Temperature conversion

                var tempF = ((weatherForecastData.list[i].main.temp) - 273.15) * 9 / 5 + 32;

                var tempFCut = tempF.toFixed(2);

                $(".fiveDayTemp").eq(i).text("Temperature: " + tempFCut + "°F");

                $(".fiveDayHumidity").eq(i).text("Humidity: " + weatherForecastData.list[i].main.humidity + "%");
            }

            //Type of weather for next day ICON

            console.log(weatherForecastData.list[0].weather[0].icon);

            //Type of weather for next day Description

            console.log(weatherForecastData.list[0].weather[0].description);


            //Calling API for UV index
            var APIKey = "c1062a71be569dde5d7f4b6638152083";

            var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (UVIndexData) {

                //UV Index
                $("#currentUV").text("UV Index: " + UVIndexData.value);

                $("#currentUV").removeClass("greenUV  yellowUV redUV")

                if (UVIndexData.value <= 2) {
                    $("#currentUV").addClass("greenUV");
                }

                if (UVIndexData.value > 2 && UVIndexData.value < 8) {
                    $("#currentUV").addClass("yellowUV");
                }

                if (UVIndexData.value >= 8) {
                    $("#currentUV").addClass("redUV");
                }
            });

        });
    });
});
