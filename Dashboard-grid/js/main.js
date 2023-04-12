const WEATHER_SYMBOL = {
    "Unknown":             "✨",
    "Cloudy":              "☁️",
    "Fog":                 "🌫️",
    "HeavyRain":           "⛈️",
    "HeavyShowers":        "⛈️",
    "HeavySnow":           "❄️",
    "HeavySnowShowers":    "🌨️",
    "LightRain":           "🌦️",
    "LightShowers":        "🌦️",
    "LightSleet":          "🌧",
    "LightSleetShowers":   "🌧",
    "LightSnow":           "🌨",
    "LightSnowShowers":    "🌨",
    "PartlyCloudy":        "⛅️",
    "Sunny":               "☀️",
    "ThunderyHeavyRain":   "🌩️",
    "ThunderyShowers":     "⛈️",
    "ThunderySnowShowers": "❄️⚡",
    "VeryCloudy": "☁️"
  };
  
  const WWO_CODE = {
    "113": "Sunny",
    "116": "PartlyCloudy",
    "119": "Cloudy",
    "122": "VeryCloudy",
    "143": "Fog",
    "176": "LightShowers",
    "179": "LightSleetShowers",
    "182": "LightSleet",
    "185": "LightSleet",
    "200": "ThunderyShowers",
    "227": "LightSnow",
    "230": "HeavySnow",
    "248": "Fog",
    "260": "Fog",
    "263": "LightShowers",
    "266": "LightRain",
    "281": "LightSleet",
    "284": "LightSleet",
    "293": "LightRain",
    "296": "LightRain",
    "299": "HeavyShowers",
    "302": "HeavyRain",
    "305": "HeavyShowers",
    "308": "HeavyRain",
    "311": "LightSleet",
    "314": "LightSleet",
    "317": "LightSleet",
    "320": "LightSnow",
    "323": "LightSnowShowers",
    "326": "LightSnowShowers",
    "329": "HeavySnow",
    "332": "HeavySnow",
    "335": "HeavySnowShowers",
    "338": "HeavySnow",
    "350": "LightSleet",
    "353": "LightShowers",
    "356": "HeavyShowers",
    "359": "HeavyRain",
    "362": "LightSleetShowers",
    "365": "LightSleetShowers",
    "368": "LightSnowShowers",
    "371": "HeavySnowShowers",
    "374": "LightSleetShowers",
    "377": "LightSleet",
    "386": "ThunderyShowers",
    "389": "ThunderyHeavyRain",
    "392": "ThunderySnowShowers",
    "395": "HeavySnowShowers",
  }
  
  class WeatherFetcher {
    constructor(weatherStatusId, weatherCodeId, SunRiseId, SunSetId, MoonRiseId, MoonSetId) {
      this.weatherStatusId = weatherStatusId;
      this.weatherCodeId = weatherCodeId;
      this.weatherTemp = weatherTemp;
      this.SunRiseId = SunRiseId;
      this.SunSetId = SunSetId;
      this.MoonRiseId = MoonRiseId;
      this.MoonSetId = MoonSetId;
    }
  
    fetchWeather() {
      fetch('https://wttr.in/?&format=j1')
        .then(response => response.json())
        .then(data => {
          let locationName = data['current_condition'][0]['lang_nl'][0]['value'];
          let temperature = data['current_condition'][0]['temp_C']
          let cityName = data['nearest_area'][0]['areaName'][0]['value']
          let weatherEmoji = "";
          let weatherCode = data['current_condition'][0]['weatherCode'];
          let SunRiseTime = data['weather'][0]['astronomy'][0]['sunrise'];
          let SunSetTime = data['weather'][0]['astronomy'][0]['sunset'];
          let MoonRiseTime = data['weather'][0]['astronomy'][0]['moonrise'];
          let MoonSetTime = data['weather'][0]['astronomy'][0]['moonset'];
          let wwoCode = WWO_CODE[weatherCode];
          let currentEmoji = WEATHER_SYMBOL[wwoCode];
          console.log(currentEmoji)
          weatherEmoji = currentEmoji;
          this.weatherCodeId.textContent = weatherEmoji;
          this.weatherStatusId.textContent = cityName;
          this.weatherTemp.textContent = temperature + ' °C';
          console.log (weatherTemp)

          this.SunRiseId.textContent = SunRiseTime
          this.SunSetId.textContent = SunSetTime
          this.MoonRiseId.textContent = MoonRiseTime
          this.MoonSetId.textContent = MoonSetTime
        })
        .catch(error => console.error(error));
    }
  }
  
  let weatherTemp = document.getElementById('weather_temp')
  let weatherStatusId = document.getElementById('weather_status');
  let weatherCodeId = document.getElementById('weather_code');
  let SunRiseId = document.getElementById('js--sunrise');
  let SunSetId = document.getElementById('js--sunset');
  let MoonRiseId = document.getElementById("js--moonrise");
  let MoonSetId = document.getElementById("js--moonset");
  
  let weatherFetcher = new WeatherFetcher(weatherStatusId, weatherCodeId, SunRiseId, SunSetId, MoonRiseId, MoonSetId);
  weatherFetcher.fetchWeather();
  
  const showtime = document.getElementById("js--time");
  const showdateLetter = document.getElementById("js--date-letter");
  const showdateCijfer = document.getElementById("js--date-number");
  
  function displayDateTime() {
      let now = new Date();
      let date = now.toDateString();
      let time = now.toLocaleTimeString();
      showtime.innerText = time;
      showdateLetter.innerText = date.slice(0, 7);
      showdateCijfer.innerText = date.slice(8,15)

  }

  setInterval(displayDateTime, 1000);

  const startBtn = document.getElementById("js--start");
const stopBtn = document.getElementById("js--stop");
const resetBtn = document.querySelector(".button--reset");
let seconde = 0;
let minutes = 0;
let running = false;
const secondeTimer = document.getElementById("js--secondeTimer");
const minuteTimer = document.getElementById("js--minuteTimer");
let timer;
startBtn.onclick = function(){
    if(running === true){
        return;
    }
    running = true;
    timer = setInterval(function(){
        seconde = seconde + 1;
        if(seconde === 60){
            minutes = minutes + 1
            minuteTimer.innerText = minutes;
            seconde = 0;
        }
        secondeTimer.innerText = seconde;
    }, 1000);
}

stopBtn.onclick = function(){
    clearInterval(timer);
    running = false;
}

resetBtn.onclick = function() {
    clearInterval(timer);
    running = false;
    seconde = 0;
    minutes = 0;
    secondeTimer.innerText = "0";
    minuteTimer.innerText = "0";
  }


  //slider

  const rangeValue = document.getElementById("js--rangeValue");
  const slider = document.getElementById("js--slider");
  const body = document.getElementById("js--body")
  slider.value = 2;
  rangeValue.innerText =slider.value + "x";

  slider.oninput = function(){
    rangeValue.innerText = slider.value + "x";
    body.style.fontSize = slider.value + "rem";
  }

const foto = document.getElementById("js--img")
const paragraph = document.getElementById("js--text")
  //data ophalen
  let data = fetch("../data.json").then (
    function(binnengekomendata){
       return binnengekomendata.json(); 
    }).then(
        function(echtedata){
            paragraph.innerHTML = echtedata.text;
            foto.setAttribute("src", echtedata.img);
            
        }
  );