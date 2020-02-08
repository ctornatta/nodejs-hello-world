var express = require('express');
var app = express();
var redis = require('redis');



app.get('/', function (req, res) {

  var client = redis.createClient("redis://127.0.0.1:6379");

  client.on('connect', function() {
    res.send('Redis client connected');
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
