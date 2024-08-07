// To fix - clear search bar after entered 
// fix error catch 
// can't enter a name more than once 
// CSS styling to hide a div until populated or click? 
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

  fetch(`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`)// Imperial = F degrees
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${enteredCity} name: typed wrong or blank input.`);
      }
      return response.json(); 
    })
    .then((weatherData) => {
      console.log("J weatherData", weatherData);
      console.log("A cityInput", cityInput.textContent); //not storing this or letting me pull it 
      console.log("B searchBtn", searchBtn.value);  
      console.log("C cityLocationEle", cityLocationEle.textContent);
      console.log("D tempEleF", tempEleF.textContent);
      console.log("E tempEleC", tempEleC.textContent);
      console.log("F descriptionEle", descriptionEle.textContent);
      console.log("GG weatherData.id", weatherData.id);

      displayWeather(weatherData);
    })
    .catch((error) => {
      console.error(`Error fecthing weather data:`, error);
      descriptionEle.textContent = (`${enteredCity} name is an incorrect city. Please try again.`);//not working??
    });

  
  function displayWeather(weatherData) { 
    let icon = weatherData.weather[0].icon

    console.log("K weatherData.name", weatherData.name);
    console.log("L weatherData.weather[0].description", weatherData.weather[0].description);
    console.log("M `${Math.round(weatherData.main.temp)}°F`", `${Math.round(weatherData.main.temp)}°F`);
    console.log("N °C", `${Math.round(
      (parseFloat(weatherData.main.temp) - 32) * (5 / 9)
    )} °C`);
    console.log("O cityInput.placeholder", cityInput.placeholder);
    console.log("O2 weatherData.weather[0].icon", weatherData.weather[0].icon);
    console.log("O3 icon", icon);

    imgEle.src = (`https://openweathermap.org/img/wn/${icon}.png`);
    imgEle.alt = weatherData.weather[0].description;
    cityLocationEle.textContent = weatherData.name;
    descriptionEle.textContent = weatherData.weather[0].description;
    dateEle.textContent = weatherData.dt;
    tempEleF.textContent = `${Math.round(weatherData.main.temp)}°F`;
    tempEleC.textContent = `${Math.round(
      (parseFloat(weatherData.main.temp) - 32) * (5 / 9)
    )} °C`; //conversion F to C // How do I make it just stored and not printed yet?
    }
     // reset serch bar // not working?? Why?? //cityInput.value =""; 
     cityInput.placeholder = "Enter a City"; 
     cityInput.value ="";
  }

// Save & Remove Locations //Do I need to add an await/promise? 
let newSavedCities = new SavedCities(); 
console.log(newSavedCities.list); 

const uLElement = document.querySelector("#ul");
const savedCityEle = document.querySelector("#saved-city"); 
const savedTempEle = document.querySelector("#saved-temp"); 
const savedDescriptEle = document.querySelector("#saved-description"); 
const savedTimeStamp = document.querySelector("time-stamped");
const saveCityBtn = document.querySelector("#saveCityBtn");
const removeBtn = document.querySelector("#removeBtn");

console.log("1 uLElement", uLElement); 
console.log("2 savedCityEle", savedCityEle); 
console.log("3 savedTempEle", savedTempEle); 
console.log("4 savedDescriptEle", savedDescriptEle); 
console.log("5 saveCityBtn", saveCityBtn); 
console.log("6 removeBt", removeBtn); 

saveCityBtn.addEventListener("click", addCity);
removeBtn.addEventListener("click", removeCity);

function updateDOMSavedList(){
    uLElement.innerHTML = " "; //clear the contents of ul 

        newSavedCities.list.forEach((newLocation) => { 
        let liLocation = document.createElement("li"); 
        liLocation.textContent = `${newLocation.city}`; 

        console.log("7 newLocation.city",newLocation.city);
        console.log("8 liLocation.textContent",liLocation.textContent); 

        uLElement.appendChild(liLocation); //add city name to DOM uL list. Stored in newSavedCities w/ an id # 

        liLocation.addEventListener("click", () => showLocationDetails(newLocation)); //when li is clicked it shows data
    });

    function showLocationDetails(newLocation) {
        const img2Ele = document.querySelector("#image2"); 
        //let icon2 = weatherData.weather[0].icon
        let icon2 = newLocation.icon

        img2Ele.src = (`https://openweathermap.org/img/wn/${icon2}.png`);
        img2Ele.alt = newLocation.description;

        savedTimeStamp.textContent = newLocation.date;
        savedCityEle.textContent = newLocation.city; 
        savedTempEle.textContent = newLocation.temp; 
        savedDescriptEle.textContent = newLocation.description;

        removeBtn.disabled = false; //enable remove button
        

        console.log("9 newLocation.city",newLocation.city); 
        console.log("10  savedCityEle.textContent", savedCityEle.textContent); 
        console.log("11 newLocation.temp",newLocation.temp); 
        console.log("12 savedTempEle.textContent",savedTempEle.textContent); 
        console.log("13 newLocation.description",newLocation.description); 
        console.log("14 savedDescriptEle.textContent",savedDescriptEle.textContent); 

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
    let date =   
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
    savedCityEle.textContent = "";
    savedTempEle.textContent = "";
  savedDescriptEle.textContent = "";
  removeBtn.disabled = true;// disable remove Btn
}

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
});