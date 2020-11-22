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

io.on('connection', (socket) => {
  // console.log("Новый пользователь", socket.id);

  socket.on('disconnect', () => {
    for (let key in connections) {
      if (key === socket.id) {
        delete connections[key];
      }
    }
  })

  socket.on('sendUserData', (data) => {
    // console.log('sendUserData', data); /// принимает данные в формате {name: , nick:}

    if (!users[data.nick]) {
      users[data.nick] = data; /// добавляем в объект users {ключ-ник: значаение данные в виде объекта}
      // console.log(users);
    }

    connections[socket.id] = data;
    // console.log(connections);
  });

  socket.on('send mess', data => {
    data.name = connections[socket.id].nick;
    io.emit('add mess', data)
    // console.log(data.message, connections[socket.id].nick);
  });

  //// Прием данных о картинке

  socket.on('send image', dataImg => { //// img это объект вида {nick: ник пользователя, avatar: картинка в формате bs64}
    users[dataImg.nick].avatar = dataImg.img;
    console.log(users);
    // console.log(img);
  });



  io.emit('quantity users', connections);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

