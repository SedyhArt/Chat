const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
  }
});

app.post('/upload', (req, res) => {
  res.send('WebSocket');
});

var connections = {};
const users = {};
const messages = [];

io.on('connection', (socket) => {
  
  socket.on('disconnect', () => {
    for (let key in connections) {
      if (key === socket.id) {
        io.emit('user disconnect', connections[key])
        delete connections[key];
      }

      io.emit('quantity users', connections);
    }
  })

  socket.on('sendUserData', (data) => {

    if (!users[data.nick]) {
      users[data.nick] = data; 
    }

    connections[socket.id] = data;

    io.emit('user connect', connections[socket.id]);
    
    
    if(users[data.nick].avatar) {
      socket.emit('add avatar', users[data.nick])
    };

    io.emit('quantity users', connections);

  });

  socket.on('send mess', data => {
    data.img = users[data.nick].avatar;
    // messages.push(data);

    io.emit('add mess', data);
  
  });

  //// Прием данных о картинке

  socket.on('send image', dataImg => { //// img это объект вида {nick: ник пользователя, avatar: картинка в формате bs64}
    users[dataImg.nick].avatar = dataImg.img;
    connections[socket.id].avatar = dataImg.img 
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

