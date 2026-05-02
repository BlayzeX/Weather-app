const card = document.getElementById('card');
const input = document.getElementById('weatherInput');
const apiKey = '91838c8ce2643fb69776b8b708fa95d8';
const weatherForm = document.getElementById('form');
weatherForm.addEventListener('submit', async event => {
    event.preventDefault();

     const city = input.value;
    if(city) {
        try{
           const weatherData = await getWeatherData(city);
           displayWeatherData(weatherData);
        }
        catch(error){
           console.error(error);
           displayError('error');
        }
    }
    else {
        displayError("Please Enter a City");
    }
});
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
};
function displayWeatherData(data){
    const {name: city,
          main: {temp, humidity},
          weather: [{description, id}] 
    } = data;
        card.innerHTML = `
        <h2 id="city"></h2>
        <h2 id="weather"></h2>
        <h2 id="humidity"></h2>
        <h2 id="description"></h2>
    `;

    card.style.display = "flex";
        card.innerHTML = `
    <h2 id="city"></h2>
    <h2 id="weather"></h2>
    <h2 id="humidity"></h2>
    <h2 id="description"></h2>
    <p id="emoji"></p>
`;
    const cityName = document.getElementById("city");
    cityName.textContent = city;
    const weather = document.getElementById("weather");
    weather.textContent = `${temp.toFixed(1)}°C `;
    const Humidity = document.getElementById("humidity");
    Humidity.textContent = `Humidity :${humidity}%`;
    const Description = document.getElementById("description");
    Description.textContent = description;
    const emoji = document.getElementById('emoji').textContent = getWeatherEmoji(id);
}
function displayError(message){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.fontSize = "24px";
    card.style.display = "block";
    card.textContent = "";
    card.appendChild(errorMessage);
}
function getWeatherEmoji(WeatherId) {
    switch(true) {
        case (WeatherId >= 200 && WeatherId < 300):
            return "⛈️";
        case (WeatherId >= 300 && WeatherId < 400):
            return "⛈️";
        case (WeatherId >= 500 && WeatherId < 600):
            return "🌩️";
        case (WeatherId >= 600 && WeatherId < 700):
            return "❄️";
        case (WeatherId >= 700 && WeatherId < 800):
            return "💨";
        case(WeatherId === 800):
            return "☀️";
        case(WeatherId >= 801 && WeatherId < 810):
            return "☁️";
        default:
            return "?";
    }
}