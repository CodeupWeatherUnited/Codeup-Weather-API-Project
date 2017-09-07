(function () {
    "use strict";

    $(document).ready(function () {
        var requestOptions = {
                APPID: "1f8cf5283d525af161fcfbe1a348a256",
                q: "San Antonio, TX",
                units: "imperial"
        };

        var todays = {
            high: 0,
            low: 0,
            current_temp: 0,
            icon: "",
            general_info: '',
            specific_info: '',
            wind: 0,
            pressure: 0
        };

        var weatherRequest = $.get("http://api.openweathermap.org/data/2.5/weather", requestOptions);

        weatherRequest.done(function (weatherData) {
            console.log(weatherData);
        });

        weatherRequest.fail(function () {
            alert("Failed to get the current weather information for your area");
        });
    });
})();