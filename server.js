const express = require('express'); // import express
const path = require('path');

const app = express(); // initialize express

app.use(express.static(path.join(__dirname, 'public'))); // use static files in public folder

// start the server
app.listen(3000, () => { 
    console.log("Server is running on port 3000")
});