const buzzer = require('./buzzer.js');                // import buzzer.js
const express = require('express');                   // import express
const app = express();                                // initialize express
const server = require('http').createServer(app);     // create http server
const WebSocket = require('ws');                      // import websocket

const wss = new WebSocket.Server({ server: server }); // create websocket server

wss.on('connection', function connection(ws) {        // when a client connects
  buzzer.playTone(500);
  console.log("a client has connected");
  ws.send("welcome to flappy bird");                  // send a message to the client

  ws.on('message', function incoming(message) {       // when a client sends a message
    if (message == 'gameover') {                      // if the message is gameover
      ws.send('gameover');                            // send gameover to the client
      buzzer.playTone(2000);                          // play a tone
    }
    if (message == 'pass') {                          // if the message is pass
      ws.send('pass');                                // send pass to the client
      buzzer.playTone(1000);                          // play a tone
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
