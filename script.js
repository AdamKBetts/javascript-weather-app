const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherInfoDiv = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Keep this for now for debugging

                const temperature = Math.round(data.main.temp); // Round to the nearest whole number
                const description = data.weather[0].description;
                const cityName = data.name;
                const country = data.sys.country;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherIconCode = data.weather[0].icon;
                const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

                const weatherHTML = `
                    <h2>${cityName}, ${country}</h2>
                    <div class="weather-details">
                        <img src="${weatherIconUrl}" alt="${description}" width="50" height="50">
                        <p class="temperature">${temperature}°C</p>
                        <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                    </div>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;

                weatherInfoDiv.innerHTML = weatherHTML;
            })
            .catch(error => {
                console.error('Could not fetch weather data:', error);
                weatherInfoDiv.textContent = 'Failed to fetch weather data. Please try again.';
            });
    } else {
        alert('Please enter a city name.');
    }
});