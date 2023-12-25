const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Removed Socket.IO initialization from here

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});

app.use(express.static(__dirname + `/public/`));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Netlify doesn't support WebSocket connections directly in the main server file
// Moved WebSocket logic to a serverless function (socket.js)
