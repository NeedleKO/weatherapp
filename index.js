const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector("#userInput")
const form = document.querySelector(".input-btn-container");
const celsiusBtn = document.querySelector(".celsiusBtn");
const fahrenheitBtn = document.querySelector(".fahrenheitBtn");
const loader = document.querySelector(".loader-container");

//to filter only the data i need
function filterData(data) {
  const weatherObj = {
    name: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity + "%",
    wind: data.current.wind_kph + "km/h",
    icon: data.current.condition.icon,
    condition: data.current.condition.text,
    localTime: data.location.localtime,

    temperatureF: data.current.temp_f,
    feelsLikeF: data.current.feelslike_f,
    windMPH: data.current.wind_mph,


  };
  return weatherObj;
}

async function getData(location) {
  const url = "https://api.weatherapi.com/v1/current.json?";
  const apiKey = "3c8a3857e5254bcb88c92710230411";
  const response = await fetch(`${url} &key= ${apiKey} &q= ${location}`);
  loader.style.display = "flex"
  input.value = "";
  
  try {
    if (response.status === 400) {
      if (input.value === "") {
        document.querySelector(".error").innerHTML = "Empty input field"
      }
      setTimeout(() => {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".fetch-data").style.display = "none";
        document.querySelector(".imgTest").src = "";
        document.querySelector(".weatherApp").style.padding = "0em";
        loader.style.display = "none"
      }, "1000");
     
      
    } else {
      const response = await fetch(`${url} &key= ${apiKey} &q= ${location}`);
      const weatherData = await response.json();
      const data1 = filterData(weatherData);
      setTimeout(() => {
      console.log(weatherData);
      document.querySelector(".name").innerHTML = data1.name + ",";
      document.querySelector(".city").innerHTML = data1.country;
      document.querySelector(".temp").innerHTML = data1.temperature + "°";
      document.querySelector(".feelsLike").innerHTML = data1.feelsLike + " °C";
      document.querySelector(".humidity").innerHTML = data1.humidity;
      document.querySelector(".wind").innerHTML = data1.wind;
      document.querySelector(".fetch-data").style.display = "block";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".imgTest").src = data1.icon;
      document.querySelector(".condition").innerHTML = data1.condition;
      document.querySelector(".icon").style.display = "block";
      document.querySelector(".time-date").innerHTML = data1.localTime;
      document.querySelector(".weatherApp").style.padding = "1em 3em 3em 3em";
      loader.style.display = "none"
    }, "1000");
      

      // fahrenheitBtn.addEventListener("click", () => {
      //   if(fahrenheitBtn.className === "fahrenheitBtn") {
      //     document.querySelector(".temp").innerHTML = data1.temperatureF;
      //     document.querySelector(".feelsLike").innerHTML = data1.feelsLikeF;
      //     document.querySelector(".wind").innerHTML = data1.windMPH + "mp/h";
      //   }
      // })
    }
  } catch (err) {
    console.log(err);
  }
}

searchBtn.addEventListener("click", () => {
  document.querySelector(".weatherApp").style.padding = "1em 3em 3em 3em";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".fetch-data").style.display = "none";
  let input = document.getElementById("userInput").value;
  getData(input);
});


function keyPress(event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
}


input.addEventListener("keypress", keyPress);



























