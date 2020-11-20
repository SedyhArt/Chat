const messageText = document.querySelector('.messages__input');
const sendButton = document.querySelector('#sendButton');
const messageContainer = document.querySelector('.messages__list');
const { getUserInfo } = require('./js/init.js');
// socket.addEventListener('message', e => addMessage(e.data));

function addMessage(message) {
  const messageItem = document.createElement('li');
  messageItem.classList.add('messages__item')
  messageItem.innerHTML = `<div><b>${message.name}</b></div><div>${message.message}</div>`
  // messageItem.textContent = message;
  messageContainer.appendChild(messageItem);
}
const nick = getUserInfo().nick

function sendMessage() {
  socket.emit('send mess', {
    message : messageText.value,
    user: nick
  });
  messageText.value = '';

  socket.on('add mess', addMessage(data))
}

// sendButton.addEventListener('click', sendMessage());
// messageText.addEventListener('change', sendMessage);

module.exports = {
  sendMessage,
  addMessage
}