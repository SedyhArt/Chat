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

socket.on('add mess', function (data) {
  addMessage(data);
  console.log(data)
});


/// сообщение

const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', sendMessage.bind(socket));

//// Avatar

const avatar = document.querySelector('.user__icon-img');

avatar.addEventListener('dragover', (e) => {
  e.preventDefault();

  if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
    e.preventDefault();
  }
});

avatar.addEventListener('drop', (e) => {
  e.preventDefault();

  const file = e.dataTransfer.items[0].getAsFile();
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener('load', () => {
    avatar.style.backgroundImage = `url(${reader.result})`;
    
    let dataImg = {
      nick: getUserInfo().nick,
      img: reader.result
    };
    socket.emit('send image', dataImg); 
  })
})


/// колличество участников 

const quantUsers = document.getElementById('quant-users');

socket.on('quantity users', connections => {
  let quant = 1;

  for (let i in connections) {
    quant++
  }
  quantUsers.textContent = `Колличество участников: ${quant}`;
})


/// список всех пользователей



