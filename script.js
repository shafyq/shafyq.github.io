// Country code to full name mapping
const countryNames = {
    "BD": "Bangladesh",
    "US": "United States",
    "FR": "France",
    "ES": "Spain",
    "DE": "Germany",
    "IN": "India",
    "IR": "Iran",
    // Add more countries as needed
    "default": "Unknown Country"
};

// Get user data from ipinfo.io
fetch('https://ipinfo.io/json?token=00fbc71f8f38cc') // Use your API key here
    .then(response => response.json())
    .then(data => {
        const city = data.city;
        const countryCode = data.country;
        const ip = data.ip;
        const isp = data.org;

        // Get country name
        const countryName = countryNames[countryCode] || countryNames['default'];

        // Get Country Flag Emoji
        const flagEmoji = countryToEmoji(countryCode);

        // Update the HTML elements with user data
        document.getElementById('greeting').textContent = `👋🏻 Hello dear from ${city}, ${countryName} ${flagEmoji}!`;
        document.getElementById('ip-info').textContent = `Your IP Address: ${ip}`;
        document.getElementById('isp-info').textContent = `You are Using: ${isp}`;

        // Start dynamic clock based on user's timezone
        startClock(data.timezone);
    })
    .catch(error => console.error('Error fetching IP information:', error));

// Function to convert country code to emoji
function countryToEmoji(countryCode) {
    return String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => c.charCodeAt() + 127397));
}

// Function to start clock for user's timezone
function startClock(timezone) {
    function updateTime() {
        const now = new Date().toLocaleString("en-US", { timeZone: timezone, hour12: false });
        document.getElementById('time-info').textContent = `Your Time: ${now}`;
    }
    setInterval(updateTime, 1000); // Update every second
}
