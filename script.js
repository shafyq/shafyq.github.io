async function fetchData() {
    const response = await fetch('https://ipinfo.io/json?token=00fbc71f8f38cc');
    const data = await response.json();

    document.getElementById('ip').textContent = data.ip;
    document.getElementById('isp').textContent = data.org;
    document.getElementById('city').textContent = data.city;
    document.getElementById('country').textContent = data.country;
    document.getElementById('country-emoji').textContent = getEmojiFlag(data.country);
    document.getElementById('os').textContent = navigator.platform;
    document.getElementById('device').textContent = navigator.userAgent;

    updateTime();
    setInterval(updateTime, 1000);

    function getEmojiFlag(countryCode) {
        const codePoints = countryCode.toUpperCase().split('').map(c => 0x1F1E6 + c.charCodeAt() - 65);
        return String.fromCodePoint(...codePoints);
    }

    function updateTime() {
        const date = new Date();
        document.getElementById('time').textContent = date.toLocaleTimeString('en-US', { hour12: false });
        document.getElementById('date').textContent = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}

fetchData();
