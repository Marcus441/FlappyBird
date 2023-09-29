const buzzer = require('./buzzer.js');
const express = require('express'); // import express
const app = express(); // initialize express
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
  buzzer.playTone(500);
  console.log("a client has connected");
  ws.send("welcome to flappy bird");

  ws.on('message', function incoming(message) {
    if (message == 'gameover') {
      ws.send('gameover');
      buzzer.playTone(2000);
    }
    if (message == 'pass') {
      ws.send('pass');
      buzzer.playTone(1000);
    }

  })
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // use static files in public folder

app.get('/', (req, res) => res.send("Hello World"))

// start the server
server.listen(3000, () => {
  console.log("Server is running on port 3000")
});
