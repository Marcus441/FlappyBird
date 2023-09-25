const express = require('express'); // import express
const app = express(); // initialize express
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });

wss.on('connection' , function connection(ws){
    playTone(500);
    console.log("a client has connected");
    ws.send("welcome to flappy bird");

    ws.on('message', function incoming(message){
      if (message == 'gameover'){
        ws.send('gameover');
        playTone(1000);
      }
      if (message == 'pass'){
        ws.send('pass');
        playTone(2000);
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



const pigpio = require('pigpio');
const Gpio = pigpio.Gpio;

const outPin = 17;

const output = new Gpio(outPin, {mode: Gpio.OUTPUT});

function playTone(buzz){
  output.digitalWrite(0);
  pigpio.waveClear();
  
  let waveform = [];
  
  for (let x = 0; x < 20; x++) { //loop 20 times
    if (x % 2 === 1) { //if x is odd (50% duty cycle)
      waveform.push({ gpioOn: outPin, gpioOff: 0, usDelay: buzz }); //pulse on
    } else {
      waveform.push({ gpioOn: 0, gpioOff: outPin, usDelay: buzz }); //pulse off
    }
  }
  
  pigpio.waveAddGeneric(waveform);
  
  let waveId = pigpio.waveCreate();
  
  if (waveId >= 0) {
    pigpio.waveTxSend(waveId, pigpio.WAVE_MODE_ONE_SHOT);
  }
  
  while (pigpio.waveTxBusy()) {}
  
  pigpio.waveDelete(waveId);
}

