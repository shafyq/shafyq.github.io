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
            document.querySelector('#isp span').textContent = data.org || 'N/A';
            document.querySelector('#location span').textContent = `${data.city || 'N/A'}, ${data.country_name || 'N/A'}`;
            updateTimeAndDate(data.timezone);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.querySelector('#isp span').textContent = 'Error fetching ISP';
            document.querySelector('#location span').textContent = 'Error fetching location';
            document.querySelector('#time span').textContent = 'Error fetching time';
            document.querySelector('#date span').textContent = 'Error fetching date';
        });

    function updateTimeAndDate(timezone) {
        const now = new Date();
        const options = {
            timeZone: timezone || 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleTimeString([], options);
        document.querySelector('#time span').textContent = timeString;

        const dateOptions = {
            timeZone: timezone || 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dateString = now.toLocaleDateString([], dateOptions);
        document.querySelector('#date span').textContent = dateString;
    }
});
