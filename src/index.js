//ADDING IMAGES?// need URL https://openweathermap.org/img/wn/10d.png so https://openweathermap.org/img/wn/ + Icon 10d.png (which comes from weather id = 500)

import { SavedCities } from "./savedLocations";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const cityInput = document.querySelector("#cityInput");
  const searchBtn = document.querySelector("#searchBtn");
  const imgEle = document.querySelector("#image1");
  const cityLocationEle = document.getElementById("cityLocation");
  const descriptionEle = document.getElementById("description");
  const tempEleF = document.getElementById("tempF");
  const tempEleC = document.getElementById("tempC");
  const dateEle = document.querySelector("#date");
  const WeatherInfoDisplayedDiv = document.getElementById("weather-info");
  // API URL & KEY to OpenWeatherMap
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const WEATHER_KEY = "3f3a3408c529719814d0064e8c5d0eb0";

  const uLElement = document.querySelector("#ul");
  const savedCityEle = document.querySelector("#saved-city");
  const savedTempEle = document.querySelector("#saved-temp");
  const savedTempCEle = document.querySelector("#saved-tempC");
  const savedDescriptEle = document.querySelector("#saved-description");
  const savedTimeStamp = document.querySelector("#time-stamped");
  const saveCityBtn = document.querySelector("#saveCityBtn");
  const removeBtn = document.querySelector("#removeBtn");
  const refreshBtn = document.querySelector("#refreshBtn");
  const img2Ele = document.querySelector("#image2");

  // Check if elements exist before using them
  if (!WeatherInfoDisplayedDiv || !saveCityBtn) {
    console.log("Required DOM elements not found!");
    return;
  }

  // Ensure elements are hidden initially
  WeatherInfoDisplayedDiv.style.visibility = "hidden";
  saveCityBtn.style.visibility = "hidden";

  // Initialize SavedCities inside DOMContentLoaded
  let newSavedCities = new SavedCities();

  // Declare unixTimestamp
  let unixTimestamp = "0";

  // Reset search input function
  function resetSearchFunction() {
    cityInput.value = "";
  }

  searchBtn.addEventListener("click", () => {
    const enteredCity = cityInput.value;

    if (enteredCity) {
      fetchWeather(enteredCity);
      resetSearchFunction();
      WeatherInfoDisplayedDiv.style.visibility = `visible`;
      saveCityBtn.style.visibility = `visible`;
    }
  });

  function fetchWeather(enteredCity) {
    fetch(`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`) // Imperial = F degrees
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${enteredCity} name: typed wrong or blank input.`);
        }
        return response.json();
      })
      .then((weatherData) => {
        displayWeather(weatherData);
      })
      .catch((error) => {
        console.error(`Error fetching weather data:`, error);
        descriptionEle.textContent = `${enteredCity} name is an incorrect city. Please try again.`; // Error message
      });
  }

  function displayWeather(weatherData) {
    let icon = weatherData.weather[0].icon;
    imgEle.src = `https://openweathermap.org/img/wn/${icon}.png`;
    imgEle.alt = weatherData.weather[0].description;
    cityLocationEle.textContent = weatherData.name;
    descriptionEle.textContent = weatherData.weather[0].description;

    // Format the timestamp (in seconds) into a human-readable date
    unixTimestamp = weatherData.dt; // Assign the unix timestamp here
    let date = new Date(weatherData.dt * 1000); // Convert seconds to milliseconds
    dateEle.textContent = date.toLocaleString(); // Format as string

    tempEleF.textContent = `${Math.round(weatherData.main.temp)}°F`;
    tempEleC.textContent = `${Math.round(
      (parseFloat(weatherData.main.temp) - 32) * (5 / 9)
    )} °C`; // Conversion F to C
  }

  // Save & Remove Locations
  function updateDOMSavedList() {
    uLElement.innerHTML = " "; // Clear the contents of ul

    newSavedCities.list.forEach((newLocation) => {
      // Add city name to DOM ul list
      let liLocation = document.createElement("li");
      liLocation.textContent = `${newLocation.city}`;
      uLElement.appendChild(liLocation);

      liLocation.addEventListener("click", () =>
        showLocationDetails(newLocation)
      );
    });
  }

  function showLocationDetails(newLocation) {
    img2Ele.alt = newLocation.description;
    img2Ele.src = newLocation.icon;
    savedCityEle.textContent = newLocation.city;
    savedTempEle.textContent = newLocation.temp;
    savedTempCEle.textContent = newLocation.tempC;
    savedDescriptEle.textContent = newLocation.description;

    // Convert the saved timestamp (in seconds) to a readable date
    const date = new Date(newLocation.date * 1000); // Convert seconds to milliseconds
    console.log("date", date);
    savedTimeStamp.textContent = date.toLocaleString(); // Display formatted date

    // Enable remove button
    removeBtn.disabled = false;
    removeBtn.setAttribute("data-locationId", newLocation.id);
  }

  // Save & Remove button
  saveCityBtn.addEventListener("click", addCity);
  removeBtn.addEventListener("click", removeCity);

  function addCity(event) {
    event.preventDefault();

    let city = cityLocationEle.textContent;
    let temp = tempEleF.textContent;
    let tempC = tempEleC.textContent;
    let icon = imgEle.src; // weatherData.weather[0].icon;
    let description = descriptionEle.textContent;
    let date = unixTimestamp; // Save the raw Unix timestamp here

    newSavedCities.add(city, temp, tempC, icon, description, date);

    updateDOMSavedList();
  }

  function removeCity() {
    const locationId = Number(removeBtn.getAttribute("data-locationId"));

    if (locationId !== undefined && locationId !== null) {
      newSavedCities.remove(locationId);
      updateDOMSavedList(); // Re-render the saved list after removing a city
      savedCityEle.textContent = "";
      savedTempEle.textContent = "";
      savedTempCEle.textContent = "";
      savedDescriptEle.textContent = "";
      savedTimeStamp.textContent = "";
      img2Ele.alt = "";
      img2Ele.src = "";
      removeBtn.disabled = true; // Disable remove btn
    } else {
      console.error("No location ID to remove");
    }
  }

  // Toggle between C and F // Add save elements for F & C
  const switchDegrees = document.getElementById("switchDegBtn");

  switchDegrees.addEventListener("click", () => {
    const f = tempEleF;
    const c = tempEleC;
    if (f.style.display === "none") {
      f.style.display = "block";
      c.style.display = "none";
    } else {
      f.style.display = "none";
      c.style.display = "block";
    }
  });
});
