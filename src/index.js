const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const cityLocationEle = document.getElementById("cityLocation");
const tempEleF = document.getElementById("tempF");
const tempEleC = document.getElementById("tempC");
const descriptionEle = document.getElementById("description");
const degreeF = document.getElementById("degreeF");
const degreeC = document.getElementById("degreeC");

console.log("A degreesF", degreeF);
console.log("A cityLocationEle", cityLocationEle.textContent);
console.log("B tempEleF", tempEleF.textContent);
console.log("C descriptionEle", descriptionEle.textContent);

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_KEY = "3f3a3408c529719814d0064e8c5d0eb0";

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    fetchWeather(city);
    console.log(`D city:`, city);
    console.log(
      "E URL String:",
      `${WEATHER_URL}?q=${city}&appid=${WEATHER_KEY}`
    );
  }
});

function fetchWeather(city) {
  console.log(`F fecthWeather(city):`, city);

  fetch(`${WEATHER_URL}?q=${city}&appid=${WEATHER_KEY}&units=imperial`)
    .then((response) => {
      if (!response.ok) {
          throw new Error(`${city} name: typed wrong or blank input.`);
        }
      return response.json(); //is a real city then convert data to json 
    })
    .then((weatherData) => {
      console.log("G weatherData", weatherData);
      displayWeather(weatherData);
    })
    .catch((error) => {
      console.error(`Error fecthing weather data:`, error);
      descriptionEle.textContent = (`${city} name: typed wrong or blank input.`);
      cityLocationEle.textContent = "";
      tempEleF.textContent = "";
      tempEleC. textContent ="";
    });

    function displayWeather(weatherData) {
     console.log("H weatherData.name", weatherData.name);
     console.log("I weatherData cityLocationEle", cityLocationEle);
     cityLocationEle.textContent = weatherData.name;
     descriptionEle.textContent = weatherData.weather[0].description;
     tempEleF.textContent = `${Math.round(weatherData.main.temp)}°F`;
     tempEleC. textContent = `${Math.round((parseFloat(weatherData.main.temp)-32)*(5/9))} °C`;
     cityInput.placeholder = "Enter a City"; /// not working?? Why?? 

  }
}

function cfSwitch(){
    const f = tempEleF;
    const c = tempEleC;
    if (f.style.display === "none") {
      f.style.display = "block";
      c.style.display = "none"
    } else {
      f.style.display = "none";
      c.style.display = "block";
    }
  }

  const span = document.querySelector('span');
  const classes = span.classList;  
  span.addEventListener("click", () =>{
    const result = classes.toggle("(°M)");
    span.textContent = `${classes}`;
  })


// //Async/Await
// async function fetchWeather() {
//   let response = await fetch(
//     `${WEATHER_URL}?q=${city}&appid=${WEATHER_KEY}&units=imperial`
//   );
//   let weather = await response.json();

//   //update dom
//   displayWeather(weather);
//   try {
//   } catch (err) {
//     console.error(err);
//   }
// }
