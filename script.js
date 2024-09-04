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
function greetUser(country) {
    const greetings = {
        "Afghanistan": "سلام",
        "Albania": "Përshëndetje",
        "Algeria": "مرحبا",
        "Andorra": "Hola",
        "Angola": "Olá",
        "Argentina": "Hola",
        "Armenia": "Բարեւ Ձեզ",
        "Australia": "Hello",
        "Austria": "Hallo",
        "Azerbaijan": "Salam",
        "Bahamas": "Hello",
        "Bahrain": "مرحبا",
        "Bangladesh": "হ্যালো",
        "Belarus": "Добры дзень",
        "Belgium": "Hallo",
        "Belize": "Hello",
        "Benin": "Bonjour",
        "Bhutan": "ཕེབས་ཨོ",
        "Bolivia": "Hola",
        "Bosnia and Herzegovina": "Zdravo",
        "Botswana": "Dumela",
        "Brazil": "Olá",
        "Brunei": "Selamat datang",
        "Bulgaria": "Здравейте",
        "Burkina Faso": "Bonjour",
        "Burundi": "Bonjour",
        "Cambodia": "សួស្តី",
        "Cameroon": "Bonjour",
        "Canada": "Hello",
        "Cape Verde": "Olá",
        "Central African Republic": "Bonjour",
        "Chad": "Bonjour",
        "Chile": "Hola",
        "China": "你好",
        "Colombia": "Hola",
        "Comoros": "Salam",
        "Congo (Congo-Brazzaville)": "Bonjour",
        "Costa Rica": "Hola",
        "Croatia": "Pozdrav",
        "Cuba": "Hola",
        "Cyprus": "Γεια σας",
        "Czech Republic (Czechia)": "Ahoj",
        "Denmark": "Hej",
        "Djibouti": "Bonjour",
        "Dominica": "Hello",
        "Dominican Republic": "Hola",
        "Ecuador": "Hola",
        "Egypt": "مرحبا",
        "El Salvador": "Hola",
        "Equatorial Guinea": "Hola",
        "Eritrea": "Selam",
        "Estonia": "Tere",
        "Eswatini (fmr. "Swaziland")": "Sawubona",
        "Ethiopia": "ሰላም",
        "Fiji": "Bula",
        "Finland": "Hei",
        "France": "Bonjour",
        "Gabon": "Bonjour",
        "Gambia": "Hello",
        "Georgia": "გამარჯობა",
        "Germany": "Hallo",
        "Ghana": "Hello",
        "Greece": "Γειά σας",
        "Grenada": "Hello",
        "Guatemala": "Hola",
        "Guinea": "Bonjour",
        "Guinea-Bissau": "Olá",
        "Guyana": "Hello",
        "Haiti": "Bonjou",
        "Honduras": "Hola",
        "Hungary": "Helló",
        "Iceland": "Halló",
        "India": "नमस्ते",
        "Indonesia": "Halo",
        "Iran": "سلام",
        "Iraq": "مرحبا",
        "Ireland": "Hello",
        "Israel": "שלום",
        "Italy": "Ciao",
        "Jamaica": "Hello",
        "Japan": "こんにちは",
        "Jordan": "مرحبا",
        "Kazakhstan": "Сәлеметсіз бе",
        "Kenya": "Hello",
        "Kiribati": "Mauri",
        "Kuwait": "مرحبا",
        "Kyrgyzstan": "Салам",
        "Laos": "ສະບາຍດີ",
        "Latvia": "Sveiki",
        "Lebanon": "مرحبا",
        "Lesotho": "Lumela",
        "Liberia": "Hello",
        "Libya": "مرحبا",
        "Liechtenstein": "Hallo",
        "Lithuania": "Labas",
        "Luxembourg": "Hallo",
        "Madagascar": "Salama",
        "Malawi": "Moni",
        "Malaysia": "Selamat datang",
        "Maldives": "Hello",
        "Mali": "Bonjour",
        "Malta": "Bongu",
        "Marshall Islands": "Hello",
        "Mauritania": "مرحبا",
        "Mauritius": "Hello",
        "Mexico": "Hola",
        "Micronesia": "Kaselehlie",
        "Moldova": "Bună ziua",
        "Monaco": "Bonjour",
        "Mongolia": "Сайн байна уу",
        "Montenegro": "Zdravo",
        "Morocco": "مرحبا",
        

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
