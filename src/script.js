function formatDate(time) {
  let todayDate = new Date(time);
  let today = document.querySelector("#day");
  let date = document.querySelector("#date");
  let hoursMinutes = document.querySelector("#time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "saturday",
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
  console.log(response);
  celsiusTemp = response.data.temperature.current;
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
  document.querySelector("#celsius-unit").setAttribute("style", "");
  document.querySelector("#fahrenheit-unit").style.cssText =
    "color:#008ae0; font-size:14px; font-weight :600;  cursor:pointer";
  formatDate(response.data.time * 1000);
}

function getApi(cityName) {
  let apiKey = "1bc06e4a65c718f0ab0b2fa3co98tde4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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
  axios.get(apiUrl).then(showWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handelCurrentLocation);
}
function changeUnitToC(event) {
  event.preventDefault();
  document.querySelector("#celsius-unit").setAttribute("style", "");
  let temp = document.querySelector("#temp-numb");
  temp.innerHTML = Math.round(celsiusTemp);
  document.querySelector("#fahrenheit-unit").style.cssText =
    "color:#008ae0; font-size:14px; font-weight :600;  cursor:pointer";
}

function changeUnitToF(event) {
  event.preventDefault();
  document.querySelector("#fahrenheit-unit").setAttribute("style", "");

  let temp = document.querySelector("#temp-numb");
  temp.innerHTML = Math.round(celsiusTemp * (9 / 5) + 32);
  document.querySelector("#celsius-unit").style.cssText =
    "color:#008ae0; font-size:14px; font-weight :600; cursor:pointer ";
}

let celsiusTemp = null;
let citySearch = document.querySelector("#try-cities");
citySearch.addEventListener("submit", handelSubmit);

let button = document.querySelector("#button");
button.addEventListener("click", currentLocation);

let celsius = document.querySelector("#celsius-unit");
let fahrenheit = document.querySelector("#fahrenheit-unit");

celsius.addEventListener("click", changeUnitToC);
fahrenheit.addEventListener("click", changeUnitToF);
getApi("Tehran");
