const messageText = document.querySelector('.messages__input');
const messageContainer = document.querySelector('.messages__list');
const { getUserInfo } = require('./init.js');

function addMessage(message) {
  console.log(message);
  const messageItem = document.createElement('li');
  messageItem.classList.add('messages__item')
  messageItem.innerHTML = [
    '<div class="message">',
      `<div class="message__avatar" style="background-image: url(${message.img});"></div>`,
      '<div class="message__text">',
        `<div><b>${message.nick}</b></div><div>${message.message}</div>`,
      '</div>',
    '</div>'
  ].join('');
  messageContainer.appendChild(messageItem);
}
// const nick = getUserInfo().nick

function sendMessage() {
  this.emit('send mess', {
    message : messageText.value,
    nick: getUserInfo().nick,
    name: getUserInfo().name
  });

  messageText.value = '';
}

module.exports = {
  sendMessage,
  addMessage
}