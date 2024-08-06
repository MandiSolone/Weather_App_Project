//   HMTL to go with below -   <!-- <span class="(°A) (°B)">(°C ) / (°F)</span> -->
//   const span = document.querySelector('span');
//   const classes = span.classList;
//   span.addEventListener("click", () =>{
//     const result = classes.toggle("(°M)");
//     span.textContent = `${classes}`;
//   })

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
