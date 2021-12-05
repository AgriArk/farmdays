<<<<<<< HEAD
const express = require('express');
const app = express();
const server = require('http').Server(app);
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    console.log('visited')
  res.sendFile(__dirname + '/index.html');
});

server.listen(8000, function () {
  console.log(`Listening on ${server.address().port}`);
=======
const express = require('express');
const app = express();
const server = require('http').Server(app);
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    console.log('visited')
  res.sendFile(__dirname + '/index.html');
});

server.listen(8000, function () {
  console.log(`Listening on ${server.address().port}`);
>>>>>>> 7d54d4d9d47da0133a42262c1598622676bddf15
});