const socket = io();
// const socket = new WebSocket("ws://localhost:8080/");
const messageText = document.querySelector('.messages__input');
const sendButton = document.querySelector('#sendButton');
const messageContainer = document.querySelector('.messages__list');

socket.addEventListener('message', e => addMessage(e.data));

function addMessage(message) {
  const messageItem = document.createElement('li');

  messageItem.textContent = message;
  messageContainer.appendChild(messageItem);
}

function sendMessage() {
  socket.send(messageText.value);
  messageText.value = '';
}

sendButton.addEventListener('click', sendMessage);
messageText.addEventListener('change', sendMessage);