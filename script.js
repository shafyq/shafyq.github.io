document.addEventListener("DOMContentLoaded", function() {
    const ipAddressElement = document.getElementById("ip-address");
    const cityElement = document.getElementById("city");
    const ispElement = document.getElementById("isp");
    const weatherElement = document.getElementById("weather");
    const deviceTypeElement = document.getElementById("device-type");
    const deviceInfoElement = document.getElementById("device-info");

    // Using ipapi.co API to fetch IP information
    const ipApiUrl = `https://ipapi.co/json/`;

    fetch(ipApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("IPAPI Response:", data); // Log the response data

            if (data) {
                const { ip, city, country_name, org, latitude, longitude } = data;
                ipAddressElement.textContent = `Your IP Address: ${ip}`;
                ispElement.textContent = `Your Internet Provider: ${org || "Unknown"}`;
                const countryFlag = getCountryFlagEmoji(data.country);
                const greeting = getLocalGreeting(data.country);
                cityElement.innerHTML = `You are in: ${city}, ${country_name} ${countryFlag} (${greeting} 👋)`;

                if (city) {
                    geocodeCity(city, country_name);
                } else if (latitude && longitude) {
                    displayGoogleMap(latitude, longitude);
                } else {
                    console.error("Location data is missing.");
                }

                fetchWeather(city, data.country);
                detectDeviceType();
            } else {
                console.error("Failed to fetch data from IPAPI.");
            }
        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
            ipAddressElement.textContent = "Unable to fetch IP address.";
            cityElement.textContent = "Unable to fetch location.";
            ispElement.textContent = "Unable to fetch ISP.";
            weatherElement.textContent = "Unable to fetch weather.";
        });
    }

    function cleanIspName(org) {
        return org ? org.replace(/^[A-Z]+\d+[\s-]*/, '') : "Unknown";
    }

    function getCountryFlagEmoji(countryCode) {
        if (!countryCode) return '';
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
            "BD": "স্বাগতম",
        };
        return greetings[countryCode] || "Hello";
    }

    function displayGoogleMap(latitude, longitude) {
        const mapElement = document.getElementById('map');
        const map = new google.maps.Map(mapElement, {
            center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            zoom: 10
        });

        new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map: map
        });
    }

    function geocodeCity(city, country) {
        const geocoder = new google.maps.Geocoder();
        const address = `${city}, ${country}`;
        
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                const location = results[0].geometry.location;
                displayGoogleMap(location.lat(), location.lng());
            } else {
                console.error("Geocoding error:", status);
            }
        });
    }

    function fetchWeather(city, country) {
        const weatherApiKey = "1d99604fcdcce650d2c516d070d0df1b"; // Replace with your actual OpenWeatherMap API key
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherApiKey}&units=metric`;

        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Weather API Response:", data); // Log the weather API response

                const { main, weather } = data;
                if (main && weather) {
                    const temperature = main.temp;
                    const description = weather[0].description;
                    weatherElement.innerHTML = `Your Weather Now is: ${temperature}°C, ${description}`;
                } else {
                    console.error("Weather data is missing or invalid.");
                    weatherElement.textContent = "Unable to fetch weather information.";
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherElement.textContent = "Unable to fetch weather information.";
            });
    }

    function detectDeviceType() {
        const ua = navigator.userAgent;
        const isMobile = /mobile/i.test(ua);
        const isTablet = /tablet|ipad|playbook|silk/i.test(ua);
        const isDesktop = !isMobile && !isTablet;
        
        let deviceType = "Desktop";
        if (isMobile) deviceType = "Mobile";
        else if (isTablet) deviceType = "Tablet";

        deviceTypeElement.textContent = `You are using: ${deviceType}`;
        deviceInfoElement.textContent = `Your device is: ${navigator.platform} - ${navigator.userAgent}`;
    }
</script>
