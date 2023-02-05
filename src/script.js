function formatDate(time) {
  let todayDate = new Date(time);
  let today = document.querySelector("#day");
  let date = document.querySelector("#date");
  let hoursMinutes = document.querySelector("#time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  today.innerHTML = days[todayDate.getDay()];
  date.innerHTML = ` ${
    todayDate.getMonth() + 1
  }/${todayDate.getDate()}/${todayDate.getFullYear()}`;
  let Minutes = todayDate.getMinutes();
  if (Minutes < 10) {
    Minutes = `0${Minutes}`;
  }
  hoursMinutes.innerHTML = `${todayDate.getHours()}:${Minutes}`;
}

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#temp-numb").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition-description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#weather-icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.condition.icon);

  formatDate(response.data.time * 1000);
}
function formatForecastDay(time) {
  let forecastDate = new Date(time);
  let forecastDay = document.querySelector("#forcast-day");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];

  return days[forecastDate.getDay()];
}

function handelForecast(response) {
  let forecastBoxes = document.querySelector("#forecast-boxes");
  let forecastDay = "";
  let forecastDaily = response.data.daily;

  forecastDaily.forEach(function (element, index) {
    if (index < 5) {
      forecastDay =
        forecastDay +
        ` <div class="forcast-box">
          <div class="forcast-day" id="forcast-day">${formatForecastDay(
            element.time * 1000
          )}</div>
          <div class="forcast-icon">
            <img class="forcast-img" id="forcast-icon" src="${
              element.condition.icon_url
            }" alt="${element.condition.icon}" />
          </div>
          <div class="forcast-temp">
            <span class="forcast-max-temp" id="forcast-max-temp" >${Math.round(
              element.temperature.maximum
            )}°</span
            >|<span class="forcast-min-temp" id="forcast-min-temp">${Math.round(
              element.temperature.minimum
            )}°</span>
          </div>
          </div>
        `;
    }
  });
  forecastBoxes.innerHTML = forecastDay;
}

function getApi(cityName) {
  let apiKey = "1bc06e4a65c718f0ab0b2fa3co98tde4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(forecastApiUrl).then(handelForecast);
}

function handelSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  cityName.toLowerCase();
  if (cityName.length == 0) {
    alert("Please type a city's name");
  }

  getApi(cityName);
}
function handelCurrentLocation(position) {
  let lon = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let apiKey = "1bc06e4a65c718f0ab0b2fa3co98tde4";
  let apiUrl = ` https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(forecastApiUrl).then(handelForecast);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handelCurrentLocation);
}

let celsiusTemp = null;
let citySearch = document.querySelector("#try-cities");
citySearch.addEventListener("submit", handelSubmit);

let button = document.querySelector("#button");
button.addEventListener("click", currentLocation);

getApi("Tehran");
