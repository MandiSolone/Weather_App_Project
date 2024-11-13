/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _savedLocations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./savedLocations */ \"./src/savedLocations.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n// To fix - clear search bar after entered\n// fix error catch\n// fix can't enter a name more than once\n// CSS styling to hide a div until populated or click?\n// change save li to show arrow/hoover/\n//style CSS\n\n//pull and store C and toggle b/w\n//add images to stored areas\n//It’d be nice to have a button for refetching updated weather information for selected areas.//add timestamp to saved locations.\n//Add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.\n\n//ADDING IMAGES?// need URL https://openweathermap.org/img/wn/10d.png so https://openweathermap.org/img/wn/ + Icon 10d.png (which comes from weather id = 500)\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // DOM elements\n  var cityInput = document.querySelector(\"#cityInput\");\n  var searchBtn = document.querySelector(\"#searchBtn\");\n  var imgEle = document.querySelector(\"#image1\");\n  var cityLocationEle = document.getElementById(\"cityLocation\");\n  var descriptionEle = document.getElementById(\"description\");\n  var tempEleF = document.getElementById(\"tempF\");\n  var tempEleC = document.getElementById(\"tempC\");\n  var dateEle = document.querySelector(\"#date\");\n  var WeatherInfoDisplayedDiv = document.getElementById(\"weather-info\");\n  // API URL & KEY to OpenWeatherMap\n  var WEATHER_URL = \"https://api.openweathermap.org/data/2.5/weather\";\n  var WEATHER_KEY = \"3f3a3408c529719814d0064e8c5d0eb0\";\n  var uLElement = document.querySelector(\"#ul\");\n  var savedCityEle = document.querySelector(\"#saved-city\");\n  var savedTempEle = document.querySelector(\"#saved-temp\");\n  var savedTempCEle = document.querySelector(\"#saved-tempC\");\n  var savedDescriptEle = document.querySelector(\"#saved-description\");\n  var savedTimeStamp = document.querySelector(\"time-stamped\");\n  var saveCityBtn = document.querySelector(\"#saveCityBtn\");\n  var removeBtn = document.querySelector(\"#removeBtn\");\n  var refreshBtn = document.querySelector(\"#refreshBtn\");\n\n  // Check if elements exist before using them \n  if (!WeatherInfoDisplayedDiv || !saveCityBtn) {\n    console.log('Required DOM elements not found!');\n    return;\n  }\n\n  // Ensure elements are hidden initially \n  WeatherInfoDisplayedDiv.style.visibility = 'hidden';\n  saveCityBtn.style.visibility = 'hidden';\n\n  // Initialize SavedCities inside DOMContentLoaded\n  var newSavedCities = new _savedLocations__WEBPACK_IMPORTED_MODULE_0__.SavedCities();\n\n  // Declare unixTimestamp \n  var unixTimestamp = \"0\";\n\n  // Reset search input function  \n  function resetSearchFunction() {\n    cityInput.value = \"\";\n  }\n  searchBtn.addEventListener(\"click\", function () {\n    var enteredCity = cityInput.value;\n    if (enteredCity) {\n      fetchWeather(enteredCity);\n      resetSearchFunction();\n      WeatherInfoDisplayedDiv.style.visibility = \"visible\";\n      saveCityBtn.style.visibility = \"visible\";\n    }\n  });\n  function fetchWeather(enteredCity) {\n    fetch(\"\".concat(WEATHER_URL, \"?q=\").concat(enteredCity, \"&appid=\").concat(WEATHER_KEY, \"&units=imperial\")) // Imperial = F degrees\n    .then(function (response) {\n      if (!response.ok) {\n        throw new Error(\"\".concat(enteredCity, \" name: typed wrong or blank input.\"));\n      }\n      return response.json();\n    }).then(function (weatherData) {\n      displayWeather(weatherData);\n    })[\"catch\"](function (error) {\n      console.error(\"Error fetching weather data:\", error);\n      descriptionEle.textContent = \"\".concat(enteredCity, \" name is an incorrect city. Please try again.\"); // Error message\n    });\n  }\n  function displayWeather(weatherData) {\n    var icon = weatherData.weather[0].icon;\n    imgEle.src = \"https://openweathermap.org/img/wn/\".concat(icon, \".png\");\n    imgEle.alt = weatherData.weather[0].description;\n    cityLocationEle.textContent = weatherData.name;\n    descriptionEle.textContent = weatherData.weather[0].description;\n\n    // Format the timestamp (in seconds) into a human-readable date\n    unixTimestamp = weatherData.dt; // Assign the unix timestamp here\n    var date = new Date(weatherData.dt * 1000); // Convert seconds to milliseconds\n    dateEle.textContent = date.toLocaleString(); // Format as string\n\n    tempEleF.textContent = \"\".concat(Math.round(weatherData.main.temp), \"\\xB0F\");\n    tempEleC.textContent = \"\".concat(Math.round((parseFloat(weatherData.main.temp) - 32) * (5 / 9)), \" \\xB0C\"); // Conversion F to C \n  }\n\n  // Save & Remove Locations \n  function updateDOMSavedList() {\n    uLElement.innerHTML = \" \"; // Clear the contents of ul \n\n    newSavedCities.list.forEach(function (newLocation) {\n      // Add city name to DOM ul list\n      var liLocation = document.createElement(\"li\");\n      liLocation.textContent = \"\".concat(newLocation.city);\n      uLElement.appendChild(liLocation);\n      liLocation.addEventListener(\"click\", function () {\n        return showLocationDetails(newLocation);\n      });\n    });\n  }\n  function showLocationDetails(newLocation) {\n    var img2Ele = document.querySelector(\"#image2\");\n    img2Ele.alt = newLocation.description;\n    img2Ele.src = newLocation.icon;\n    savedCityEle.textContent = newLocation.city;\n    savedTempEle.textContent = newLocation.temp;\n    savedTempCEle.textContent = newLocation.tempC;\n    savedDescriptEle.textContent = newLocation.description;\n\n    // Convert the saved timestamp (in seconds) to a readable date\n    var date = new Date(newLocation.date * 1000); // Convert seconds to milliseconds\n    savedTimeStamp.textContent = date.toLocaleString(); // Display formatted date\n\n    // Enable remove button\n    removeBtn.disabled = false;\n    removeBtn.setAttribute(\"data-locationId\", newLocation.id);\n  }\n\n  // Save & Remove button\n  saveCityBtn.addEventListener(\"click\", addCity);\n  removeBtn.addEventListener(\"click\", removeCity);\n  function addCity(event) {\n    event.preventDefault();\n    var city = cityLocationEle.textContent;\n    var temp = tempEleF.textContent;\n    var tempC = tempEleC.textContent;\n    var icon = imgEle.src; // weatherData.weather[0].icon;\n    var description = descriptionEle.textContent;\n    var date = unixTimestamp; // Save the raw Unix timestamp here\n\n    newSavedCities.add(city, temp, tempC, icon, description, date);\n    updateDOMSavedList();\n  }\n  function removeCity() {\n    var locationId = Number(removeBtn.getAttribute(\"data-locationId\"));\n    if (locationId !== undefined && locationId !== null) {\n      newSavedCities.remove(locationId);\n      updateDOMSavedList(); // Re-render the saved list after removing a city\n      savedCityEle.textContent = \"\";\n      savedTempEle.textContent = \"\";\n      savedDescriptEle.textContent = \"\";\n      removeBtn.disabled = true; // Disable remove Btn\n    } else {\n      console.error('No location ID to remove');\n    }\n  }\n\n  // Toggle between C and F // Add save elements for F & C\n  var switchDegrees = document.getElementById(\"switchDegBtn\");\n  switchDegrees.addEventListener(\"click\", function () {\n    var f = tempEleF;\n    var c = tempEleC;\n    if (f.style.display === \"none\") {\n      f.style.display = \"block\";\n      c.style.display = \"none\";\n    } else {\n      f.style.display = \"none\";\n      c.style.display = \"block\";\n    }\n  });\n});\n\n//# sourceURL=webpack://weather_app_project/./src/index.js?");

/***/ }),

/***/ "./src/savedLocations.js":
/*!*******************************!*\
  !*** ./src/savedLocations.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Location: () => (/* binding */ Location),\n/* harmony export */   SavedCities: () => (/* binding */ SavedCities)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nvar Location = /*#__PURE__*/_createClass(function Location(id, city, temp, tempC, icon, description, date) {\n  _classCallCheck(this, Location);\n  this.id = id;\n  this.city = city;\n  this.temp = temp;\n  this.tempC = tempC;\n  this.icon = icon;\n  this.description = description;\n  this.date = date; // Store the Unix timestamp directly here\n});\nvar SavedCities = /*#__PURE__*/function () {\n  function SavedCities() {\n    _classCallCheck(this, SavedCities);\n    this.list = [];\n    this.nextId = 0;\n  }\n  return _createClass(SavedCities, [{\n    key: \"add\",\n    value: function add(city, temp, tempC, icon, description, date) {\n      var newLocation = new Location(this.nextId++, city, temp, tempC, icon, description, date);\n      this.list.push(newLocation);\n    }\n  }, {\n    key: \"remove\",\n    value: function remove(locationId) {\n      this.list = this.list.filter(function (location) {\n        return location.id !== locationId;\n      });\n    }\n  }]);\n}();\n\n//# sourceURL=webpack://weather_app_project/./src/savedLocations.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://weather_app_project/./src/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;