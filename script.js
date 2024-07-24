document.getElementById('getWeatherBtn').addEventListener('click', function() {
    var city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if inside a form
        var city = document.getElementById('cityInput').value;
        if (city) {
            getWeather(city);
        }
    }
});

function getWeather(city) {
    var apiKey = '6dadac2fb683233e61ab069ded3e9219';  
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                var weatherDetails = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p><strong>Temperature:</strong> ${data.main.temp} &deg;C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherDetails').innerHTML = weatherDetails;
            } else {
                document.getElementById('weatherDetails').innerHTML = `<p class="text-danger">City not found</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherDetails').innerHTML = `<p class="text-danger">Error fetching weather data</p>`;
        });
}
