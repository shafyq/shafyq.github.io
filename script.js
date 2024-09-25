// Translation dictionary
const translations = {
    "US": { greeting: "Hello", dear: "dear" },
    "FR": { greeting: "Bonjour", dear: "cher" },
    "ES": { greeting: "Hola", dear: "querido" },
    "DE": { greeting: "Hallo", dear: "lieber" },
    "IN": { greeting: "नमस्ते", dear: "प्रिय" },
    "IR": { greeting: "سلام", dear: "عزیزم" },
    "BD": { greeting: "সালাম","dear:""},
    // Add more countries and their translations here
    "default": { greeting: "Hello", dear: "dear" }
};

// Get user data from ipinfo.io
fetch('https://ipinfo.io/json?token=00fbc71f8f38cc') // Use your API key here
    .then(response => response.json())
    .then(data => {
        const city = data.city;
        const country = data.country;
        const ip = data.ip;
        const isp = data.org;

        // Get country-specific translation
        const translation = translations[country] || translations['default'];

        // Get Country Flag Emoji
        const flagEmoji = countryToEmoji(country);

        // Update the HTML elements with user data
        document.getElementById('greeting').textContent = `👋🏻 ${translation.greeting} ${translation.dear} from ${city}, ${country} ${flagEmoji}!`;
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
