const submitButton = document.querySelector('.butt');
const locationInput = document.querySelector('.location-input');
const locationDisplay = document.querySelector('.container2 .location');
const weatherImage = document.querySelector('.weather-image');


const APIKey = '9077c13eacbca3f1488741f69944b653'; // Make sure this key is correct

const fetchWeatherData = () => {
    const city = locationInput.value.trim();

    if (city === '') {
        alert('Please enter a location!');
        return;
    }


    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            // Handle case where location is not found
            if (data.cod != '200') {
                locationDisplay.innerHTML = ` Location not found: ${city}`;
                locationDisplay.style.color = 'red';
                weatherImage.style.display = "none";
                return;
            }

            console.log(data)

            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            switch (data.weather[0].main) {
                case 'Clear':
                    weatherImage.src = 'Icons/clear.png';
                    document.body.className = 'clear';
                    break;

                case 'Rain':
                    weatherImage.src = 'Icons/rain.png';
                    document.body.className = 'rain';
                    break;

                case 'Snow':
                    weatherImage.src = 'Icons/snow.png';
                    document.body.className = 'snow';
                    break;

                case 'Clouds':
                    weatherImage.src = 'Icons/cloud.png';
                    document.body.className = 'clouds';
                    break;

                case 'Haze':
                    weatherImage.src = 'Icons/mist.png';
                    document.body.className = 'haze';
                    break;

                case 'Fog':
                    weatherImage.src = 'Icons/mist.png';
                    document.body.className = 'fog';
                    break;
            }


            locationDisplay.innerHTML = `
                <div>${data.name}, ${data.sys.country}</div>
                <div class = "txt1">${temperature}°C, ${description}</div>
                <div class="txt2">
                    Humidity: ${humidity}% | Wind: ${windSpeed} m/s
                </div>
                `;
            locationDisplay.style.color = 'white';
        })
        .catch(err => {
            console.error(err);
            locationDisplay.innerHTML = 'An error occurred. Please try again.';
            locationDisplay.style.color = 'red';
        });
};

submitButton.addEventListener('click', fetchWeatherData);

locationInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
});
