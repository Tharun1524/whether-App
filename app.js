const OPENWEATHER_API_KEY = '72e3545332f1d1ad234de4063a38c9c5';

function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Construct the OpenWeather API URL
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found (HTTP ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Could not fetch weather data. Please check the city name or try again later.\nError: ${error.message}`);
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    // Display temperature and weather details
    tempDiv.innerHTML = `<p>Temperature: ${data.main.temp}°C</p>`;
    weatherInfo.innerHTML = `<p>Condition: ${data.weather[0].description}</p>`;
    
    // Display weather icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.style.display = 'block';
}
