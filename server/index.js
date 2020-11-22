const app = require('express')();
const http = require('http').createServer(app);
const io = require ( 'socket.io' ) (http, {
  cors: {
    origin: "http://localhost:8080",
  }
});

app.post('/upload', (req, res) => {
  res.send('WebSocket');
});

var connections = {};
const users = {};

io.on('connection', (socket) => {
  console.log("Новый пользователь", socket.id);
  
  socket.on('disconnect', () => {
    for(let key in connections) {
      if (key === socket.id) {
        delete connections[key];
      }
    }
  })

  socket.on('sendUserData', (data) => {
    console.log('sendUserData');

    if (!users[data.nick]) {
      users[data.nick] = data;
    }
    
    connections[socket.id] = data;
  });

  socket.on('send mess', data => {
    data.name = connections[socket.id].nick;
    socket.emit('add mess', data)
    console.log(data.message, connections[socket.id].nick);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

