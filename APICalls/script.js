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
  constructor(weatherStatusId, weatherCodeId, SunRiseId, SunSetId, MoonRiseId, MoonSetId) {
    this.weatherStatusId = weatherStatusId;
    this.weatherCodeId = weatherCodeId;
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
        this.weatherStatusId.textContent = "In " + cityName + ' is het ' + locationName + " en het is " + temperature + "°C";
        this.SunRiseId.textContent = "De zonsopgangtijd: " + SunRiseTime;
        this.SunSetId.textContent = "De zonsondergangtijd: " + SunSetTime;
        this.MoonRiseId.textContent = "De mansopgangtijd: " + MoonRiseTime;
        this.MoonSetId.textContent = "De mansondergangtijd: " + MoonSetTime;
      })
      .catch(error => console.error(error));
  }
}

let weatherStatusId = document.getElementById('weather_status');
let weatherCodeId = document.getElementById('weather_code');
let SunRiseId = document.getElementById('js--sunrise');
let SunSetId = document.getElementById('js--sunset');
let MoonRiseId = document.getElementById('js--moonrise');
let MoonSetId = document.getElementById('js--moonset');

let weatherFetcher = new WeatherFetcher(weatherStatusId, weatherCodeId, SunRiseId, SunSetId, MoonRiseId, MoonSetId);
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

function readTemp() {
  fetch('https://35023.hosts1.ma-cloud.nl/duurzaamhuis/jsonInput.json')
  .then(response => response.json())
  .then(data => {
    if (data.Led1  === 0){
      document.getElementById("LED1status").innerText = "Led 1 status: off";
    }
    else{
      document.getElementById("LED1status").innerText = "Led 1 status: on";
    }
    if (data.Led2  === 0){
      document.getElementById("LED2status").innerText = "Led 2 status: off";
    }
    else{
      document.getElementById("LED2status").innerText = "Led 2 status: on";
    }
    if (data.Led3  === 0){
      document.getElementById("LED3status").innerText = "Led 3 status: off";
    }
    else{
      document.getElementById("LED3status").innerText = "Led 3 status: on";
    }
    document.getElementById("binnen-temp").innerText = "Temperatuur: " + Math.round(data.Temperature) + " °C";
    document.getElementById("vochtigheid").innerText = "Vochtigheid: " + Math.round(data.Humidity) + " %";
    document.getElementById("heatIndex").innerText = "Heat Index: " + Math.round(data.HeatIndex) + " %";
    document.getElementById("Licht").innerText = "Licht hoeveelheid: " + data.Licht + " %";
  });
}

setInterval(readTemp, 1000)

let gas = [6.334142, 6.392036, 6.380746, 6.133371, 5.818582, 5.873735, 5.6311636, 5.498144, 5.414361, 5.351441, 5.420009, 5.141927, 5.34589, 5.302337, 5.057221, 4.857039, 4.869557, 4.99932, 4.96336, 5.069436, 5.067842, 4.960862, 4.842583, 4.53697, 4.37509, 4.559344, 4.499776, 4.554968, 4.192899, 3.69226, 3.47473];
let stroom = [8.708265, 9.024655, 9.018188, 9.7324, 10.16105, 9.085961, 8.573009, 8.853497, 8.859065, 8.870694, 9.608599, 9.751627, 8.779924, 8.480499, 8.699217, 8.663344, 8.598471, 9.250565, 9.211821, 8.555725, 8.33257, 8.130034, 8.214511, 8.031173, 8.647481, 8.287736, 7.73401, 7.08122, 7.418751, 7.404657, 7.592983];
let days = ['01/03/2023', '02/03/2023', '03/03/2023', '04/03/2023', '05/03/2023', '06/03/2023', '07/03/2023', '08/03/2023', '09/03/2023', '10/03/2023', '11/03/2023', '12/03/2023', '13/03/2023', '14/03/2023', '15/03/2023', '16/03/2023', '17/03/2023', '18/03/2023', '19/03/2023', '20/03/2023', '21/03/2023', '22/03/2023', '23/03/2023', '24/03/2023', '25/03/2023', '26/03/2023', '27/03/2023', '28/03/2023', '29/03/2023', '30/03/2023', '31/03/2023'];

let ctx = document.getElementById("temperatureChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: days,
    datasets: [
      {
        label: "Gas in m3",
        data: gas,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      },
      {
        label: "Stroom in kWh",
        data: stroom,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});