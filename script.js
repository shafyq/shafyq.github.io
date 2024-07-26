document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.querySelector('#ip-address span').textContent = ipAddress;

            return fetch(`https://ipapi.co/${ipAddress}/json/`);
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#isp span').textContent = data.org;
            document.querySelector('#location span').textContent = `${data.city}, ${data.country_name}`;
            updateTimeAndDate(data.timezone);
            setInterval(() => updateTimeAndDate(data.timezone), 1000);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function updateTimeAndDate(timezone) {
        const now = new Date();
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleTimeString([], options);
        document.querySelector('#time span').textContent = timeString;

        const dateOptions = {
            timeZone: timezone,
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dateString = now.toLocaleDateString([], dateOptions);
        document.querySelector('#date span').textContent = dateString;
    }
});
