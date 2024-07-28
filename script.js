document.addEventListener("DOMContentLoaded", function() {
    const ipAddressElement = document.getElementById("ip-address");

    // Replace 'YOUR_API_KEY' with your actual ipinfo.io API key
    const apiKey = "00fbc71f8f38cc";
    const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            ipAddressElement.textContent = data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
            ipAddressElement.textContent = "Unable to fetch IP address.";
        });
});
