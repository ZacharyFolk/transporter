const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const key = require('./private/keys');
const apiKey = key.getWeatherKey();

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.render('index')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

app.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  console.log(url);
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', {
        weather: null,
        error: 'Error, please try again'
      });
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Else Error, please try again'
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {
          weather: weatherText,
          error: null
        });
        console.log(weatherText);
      }
    }
  });

})
