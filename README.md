README file
# Weather App Project

A simple weather app built using HTML, CSS, JavaScript, and the OpenWeatherMap API. Users can search for a city's weather by name, view the current temperature in Fahrenheit and Celsius, and save their favorite cities to revisit later.

## Features:
- Search weather by city name
- Display current temperature (in both Fahrenheit and Celsius)
- Display weather icon and description
- Save and remove favorite cities
- Toggle between Fahrenheit and Celsius
- View saved cities with their details

## Technologies Used:
- **HTML**
- **CSS**
- **JavaScript**
- **OpenWeatherMap API** (for fetching weather data)
- **Webpack** (for bundling the project)

## How It Works

The weather app allows users to search for weather by city name. It fetches data from the OpenWeatherMap API, displaying:
- City Name
- Weather Description
- Temperature (Fahrenheit and Celsius)
- Weather Icon (based on the weather condition)

Users can also save cities to revisit later, and toggle between Fahrenheit and Celsius for temperature display.

### Steps to use:

1. **Search for a city**:
   - Type the name of a city into the search input and click the search button. The app will fetch the weather data for the entered city and display it on the screen.
   
2. **Save cities**:
   - After searching for a city, click the "Save City" button to save the city to your list of saved locations.

3. **View saved cities**:
   - Your saved cities will appear in a list below the search area. Clicking on a saved city will display its details (temperature, description, and timestamp).

4. **Remove saved cities**:
   - Clicking on the "Remove" button next to a saved city will remove that city from the list.

5. **Switch between Fahrenheit and Celsius**:
   - Click the "Switch" button to toggle between Fahrenheit and Celsius temperature displays.

---

## Setup Instructions

To run the app locally on your machine, follow these steps:

### 1. Clone the repository

git clone https://github.com/MandiSolone/Weather_App_Project.git

### 2. Install dependencies
Ensure you have Node.js installed on your system.

In the project folder, run the following command to install dependencies:

npm install

### 3. Run the development server
Once dependencies are installed, run the following command to start the development server:

npm start

This will run Webpack's development server, and you can view the app in your browser by navigating to:

http://localhost:8080

### 4. Build for production
To create a production build, run:

npm run build

This will generate the dist folder containing the bundled files for production.

### 5. Deploy to GitHub Pages
If you'd like to deploy your app to GitHub Pages, use the following command:

npm run deploy
This will deploy the app to GitHub Pages and make it available at:

https://mandisolone.github.io/weather_app_project

### OpenWeatherMap API Integration
To fetch weather data, the app uses the OpenWeatherMap API. You'll need an API key to fetch data.

### API Request Format:
The weather data is fetched using a GET request to the OpenWeatherMap API:

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

The app fetches the weather for the city entered by the user:

fetch(`${WEATHER_URL}?q=${enteredCity}&appid=${WEATHER_KEY}&units=imperial`)
### Weather Icons:
The weather icon is fetched using the icon code returned from the API response. The icon URL format is:

https://openweathermap.org/img/wn/[ICON_CODE].png
For example, if the icon code is 10d, the URL for the image would be:

https://openweathermap.org/img/wn/10d.png
The app dynamically appends the correct icon URL based on the API response for the current weather condition.

### File Structure 
/weather_app_project
├── /dist                    # Build folder (after running build or deploy)
├── /src                     # Source code
│   ├── index.js             # Main JavaScript file
│   ├── savedLocations.js    # File for saving and managing city data
│   ├── styles.css           # Styles for the app
├── /public                  # Public assets (index.html)
├── package.json             # NPM dependencies and scripts
├── webpack.config.js        # Webpack configuration
└── README.md                # Project documentation

### Notes:
Saved Cities: Cities are saved in memory using the SavedCities class (in savedLocations.js). The cities are not persisted after a page refresh unless you implement local storage or a backend.
API Key: If you want to use your own API key from OpenWeatherMap, replace "YOUR_API_KEY" with your actual key in the JavaScript code.




