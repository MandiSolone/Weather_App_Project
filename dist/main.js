(()=>{const e=document.querySelector("#cityInput"),t=document.querySelector("#searchBtn"),n=document.getElementById("cityLocation"),o=document.getElementById("tempF"),c=document.getElementById("tempC"),l=document.getElementById("description"),a=document.getElementById("degreeF");document.getElementById("degreeC"),console.log("A degreesF",a),console.log("A cityLocationEle",n.textContent),console.log("B tempEleF",o.textContent),console.log("C descriptionEle",l.textContent);const r="https://api.openweathermap.org/data/2.5/weather",d="3f3a3408c529719814d0064e8c5d0eb0";t.addEventListener("click",(()=>{const t=e.value;t&&(function(t){console.log("F fecthWeather(city):",t),fetch(`${r}?q=${t}&appid=${d}&units=imperial`).then((e=>{if(!e.ok)throw new Error(`${t} name: typed wrong or blank input.`);return e.json()})).then((t=>{console.log("G weatherData",t),function(t){console.log("H weatherData.name",t.name),console.log("I weatherData cityLocationEle",n),n.textContent=t.name,l.textContent=t.weather[0].description,o.textContent=`${Math.round(t.main.temp)}°F`,c.textContent=`${Math.round((parseFloat(t.main.temp)-32)*(5/9))} °C`,e.placeholder="Enter a City"}(t)})).catch((e=>{console.error("Error fecthing weather data:",e),l.textContent=`${t} name: typed wrong or blank input.`,n.textContent="",o.textContent="",c.textContent=""}))}(t),console.log("D city:",t),console.log("E URL String:",`${r}?q=${t}&appid=${d}`))})),document.getElementById("switchDegBtn").addEventListener("click",(()=>{const e=o,t=c;"none"===e.style.display?(e.style.display="block",t.style.display="none"):(e.style.display="none",t.style.display="block")}))})();