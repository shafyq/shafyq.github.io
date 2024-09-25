async function fetchIPInfo() {
    const response = await fetch('https://ipinfo.io/json?token=00fbc71f8f38cc'); // Use your ipinfo.io API key here
    const data = await response.json();
    
    // Set the IP Address
    document.getElementById('ip').textContent = data.ip;

    // Set the ISP
    document.getElementById('isp').textContent = data.org;

    // Set the Location (City, Country) and flag
    const countryCode = data.country.toLowerCase();
    const flagEmoji = countryCodeToEmoji(countryCode);
    document.getElementById('location').textContent = `${data.city}, ${data.country}`;
    document.getElementById('flag').textContent = flagEmoji;
}

// Convert country code to emoji flag
function countryCodeToEmoji(countryCode) {
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

// Run the function when the page loads
fetchIPInfo();
