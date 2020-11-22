const messageText = document.querySelector('.messages__input');
const messageContainer = document.querySelector('.messages__list');
const { getUserInfo } = require('./init.js');

function addMessage(message) {
  console.log(message);
  const messageItem = document.createElement('li');
  messageItem.classList.add('messages__item')
  messageItem.innerHTML = `<div><b>${message.name}</b></div><div>${message.message}</div>`
  messageContainer.appendChild(messageItem);
}
const nick = getUserInfo().nick

function sendMessage() {
  this.emit('send mess', {
    message : messageText.value,
    user: nick
  });

  messageText.value = '';
}

module.exports = {
  sendMessage,
  addMessage
}