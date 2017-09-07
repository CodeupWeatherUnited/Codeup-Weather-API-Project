(function () {
    "use strict";

    function buildCurrentConditionsHTML(todays) {
        var html = "";
        var $currentConditionsContainer = $("#current-conditions-container");

        html += '<h3 class="location-name">' + todays.current_location + '</h3>';
        html += '<ul class="current-conditions-list">';
        html += '<li class="min-max-temps">' + todays.high + '&deg;/' + todays.low + '&deg;</li>';
        html += '<li class="conditions-icon"><img src="' + todays.icon + '" alt="..."></li>';
        //     <li class="current-description">Clouds: overcast clouds</li>
        //     <li class="humidity">52</li>
        //     <li class="wind">6</li>
        //     <li class="pressure">1025.93</li>
        //     </ul>
        $currentConditionsContainer.html(html);
    }

    $(document).ready(function () {
        var requestOptions = {
                APPID: "1f8cf5283d525af161fcfbe1a348a256",
                q: "San Antonio, TX",
                units: "imperial"
        };

        var todays = {
            current_location: '',
            high: 0,
            low: 0,
            current_temp: 0,
            icon: "",
            general_info: '',
            specific_info: '',
            wind: 0,
            pressure: 0
        };

        var current_location = "";

        var weatherRequest = $.get("http://api.openweathermap.org/data/2.5/weather", requestOptions);

        weatherRequest.done(function (weatherData) {
            todays.current_location = weatherData.name;
            todays.high = Math.round(weatherData.main.temp_max);
            todays.low = Math.round(weatherData.main.temp_min);
            todays.current_temp = weatherData.main.temp;
            todays.icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
            todays.general_info = weatherData.weather[0].main;
            todays.specific_info = weatherData.weather[0].description;
            todays.wind = weatherData.wind.speed;
            todays.pressure = weatherData.main.pressure;

            buildCurrentConditionsHTML(todays);
        });

        weatherRequest.fail(function () {
            alert("Failed to get the current weather information for your area");
        });
    });
})();