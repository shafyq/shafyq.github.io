async function fetchVisitorData() {
    try {
        // Replace with a suitable API if needed
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.querySelector('#ip-address span').textContent = ipData.ip;

        const locationResponse = await fetch(`https://ipinfo.io/${ipData.ip}?token=YOUR_API_TOKEN`);
        const locationData = await locationResponse.json();
        document.querySelector('#isp span').textContent = locationData.org;
        document.querySelector('#location span').textContent = `${locationData.city}, ${locationData.country}`;

        const os = navigator.userAgent;
        document.querySelector('#os span').textContent = os.includes('Windows') ? 'Windows' : os.includes('Mac') ? 'Mac OS' : 'Other';

        const device = /Mobi/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        document.querySelector('#device span').textContent = device;

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
