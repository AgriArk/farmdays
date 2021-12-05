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
});