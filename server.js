const express = require('express');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

app.use(express.static('the-puppet-connection'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('draw', (data) => {
        socket.broadcast.emit('remote-draw', data);
    });
});
