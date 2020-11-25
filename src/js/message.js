const messageText = document.querySelector('.messages__input');
const messageContainer = document.querySelector('.messages__list');
const { getUserInfo } = require('./init.js');

function addMessage(message) {
  // console.log(message);
  const messageItem = document.createElement('li');
  messageItem.classList.add('messages__item')

  const t = new Date();
  let h = t.getHours();
  if (h < 10) h = '0' + h
  let m = t.getMinutes();
  if (m < 10) m = '0' + m


  let bg = " ";
  if (message.img) {
    bg = `style="background-image: url(${message.img})"`;
  }

  messageItem.innerHTML = [
    '<div class="message">',
    `<div class="message__avatar" data-role="${message.nick}" ${bg}></div>`,
    '<div class="message__text">',
    `<div><b>${message.name}</b><span class="message__time">${h}:${m}</div>
        <div>${message.message}</div>`,
    '</div>',
    '</div>'
  ].join('');
  messageContainer.appendChild(messageItem);
  messageContainer.scrollTop = messageContainer.scrollHeight;

  // const allMessages = document.querySelectorAll(`.message__avatar[data-role='${message.nick}'`);

  // allMessages.forEach(item => {
  //   item.style.backgroundImage = `url(${message.img})`;
  // })
}

function sendMessage() {
  this.emit('send mess', {
    message: messageText.value,
    nick: getUserInfo().nick,
    name: getUserInfo().name
  });

  messageText.value = '';
}



module.exports = {
  sendMessage,
  addMessage
}