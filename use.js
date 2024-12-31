const form = document.querySelector('.form-inline');
const input = document.querySelector('.input');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = input.value.trim();
  console.log("City entered:", city);

  if (city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a80f729a783c9638bcbf1d8d6429e821&units=metric`;
    
    try {
      const resp = await fetch(api);
    //   console.log("Response received:", resp);
      if (!resp.ok) {
        throw new Error("City not found or API error");
      }
      const data = await resp.json();
      console.log("Data fetched:", data);

      const newCity = document.querySelector('#city');
      const newTemp = document.querySelector('#temp');
      const newHumidity = document.querySelector('.humidity');
      const newSpeed = document.querySelector('.speed');
      const weatherImage = document.querySelector('.image');
      
      newCity.textContent = `${data.name}`;
      newTemp.textContent = `${data.main.temp}°C`;
      newHumidity.textContent = `${data.main.humidity}%`;
      newSpeed.textContent = `${data.wind.speed} Km/h`;

      const condition = data.weather[0].main.toLowerCase();
      if (condition.includes("clear")) {
        weatherImage.src = "images/clear.png";
      } else if (condition.includes("cloud")) {
        weatherImage.src = "images/clouds.png";
      } else if (condition.includes("rain")) {
        weatherImage.src = "images/rain.png";
      } else if (condition.includes("snow")) {
        weatherImage.src = "images/snow.png";
      } else if (condition.includes("mist")) {
        weatherImage.src = "images/mist.png";
      } else {
        weatherImage.src = "images/drizzle.png"; 
      }
    } catch (error) {
        alert("Enter a valid city name");
      console.error("Error fetching weather data:", error);
    }
  } else {
    console.log("Please enter a city name");
  }
});
