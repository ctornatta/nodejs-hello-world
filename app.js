var express = require('express');
var app = express();
var redis = require('redis');
const axios = require('axios');

app.get('/', function (req, res) {

  //process.env.REDIS_URL || 'redis://127.0.0.1:6379'
  //var client = redis.createClient("redis://127.0.0.1:6379");

  // axios.get('http://icanhazip.com')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   console.log('done')
  // });

  var client = redis.createClient(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

  client.on('connect', function() {
  // Make a request for a user with a given ID
    res.send('Redis client connected\n' + process.env.MY_SECRET);
  });
  
  client.on('error', function (err) {
    res.send('Something went wrong ' + err);
  });

  client.set('my test key', 'my test value', redis.print);
  client.get('my test key', function (error, result) {
      if (error) {
          console.log(error);
          throw error;
      }
      console.log('GET result ->' + result);
  });

  //res.send('Hello World');
  console.log(req.headers);

})

module.exports = app;
