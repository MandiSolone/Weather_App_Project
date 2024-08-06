// To fix - clear search bar after entered 
// fix error catch 
// can't enter a name more than once 
//style CSS 
//pull and store C and toggle b/w 
//add images that match weather 
//add timestamp to saved locations 

import { SavedCities } from "./savedLocations";
//Pull API info from openWeather and present for entered city 

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const cityLocationEle = document.getElementById("cityLocation");
const tempEleF = document.getElementById("tempF");
const tempEleC = document.getElementById("tempC");
const descriptionEle = document.getElementById("description");

console.log("A cityInput", cityInput.textContent); //not storing this or letting me pull it 
console.log("B searchBtn", searchBtn.value);  
console.log("C cityLocationEle", cityLocationEle.textContent);
console.log("D tempEleF", tempEleF.textContent);
console.log("E tempEleC", tempEleC.textContent);
console.log("F descriptionEle", descriptionEle.textContent);

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_KEY = "3f3a3408c529719814d0064e8c5d0eb0";

searchBtn.addEventListener("click", () => {
  const enteredCity = cityInput.value;
  console.log("G enteredCity", enteredCity);

  if (enteredCity) {
    fetchWeather(enteredCity);
  }
});

function fetchWeather(enteredCity) {
  console.log(`H fetchWeather(enteredCity):`, enteredCity);
  console.log(`I URL`, (`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`));
  fetch(`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`)//pulls in F (Imperial)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${enteredCity} name: typed wrong or blank input.`);
      }
      return response.json(); //If a real city then convert data to json
    })
    .then((weatherData) => {
      console.log("J weatherData", weatherData);
      displayWeather(weatherData);
    })
    .catch((error) => {
      console.error(`Error fecthing weather data:`, error);
      descriptionEle.textContent = `${enteredCity} name: typed wrong or blank input.`;
    //   cityLocationEle.textContent = "";
    //   tempEleF.textContent = "";
    //   tempEleC.textContent = "";
    });

  function displayWeather(weatherData) { //pulls json file into this function 
    console.log("K weatherData.name", weatherData.name);
    console.log("L weatherData.weather[0].description", weatherData.weather[0].description);
    console.log("M `${Math.round(weatherData.main.temp)}°F`", `${Math.round(weatherData.main.temp)}°F`);
    console.log("N °C", `${Math.round(
      (parseFloat(weatherData.main.temp) - 32) * (5 / 9)
    )} °C`);
    console.log("O cityInput.placeholder", cityInput.placeholder);

    cityLocationEle.textContent = weatherData.name;
    descriptionEle.textContent = weatherData.weather[0].description;
    tempEleF.textContent = `${Math.round(weatherData.main.temp)}°F`;
    tempEleC.textContent = `${Math.round(
      (parseFloat(weatherData.main.temp) - 32) * (5 / 9)
    )} °C`; //conversion F to C // How do I make it just stored and not printed yet? 
    cityInput.placeholder = "Enter a City"; // reset serch bar // not working?? Why??
  }
}

//Toggle b/w C and F
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

// Save & Remove Locations //Do I need to add an await/promise? 
let newSavedCities = new SavedCities(); 
console.log(newSavedCities.list); 

const uLElement = document.querySelector("#ul");
const SavedCityEle = document.querySelector("#saved-city"); 
const SavedTempEle = document.querySelector("#saved-temp"); 
const SavedDescriptEle = document.querySelector("#saved-description");
const saveCityBtn = document.querySelector("#saveCityBtn");
const removeBtn = document.querySelector("#removeBtn"); 

console.log("1 uLElement", uLElement); 
console.log("2 SavedCityEle", SavedCityEle); 
console.log("3 SavedTempEle", SavedTempEle); 
console.log("4 SavedDescriptEle", SavedDescriptEle); 
console.log("5 saveCityBtn", saveCityBtn); 
console.log("6 removeBt", removeBtn); 

saveCityBtn.addEventListener("click", addCity);
removeBtn.addEventListener("click", removeCity);

function updateDOMSavedList(){
    uLElement.innerHTML = " "; //clear the contents of ul 

    newSavedCities.list.forEach((newLocation) => { 
        let liLocation = document.createElement("li"); 
        liLocation.textContent = `${newLocation.city}`; //???Think through this logic more//

        console.log("7 newLocation.city",newLocation.city);
        console.log("8 liLocation.textContent",liLocation.textContent); 

        uLElement.appendChild(liLocation); //add city name to DOM uL list. Stored in newSavedCities w/ an id # 

        liLocation.addEventListener("click", () => showLocationDetails(newLocation)); //when Li is clicked it show data
    });

    function showLocationDetails (newLocation) {
        SavedCityEle.textContent = newLocation.city; 
        SavedTempEle.textContent = newLocation.temp; 
        SavedDescriptEle.textContent = newLocation.description;
        removeBtn.disabled = false; //enable remove button 

        console.log("9 newLocation.city",newLocation.city); 
        console.log("10  SavedCityEle.textContent", SavedCityEle.textContent); 
        console.log("11 newLocation.temp",newLocation.temp); 
        console.log("12 SavedTempEle.textContent",SavedTempEle.textContent); 
        console.log("13 newLocation.description",newLocation.description); 
        console.log("14 SavedDescriptEle.textContent",SavedDescriptEle.textContent); 

     //This will set a custom data- attribute on the DOM element that corresponds with the selected element
     removeBtn.setAttribute("data-locationId", newLocation.id);

     console.log("15 newLocation.id",newLocation.id); 
     console.log("16 removeBtn.attributes",removeBtn.attributes); 
    }
}

function addCity(event) {
    event.preventDefault(); 

    let city = cityLocationEle.textContent;
    let temp = tempEleF.textContent;
    let description = descriptionEle.textContent;
    newSavedCities.add(city, temp, description);
    console.log("17 cityLocationEle.textContent",cityLocationEle.textContent);
    console.log("18 tempEleF.textContent",tempEleF.textContent);
    console.log("19 descriptionEle.textContente",descriptionEle.textContent);
    console.log("20 newSavedCities.list",newSavedCities.list);

    updateDOMSavedList(); 
}

function removeCity() {
    let locationId = Number(removeBtn.getAttribute("data-locationId"));
    console.log("21 locationId", Number(removeBtn.getAttribute("data-locationId"))); 
    newSavedCities.remove(locationId); 
    console.log("22 newSavedCities.list", newSavedCities.list); 

    updateDOMSavedList(); //think through logic and do console.logs 
    SavedCityEle.textContent = "";
    SavedTempEle.textContent = "";
  SavedDescriptEle.textContent = "";
  removeBtn.disabled = true;// disable remove Btn
}