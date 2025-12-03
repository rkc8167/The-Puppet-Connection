const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('draw', (data) => {
    console.log('Drawing data received:', data);
    socket.broadcast.emit('remote-draw', data);
  });

  socket.on('redraw', (data) => {
    console.log('Redraw:', data);
    socket.broadcast.emit('remote-redraw', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});