const socket = require('socket.io-client')('http://localhost:3000');
const { addAvatar } = require('./avatar');
const { getUsers } = require('./getUsers');
const { quantUsers } = require('./quantUsers');
const { getUserInfo } = require('./init');
const { addMessage } = require('./message.js');

socket.emit('sendUserData', getUserInfo()); //// Отправляем данные пользователя на сервер 

socket.on('add avatar', user => {
  console.log(user);
  addAvatar(user);
})

socket.on('add mess', function (data) {
  addMessage(data);
});

socket.on('quantity users', (connections) => {
  getUsers(connections);
  quantUsers(connections);
});

/// колличество участников 

socket.on('add ava message', dataImg => {
  const allMessages = document.querySelectorAll(`.message__avatar[data-role='${dataImg.nick}'`);

  allMessages.forEach(item => {
    item.style.backgroundImage = `url(${dataImg.img})`;
  })
});

const messageContainer = document.querySelector('.messages__list');

socket.on('user disconnect', data => {
  const messageItem = document.createElement('li');
  messageItem.classList.add('message__alert')
  messageItem.innerHTML = `<div>Пользователь ${data.name} вышел из чата <div>`;
  messageContainer.appendChild(messageItem);
});

socket.on('user connect', data => {
  const messageItem = document.createElement('li');
  messageItem.classList.add('message__alert')
  messageItem.innerHTML = `<div>Пользователь ${data.name} вошел в чат <div>`;
  messageContainer.appendChild(messageItem);
});

socket.on('all messages', messages => {
  console.log(messages)
  // const messageContainer = document.querySelector('.messages__list');
  // messageContainer.innerHTML = ''
  messages.forEach(item => addMessage(item));
});


module.exports = socket