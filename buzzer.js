const pigpio = require('pigpio');
const Gpio = pigpio.Gpio;

const outPin = 17;

const output = new Gpio(outPin, {mode: Gpio.OUTPUT});

export function playTone(buzz){
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

playTone(500);