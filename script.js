// Replace with your API keys
const IPINFO_API_KEY = '00fbc71f8f38cc';
const WEATHER_API_KEY = '1d99604fcdcce650d2c516d070d0df1b';

async function fetchLocation() {
    const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`);
    const data = await response.json();
    return data;
}

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return data;
}

function displayGreeting(location) {
    const greeting = document.getElementById('greeting');
    const city = location.city;
    const country = location.country_name;
    const flag = location.country_flag_emoji;
    greeting.innerHTML = `Greetings my dear visitor from ${city}, ${country} ${flag}`;
}

function displayWeather(weather) {
    const weatherElement = document.getElementById('weather');
    const temperature = weather.main.temp;
    const description = weather.weather[0].description;

    let weatherMessage = `Your current weather is ${temperature}°C and ${description}. 🌡️`;
    if (temperature > 30) {
        weatherMessage += ' It\'s quite hot outside! Be careful! ☀️';
    } else if (temperature < 10) {
        weatherMessage += ' It\'s quite chilly! Stay warm! ❄️';
    } else {
        weatherMessage += ' The weather is great for a picnic outside! 🌳';
    }

    weatherElement.innerHTML = weatherMessage;
}

function displayIpInfo(location) {
    const ipInfoElement = document.getElementById('ip-info');
    const ipAddress = location.ip;
    const isp = location.org;

    ipInfoElement.innerHTML = `Your IP address is ${ipAddress} and your Internet Provider is ${isp}`;
}

async function init() {
    const location = await fetchLocation();
    const city = location.city;
    displayGreeting(location);
    displayIpInfo(location);

    const weather = await fetchWeather(city);
    displayWeather(weather);
}

init();
