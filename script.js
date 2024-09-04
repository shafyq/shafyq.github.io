document.addEventListener('DOMContentLoaded', function () {
    const ipInfoToken = '00fbc71f8f38cc'; // Replace with your actual ipinfo.io token

    // Function to fetch data from IPinfo
    function fetchIpInfo() {
        return fetch(`https://ipinfo.io/json?token=${ipInfoToken}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(() => {
                console.warn('Failed to fetch from ipinfo.io, trying another API...');
                return fetchIpApiFallback();
            });
    }

    // Fallback function using ipapi.co
    function fetchIpApiFallback() {
        return fetch('https://ipapi.co/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }

    // Function to handle data once fetched
    function handleData(data) {
        const { ip, city, country_name, org } = data;

        // Display IP and ISP
        document.getElementById('ip').textContent = ip;
        document.getElementById('isp').textContent = org;

        // Display City and Country
        document.getElementById('location').textContent = `${city}, ${country_name}`;

        // Generate Google Map
        const mapFrame = document.createElement('iframe');
        mapFrame.src = `https://maps.google.com/maps?q=${city}&output=embed`;
        mapFrame.width = '100%';
        mapFrame.height = '300';
        mapFrame.style.border = '0';
        document.getElementById('map').appendChild(mapFrame);

        // Greet user in their national language
        greetUser(country_name);

        // Detect Device Type
        const deviceType = detectDeviceType();
        document.getElementById('device-type').textContent = deviceType;

        // Display Device Info
        const deviceInfo = `${navigator.platform} - ${navigator.userAgent}`;
        document.getElementById('device-info').textContent = deviceInfo;
    }

    // Fetch data from IPinfo or fallback API
    fetchIpInfo()
        .then(handleData)
        .catch(err => console.error('Error fetching IP data:', err));
});

function greetUser(country) {
    const greetings = {
        "United States": "Hello",
        "France": "Bonjour",
        "Spain": "Hola",
        "Germany": "Hallo",
        "China": "你好",
        // Add more countries and greetings here...
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
