document.addEventListener("DOMContentLoaded", function() {
    const ipAddressElement = document.getElementById("ip-address");
    const cityElement = document.getElementById("city");
    const ispElement = document.getElementById("isp");
    const countryElement = document.getElementById("country");

    // Replace 'YOUR_API_KEY' with your actual ipinfo.io API key
    const apiKey = "00fbc71f8f38cc";
    const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            ipAddressElement.textContent = `IP Address: ${data.ip}`;
            cityElement.textContent = `City: ${data.city}`;
            ispElement.textContent = `ISP: ${data.org}`;
            const countryName = getCountryName(data.country);
            const countryFlag = getCountryFlagEmoji(data.country);
            countryElement.textContent = `Country: ${countryName} ${countryFlag}`;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
            ipAddressElement.textContent = "Unable to fetch IP address.";
            cityElement.textContent = "";
            ispElement.textContent = "";
            countryElement.textContent = "";
        });
});

function getCountryName(countryCode) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode);
}

function getCountryFlagEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
