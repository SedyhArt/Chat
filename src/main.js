const socket = require('socket.io-client')('http://localhost:3000');
const { getUserInfo } = require('./js/init');
const init = require('./js/init');
const { sendMessage, addMessage } = require('./js/message.js');
const img = require('./js/img');

/// получение данных пользователя

const enterButton = document.querySelector('#enterButton');
const wrapper = document.querySelector('.wrapper');
const chat = document.querySelector('.chat');


enterButton.addEventListener('click', (e) => {
  wrapper.classList.add('hidden');
  chat.classList.remove('hidden');

  socket.emit('sendUserData', getUserInfo()); //// Отправляем данные пользователя на сервер 
});

socket.on('add mess', addMessage)

/// сообщение

const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', sendMessage.bind(socket));

/// drop img

const avatar = document.querySelector('.user__icon-img');
console.log(avatar)
avatar.addEventListener('dragover', function (e) {
  console.log(e.dataTransfer.item);
  if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
    e.preventDefault();
  }
});

avatar.addEventListener('drop', function (e) {
  e.preventDefault();

  console.log("drop")

  const file = e.dataTransfer.items[0].getAsFile();
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener('load', function () {
    avatar.style.backgroundImage = `url(${reader.result})`;
  })
})

