const { Server } = require('http');
const { Server: SocketServer } = require('socket.io');

const http = new Server((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat server running on Netlify!\n');
});

const io = new SocketServer(http);

io.on('connection', (socket) => {
    console.log('connected !');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});

exports.handler = async (event, context) => {
    // Proxy to the underlying WebSocket server
    return await new Promise((resolve) => {
        http.once('close', resolve);
        http.emit('upgrade', event, event.socket, Buffer.from([]), resolve);
    });
};
