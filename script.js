async function fetchVisitorData() {
    try {
        // Fetch IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.querySelector('#ip-address span').textContent = ipData.ip;

        // Fetch additional information using your ipinfo.io API token
        const locationResponse = await fetch(`https://ipinfo.io/${ipData.ip}?token=00fbc71f8f38cc`);
        const locationData = await locationResponse.json();
        document.querySelector('#isp span').textContent = locationData.org;
        document.querySelector('#city span').textContent = locationData.city; // Display city on its own line
        document.querySelector('#country span').textContent = locationData.country; // Display country on its own line

        // Detect Operating System
        const os = navigator.userAgent;
        document.querySelector('#os span').textContent = os.includes('Windows') ? 'Windows' : os.includes('Mac') ? 'Mac OS' : 'Other';

        // Detect Device Type
        const device = /Mobi/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        document.querySelector('#device span').textContent = device;

        // Update Time and Date
        function updateTime() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-GB', { hour12: false });
            const date = now.toLocaleDateString('en-GB');
            document.querySelector('#time span').textContent = time;
            document.querySelector('#date span').textContent = date;
        }

        updateTime();
        setInterval(updateTime, 1000);

    } catch (error) {
        console.error('Error fetching visitor data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchVisitorData);
