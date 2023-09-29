const pigpio = require('pigpio');                           //include pigpio to interact with the GPIO
const Gpio = pigpio.Gpio;                                   //include GPIO module              

const outPin = 17;                                          //GPIO17 is connected to the buzzer                  

const output = new Gpio(outPin, { mode: Gpio.OUTPUT });     //use GPIO pin 17 as output                                                             

function playTone(buzz) {                                   //function to start the buzzer with a frequency and duration
  output.digitalWrite(0);                                   //set output to low
  pigpio.waveClear();                                       //clear all waveforms 

  let waveform = [];                                        //set waveform as empty array

  for (let x = 0; x < 20; x++) {                            //loop 20 times
    if (x % 2 === 1) {                                      //if x is odd (50% duty cycle)
      waveform.push({ gpioOn: outPin, gpioOff: 0, usDelay: buzz }); //pulse on
    } else {
      waveform.push({ gpioOn: 0, gpioOff: outPin, usDelay: buzz }); //pulse off
    }
  }

  pigpio.waveAddGeneric(waveform);                           //add waveforms to the waveform array
  let waveId = pigpio.waveCreate();                          //create complex waveforms
  if (waveId >= 0) {                                         //if waveId is valid
    pigpio.waveTxSend(waveId, pigpio.WAVE_MODE_ONE_SHOT);    //transmit waveform
  }
  while (pigpio.waveTxBusy()) { }                            //wait for all waveforms to be sent before continuing
  pigpio.waveDelete(waveId);
}

module.exports.playTone = playTone;                          //export the function