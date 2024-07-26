async function fetchData() {
    const apiKey = '00fbc71f8f38cc'; // Your ipinfo.io API key
    const response = await fetch(`https://ipinfo.io/json?token=${00fbc71f8f38cc}`);
    const data = await response.json();

    document.getElementById('ip-address').textContent = data.ip;
    document.getElementById('isp-name').textContent = data.org;
    document.getElementById('city-name').textContent = data.city;
    document.getElementById('country-name').textContent = `${data.country} 🇺🇸`; // Adjust emoji based on country code
    document.getElementById('os-name').textContent = navigator.platform;
    document.getElementById('device-name').textContent = navigator.userAgent;

    updateTimeAndDate();
}

function updateTimeAndDate() {
    const now = new Date();
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function update() {
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], optionsTime);
        document.getElementById('current-date').textContent = now.toLocaleDateString([], optionsDate);
    }

    update();
    setInterval(() => {
        now.setSeconds(now.getSeconds() + 1);
        update();
    }, 1000);
}

fetchData();
