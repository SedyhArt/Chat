const socket = require('socket.io-client')('http://localhost:3000');
const { getUserInfo } = require('./js/init');
const init = require('./js/init');
const { sendMessage, addMessage } = require('./js/message.js');
const { addAvatar } = require('./js/avatar');
const { getUsers } = require('./js/getUsers');
const { quantUsers } = require('./js/quantUsers');

/// получение данных пользователя

const enterButton = document.querySelector('#enterButton');
const wrapper = document.querySelector('.wrapper');
const chat = document.querySelector('.chat');


enterButton.addEventListener('click', (e) => {
  wrapper.classList.add('hidden');
  chat.classList.remove('hidden');

  socket.emit('sendUserData', getUserInfo()); //// Отправляем данные пользователя на сервер 

});

socket.on('add avatar', ava => {
  addAvatar(ava);
})

socket.on('add mess', function (data) {
  addMessage(data);
});

socket.on('quantity users', (connections) => {
  getUsers(connections);
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

socket.on('quantity users', connections => {
  quantUsers(connections);
  
})



