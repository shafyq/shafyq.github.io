$(document).ready(function() {
    // Get the city from IP address
    $.get("https://ipinfo.io?token=YOUR_IPINFO_TOKEN", function(response) {
        var city = response.city;

        // Fetch weather data for the city
        var apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
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
