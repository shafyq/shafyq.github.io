document.addEventListener("DOMContentLoaded", function() {
    const ipAddressElement = document.getElementById("ip-address");
    const cityElement = document.getElementById("city");
    const ispElement = document.getElementById("isp");

    // Replace 'YOUR_API_KEY' with your actual ipinfo.io API key
    const apiKey = "00fbc71f8f38cc";
    const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            ipAddressElement.textContent = `IP Address: ${data.ip}`;
            cityElement.textContent = `City: ${data.city}`;
            ispElement.textContent = `ISP: ${data.org}`;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
            ipAddressElement.textContent = "Unable to fetch IP address.";
            cityElement.textContent = "";
            ispElement.textContent = "";
        });
});
