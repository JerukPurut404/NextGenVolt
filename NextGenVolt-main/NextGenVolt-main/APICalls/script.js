const WEATHER_SYMBOL = {
  "Unknown":             "✨",
  "Cloudy":              "☁️",
  "Fog":                 "🌫️",
  "HeavyRain":           "🌧",
  "HeavyShowers":        "🌧",
  "HeavySnow":           "❄️",
  "HeavySnowShowers":    "🌨️",
  "LightRain":           "🌦",
  "LightShowers":        "🌦",
  "LightSleet":          "🌧",
  "LightSleetShowers":   "🌧",
  "LightSnow":           "🌨",
  "LightSnowShowers":    "🌨",
  "PartlyCloudy":        "⛅️",
  "Sunny":               "☀️",
  "ThunderyHeavyRain":   "🌩",
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
  constructor(weatherStatusId, weatherCodeId, SunRiseId, SunSetId,) {
    this.weatherStatusId = weatherStatusId;
    this.weatherCodeId = weatherCodeId;
    this.SunRiseId = SunRiseId;
    this.SunSetId = SunSetId;
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
        this.weatherStatusId.textContent = "In " + cityName + ' is het ' + locationName + " en het is " + temperature + "°C";
        this.SunRiseId.textContent = "De zonsopgangtijd: " + SunRiseTime
        this.SunSetId.textContent = "De zonsondergangtijd: " + SunSetTime
      })
      .catch(error => console.error(error));
  }
}

let weatherStatusId = document.getElementById('weather_status');
let weatherCodeId = document.getElementById('weather_code');
let SunRiseId = document.getElementById('js--sunrise');
let SunSetId = document.getElementById('js--sunset');

let weatherFetcher = new WeatherFetcher(weatherStatusId, weatherCodeId, SunRiseId, );
weatherFetcher.fetchWeather();

const showtime = document.getElementById("js--time")
const showdate = document.getElementById("js--date")

function displayDateTime() {
    let now = new Date();
    let date = now.toDateString();
    let time = now.toLocaleTimeString();
    showtime.innerText = time;
    showdate.innerText = date;
}

setInterval(displayDateTime, 1000);
