document.addEventListener('DOMContentLoaded', function () {
    // Use an IP Geolocation API to get user's information
    fetch('https://ipinfo.io/json?token=00fbc71f8f38cc')
        .then(response => response.json())
        .then(data => {
            const { ip, city, country, org } = data;

            // Display IP and ISP
            document.getElementById('ip').textContent = ip;
            document.getElementById('isp').textContent = org;

            // Display City and Country
            document.getElementById('location').textContent = `${city}, ${country}`;

            // Generate Google Map
            const mapFrame = document.createElement('iframe');
            mapFrame.src = `https://maps.google.com/maps?q=${city}&output=embed`;
            mapFrame.width = '100%';
            mapFrame.height = '300';
            mapFrame.style.border = '0';
            document.getElementById('map').appendChild(mapFrame);

            // Greet user in their national language
            greetUser(country);

            // Detect Device Type
            const deviceType = detectDeviceType();
            document.getElementById('device-type').textContent = deviceType;

            // Display Device Info
            const deviceInfo = `${navigator.platform} - ${navigator.userAgent}`;
            document.getElementById('device-info').textContent = deviceInfo;
        })
        .catch(err => console.error('Failed to fetch IP info:', err));
});

function greetUser(country) {
    const greetings = {
        "US": "Hello",
        "FR": "Bonjour",
        "ES": "Hola",
        "DE": "Hallo",
        "CN": "你好",
        // Add more country codes and greetings here...
    };

    const greeting = greetings[country] || "Hello";
    document.getElementById('greeting').textContent = greeting;
}

function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    if (/iPad|Android|Touch/.test(ua)) return "Tablet";
    return "Desktop";
}
