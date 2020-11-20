const socket = require('socket.io-client')('http://localhost:3000');
const { getUserInfo } = require('./js/init');
const init = require('./js/init');
const { sendMessage } = require('./js/message.js');

/// получение данных пользователя

const enterButton = document.querySelector('#enterButton');
const wrapper =  document.querySelector('.wrapper');
const chat =  document.querySelector('.chat');


enterButton.addEventListener('click', (e) => {
  wrapper.classList.add('hidden');
  chat.classList.remove('hidden');
  // init.getUserInfo();
  socket.emit('sendUserData', getUserInfo());
  // socket.on('sendUsers', (data) => {
  //   console.log(data);
  // })
})

/// сообщение

const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', sendMessage());