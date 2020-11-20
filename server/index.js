const app = require('express')();
const http = require('http').createServer(app);
const io = require ( 'socket.io' ) (http, {
  cors: {
    origin: "http://localhost:8080",
  }
});

app.get('/', (req, res) => {
  res.send('WebSocket');
});



var clients = {};
let currentId = 1;
let userInfo = [];

io.on('connection', (socket) => {
  const id = currentId++;
  clients[id] = socket;
  
  console.log('Новый пользователь ' + id);
  socket.on('disconnect', (data) => {
    delete clients[id];
    console.log('Пользователь ' + id + ' отключился');
  })

  socket.on('sendUserData', (data) => {
    userInfo[id] = data;
  });

  socket.on('send mess', data => {
    io.socket.emit('add mess', data)
    console.log(data);
  })
  
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});

