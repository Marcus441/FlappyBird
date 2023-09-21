const express = require('express'); // import express

const app = express(); // initialize express

app.use(express.static('public')); // use static files in public folder

// start the server
app.listen(3000, () => { 
    console.log("Server is running on http://localhost:3000")
});