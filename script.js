$(document).ready(function() {
    // Get the city from IP address
    $.get("https://ipinfo.io?token=00fbc71f8f38cc", function(response) {
        var city = response.city;

        // Fetch weather data for the city
        var apiKey = '1d99604fcdcce650d2c516d070d0df1b';
        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        $.get(weatherApiUrl, function(weatherData) {
            var weatherDescription = weatherData.weather[0].description;
            var temperature = weatherData.main.temp;
            var weatherHtml = `<p>City: ${city}</p>
                               <p>Weather: ${weatherDescription}</p>
                               <p>Temperature: ${temperature}°C</p>`;
            $('#weather').html(weatherHtml);
        });
    }, "jsonp");
});
