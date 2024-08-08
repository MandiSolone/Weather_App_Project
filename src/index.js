// To fix - clear search bar after entered 
// fix error catch 
// fix can't enter a name more than once 
// CSS styling to hide a div until populated or click? 
// change save li to show arrow/hoover/ 
//style CSS 

//pull and store C and toggle b/w 
//add images to stored areas 
//It’d be nice to have a button for refetching updated weather information for selected areas.//add timestamp to saved locations.
//Add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.

//ADDING IMAGES?// need URL https://openweathermap.org/img/wn/10d.png so https://openweathermap.org/img/wn/ + Icon 10d.png (which comes from weather id = 500)

import { SavedCities } from "./savedLocations";

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const imgEle = document.querySelector("#image1");
const cityLocationEle = document.getElementById("cityLocation");
const tempEleF = document.getElementById("tempF");
const tempEleC = document.getElementById("tempC");
const descriptionEle = document.getElementById("description");
const dateEle = document.querySelector("#date");
const WeatherInfoDisplayedDiv = document.getElementById("#weather-info");

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_KEY = "3f3a3408c529719814d0064e8c5d0eb0";

const uLElement = document.querySelector("#ul");
const savedCityEle = document.querySelector("#saved-city"); 
const savedTempEle = document.querySelector("#saved-temp"); 
const savedTempCEle = document.querySelector("#saved-tempC");
const savedDescriptEle = document.querySelector("#saved-description"); 
const savedTimeStamp = document.querySelector("time-stamped");
const saveCityBtn = document.querySelector("#saveCityBtn");
const removeBtn = document.querySelector("#removeBtn");
const refreshBtn = document.querySelector ("#refreshBtn");

searchBtn.addEventListener("click", () => {
  const enteredCity = cityInput.value;
  if (enteredCity) {
    fetchWeather(enteredCity);  
    resetSearchFunction(); //not working 
    WeatherInfoDisplayedDiv.style.visibility = `visible`; 
    // saveCityBtn.style.visibility = `visible`; not working 
  }
});


function fetchWeather(enteredCity) {
  fetch(`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`)// Imperial = F degrees
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
      console.error(`Error fecthing weather data:`, error);
      descriptionEle.textContent = (`${enteredCity} name is an incorrect city. Please try again.`);//Is this working?
    });

  function displayWeather(weatherData) { 
    let icon = weatherData.weather[0].icon
    imgEle.src = (`https://openweathermap.org/img/wn/${icon}.png`);
    imgEle.alt = weatherData.weather[0].description;
    cityLocationEle.textContent = weatherData.name;
    descriptionEle.textContent = weatherData.weather[0].description;
    dateEle.textContent = weatherData.dt;
    tempEleF.textContent = `${Math.round(weatherData.main.temp)}°F`;
    tempEleC.textContent = `${Math.round((parseFloat(weatherData.main.temp) - 32) * (5 / 9))} °C`; //conversion F to C 
  }
  
  //clear search bar 
function resetSearchFunction() {
    cityInput.value = ""; 
  }

// Save & Remove Locations 
let newSavedCities = new SavedCities(); 

function updateDOMSavedList(){
    uLElement.innerHTML = " "; //clear the contents of ul 

    newSavedCities.list.forEach((newLocation) => { //add city name to DOM uL list. Stored in newSavedCities w/ an id 
    let liLocation = document.createElement("li"); 
    liLocation.textContent = `${newLocation.city}`; 
    uLElement.appendChild(liLocation); 

    liLocation.addEventListener("click", () => showLocationDetails(newLocation)); 

    });
    function showLocationDetails(newLocation) {
        const img2Ele = document.querySelector("#image2"); 
        
        // let icon2 = newLocation.icon;
        // img2Ele.src = (`https://openweathermap.org/img/wn/${icon2}.png`);
        
        img2Ele.alt = newLocation.description;
        img2Ele.src = newLocation.icon;
        savedTimeStamp.textContent = newLocation.date;
        savedCityEle.textContent = newLocation.city; 
        savedTempEle.textContent = newLocation.temp; 
        savedTempCEle.textContent = newLocation.tempC; 
        savedDescriptEle.textContent = newLocation.description;
        //enable remove button
        //This will set a custom data- attribute on the DOM element that corresponds with the selected element
        removeBtn.disabled = false; 
        removeBtn.setAttribute("data-locationId", newLocation.id);
    }
}

//Save & Remove button
saveCityBtn.addEventListener("click", addCity);
removeBtn.addEventListener("click", removeCity);

function addCity(event) {
    event.preventDefault(); 

    let city = cityLocationEle.textContent;
    let temp = tempEleF.textContent;
    let tempC = tempEleC.textContent; 
    let icon =  imgEle.src; //weatherData.weather[0].icon;
    console.log("addCity icon", icon);
    let description = descriptionEle.textContent;
    let date = dateEle.textContent;

    newSavedCities.add(city, temp, tempC, icon, description, date);

    updateDOMSavedList(); 
}

function removeCity() {
    let locationId = Number(removeBtn.getAttribute("data-locationId"));
   
    newSavedCities.remove(locationId); 
 
    updateDOMSavedList(); 
    savedCityEle.textContent = "";
    savedTempEle.textContent = "";
    savedDescriptEle.textContent = "";
    removeBtn.disabled = true;// disable remove Btn
}

//refresh Saved Weather Button 
refreshBtn.addEventListener("click", fetchRefreshCity);

function fetchRefreshCity(refreshWeatherData){
    const refreshCity = document.querySelector("#saved-city");

  fetch(`${WEATHER_URL}?q=${refreshCity.value}&appid=${WEATHER_KEY}&units=imperial`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${refreshCity.value} name: typed wrong or blank input.`);
      }
      return response.json(); 
    })
    .then((refreshWeatherData) => {
       savedTimeStamp.textContent = refreshWeatherData.date;
        savedCityEle.textContent = refreshWeatherData.city; 
        savedTempEle.textContent = refreshWeatherData.temp; 
        savedDescriptEle.textContent = refreshWeatherData.description;
    })
    .catch((error) => {
      console.error(`Error fecthing weather data:`, error);
      descriptionEle.textContent = (`${refreshCity.value} name is an incorrect city. Please try again.`);//not working??
    });

//Toggle b/w C and F //add save elements for f & c 
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
}