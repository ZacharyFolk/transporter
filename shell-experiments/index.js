// https://codeburst.io/build-a-simple-weather-app-with-node-js-in-just-16-lines-of-code-32261690901d

const request = require('request');
const key = require('./../private/keys');
const argv = require('yargs').argv;
let apiKey = key.getWeatherKey();
let city = argv.c || 'seattle';

// access with node index.js -c Portland

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

function convertUnix(stamp) {
  var date = new Date(stamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

request(url, function(err, response, body) {
  if (err) {
    console.log('error:', error);
  } else {
    // console.log('body:', body);
    let weather = JSON.parse(body);
    let sunrise = `${weather.sys.sunrise}`
    let sunset = `${weather.sys.sunset}`
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`
    console.log(message);
    console.log(JSON.parse(body));
    console.log( 'Sunrise : ' + convertUnix(sunrise) + '\nSunset : ' + convertUnix(sunset))
// get timezone for location to compare to current time
console.log(convertUnix(weather.dt));
console.log(convertUnix(weather.timezone));

 // console.log( new Date((weather.dt + weather.timezone) * 1000).getHours());
// What a list!! https://stackoverflow.com/questions/16086962/how-to-get-a-time-zone-from-a-location-using-latitude-and-longitude-coordinates/16086964


  }
});
