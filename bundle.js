(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,o(i.key),i)}}function n(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function o(e){var n=function(e){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(n)?n:n+""}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n((function t(e,n,o,r,c,a,u){i(this,t),this.id=e,this.city=n,this.temp=o,this.tempC=r,this.icon=c,this.description=a,this.date=u})),c=function(){return n((function t(){i(this,t),this.list=[],this.nextId=0}),[{key:"add",value:function(t,e,n,o,i,c){var a=new r(this.nextId++,t,e,n,o,i,c);this.list.push(a)}},{key:"remove",value:function(t){this.list=this.list.filter((function(e){return e.id!==t}))}}])}(),a=document.querySelector("#cityInput"),u=document.querySelector("#searchBtn"),l=document.querySelector("#image1"),d=document.getElementById("cityLocation"),s=document.getElementById("tempF"),m=document.getElementById("tempC"),y=document.getElementById("description"),p=document.querySelector("#date"),f=document.getElementById("#weather-info"),v=document.querySelector("#ul"),h=document.querySelector("#saved-city"),b=document.querySelector("#saved-temp"),C=document.querySelector("#saved-tempC"),g=document.querySelector("#saved-description"),x=document.querySelector("time-stamped"),w=document.querySelector("#saveCityBtn"),S=document.querySelector("#removeBtn");document.querySelector("#refreshBtn"),u.addEventListener("click",(function(){var t=a.value;t&&(function(t){fetch("".concat("https://api.openweathermap.org/data/2.5/weather","?q=").concat(t,"&appid=").concat("3f3a3408c529719814d0064e8c5d0eb0","&units=imperial")).then((function(e){if(!e.ok)throw new Error("".concat(t," name: typed wrong or blank input."));return e.json()})).then((function(t){!function(t){var e=t.weather[0].icon;l.src="https://openweathermap.org/img/wn/".concat(e,".png"),l.alt=t.weather[0].description,d.textContent=t.name,y.textContent=t.weather[0].description,p.textContent=t.dt,s.textContent="".concat(Math.round(t.main.temp),"°F"),m.textContent="".concat(Math.round((parseFloat(t.main.temp)-32)*(5/9))," °C")}(t)})).catch((function(e){console.error("Error fecthing weather data:",e),y.textContent="".concat(t," name is an incorrect city. Please try again.")}))}(t),a.value="",f.style.visibility="visible",w.style.visibility="visible")}));var E=new c;function q(){v.innerHTML=" ",E.list.forEach((function(t){var e=document.createElement("li");e.textContent="".concat(t.city),v.appendChild(e),e.addEventListener("click",(function(){return function(t){var e=document.querySelector("#image2");e.alt=t.description,e.src=t.icon,x.textContent=t.date,h.textContent=t.city,b.textContent=t.temp,C.textContent=t.tempC,g.textContent=t.description,S.disabled=!1,S.setAttribute("data-locationId",t.id)}(t)}))}))}w.addEventListener("click",(function(t){t.preventDefault();var e=d.textContent,n=s.textContent,o=m.textContent,i=l.src;console.log("addCity icon",i);var r=y.textContent,c=p.textContent;E.add(e,n,o,i,r,c),q()})),S.addEventListener("click",(function(){var t=Number(S.getAttribute("data-locationId"));E.remove(t),q(),h.textContent="",b.textContent="",g.textContent="",S.disabled=!0})),document.getElementById("switchDegBtn").addEventListener("click",(function(){var t=s,e=m;"none"===t.style.display?(t.style.display="block",e.style.display="none"):(t.style.display="none",e.style.display="block")}))})();