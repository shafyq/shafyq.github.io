document.addEventListener("DOMContentLoaded", function() {
    const ipAddressElement = document.getElementById("ip-address");
    const cityElement = document.getElementById("city");
    const ispElement = document.getElementById("isp");
    const weatherElement = document.getElementById("weather");
    const smallMapElement = document.getElementById("small-map");

    // Replace 'YOUR_IPINFO_API_KEY' with your actual ipinfo.io API key
    const ipinfoApiKey = "00fbc71f8f38cc";
    const ipinfoApiUrl = `https://ipinfo.io/json?token=${ipinfoApiKey}`;

    fetch(ipinfoApiUrl)
        .then(response => response.json())
        .then(data => {
            const { ip, city, country, org, loc } = data;
            ipAddressElement.textContent = `Your IP Address: ${ip}`;
            ispElement.textContent = `Your are Using: ${cleanIspName(org)}`;
            const countryName = getCountryName(country);
            const countryFlag = getCountryFlagEmoji(country);
            const greeting = getLocalGreeting(country);
            cityElement.innerHTML = `You are in: ${city}, ${countryName} ${countryFlag} (${greeting} 👋)`;

            const [latitude, longitude] = loc.split(',');
            displayMap(latitude, longitude);
            fetchWeather(city, country);
            displaySmallMap(city);
        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
            ipAddressElement.textContent = "Unable to fetch IP address.";
            cityElement.textContent = "";
            ispElement.textContent = "";
            weatherElement.textContent = "";
        });
});

function cleanIspName(org) {
    return org.replace(/^[A-Z]+\d+[\s-]*/, '');
}

function getCountryName(countryCode) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode);
}

function getCountryFlagEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function getLocalGreeting(countryCode) {
    const greetings = {
        "US": "Hello",
        "FR": "Bonjour",
        "ES": "Hola",
        "DE": "Hallo",
        "JP": "こんにちは",
        "CN": "你好",
        "IN": "नमस्ते",
        "IR": "سلام",
        "BD": "স্বাগতম"
    };
    return greetings[countryCode] || "Hello";
}

function displayMap(latitude, longitude) {
    const map = L.map('map').setView([latitude, longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
}

function fetchWeather(city, country) {
    const weatherApiKey = "1d99604fcdcce650d2c516d070d0df1b";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const { main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            weatherElement.innerHTML = `Your Weather Now is: ${temperature}°C, ${description}`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherElement.textContent = "Unable to fetch weather information.";
        });
}

function displaySmallMap(city) {
    const geocodeApiKey = '234e3c92e51d49ed86d29045ffe623a4'; // Replace with your Geocoding API key
    const geocodeApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geocodeApiKey}`;

    fetch(geocodeApiUrl)
        .then(response => response.json())
        .then(data => {
            const { lat, lng } = data.results[0].geometry;
            const smallMap = L.map('small-map').setView([lat, lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(smallMap);

            L.marker([lat, lng]).addTo(smallMap);
        })
        .catch(error => {
            console.error("Error fetching city coordinates:", error);
            smallMapElement.textContent = "Unable to fetch city map.";
        });
}