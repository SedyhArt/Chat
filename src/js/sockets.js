const socket = require('socket.io-client')('http://localhost:3000');
const { addAvatar } = require('./avatar');
const { getUsers } = require('./getUsers');
const { quantUsers } = require('./quantUsers');
const { getUserInfo } = require('./init');
const { addMessage } = require('./message.js');

socket.emit('sendUserData', getUserInfo()); //// Отправляем данные пользователя на сервер 

socket.on('add avatar', ava => {
  addAvatar(ava);
})

socket.on('add mess', function (data) {
  addMessage(data);
});

socket.on('quantity users', (connections) => {
  getUsers(connections);
});

/// колличество участников 

socket.on('quantity users', connections => {
  quantUsers(connections);
})

module.exports = socket