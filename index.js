const apikey = "bf773751f1971845227534f9d02cbc3f";

const weatherDataEl = document.getElementById("weather-data");

const cityEl = document.getElementById("city");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}° C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}° C`;

        weatherDataEl.querySelector(
            ".description"
        ).textContent = `${description} in ${cityValue}`

        weatherDataEl.querySelector(
            ".details"
        ).innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".details").textContent = "An Error occured, please try again later";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}