const userName = document.querySelector('.enter__name');
const userNick = document.querySelector('.enter__nick');

const enterButton = document.querySelector('#enterButton');
const wrapper =  document.querySelector('.wrapper');
const chat =  document.querySelector('.chat');


enterButton.addEventListener('click', (e) => {
  wrapper.classList.add('hidden');
  chat.classList.remove('hidden');
  getUserInfo();
})

function getUserInfo() {
  const currentUser = document.getElementById('user');
  currentUser.innerHTML = `<div>${userName.value}</div><div>${userNick.value}</div>`
}
