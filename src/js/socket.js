const app = require('express')();
const http = require('http').createServer(app);
const io = require ( 'socket.io' ) (http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + './../main.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});