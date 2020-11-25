const usersList = document.querySelector('.users__list');

function getUsers(connections) {
  usersList.innerHTML = '';
  
  for (let key in connections) {
    const userItem = document.createElement('li');
    userItem.classList.add('users__item');
    userItem.innerHTML = `<div class="users__item-name">${connections[key].name}</div><div class="users__item-nick"> Nickname: ${connections[key].nick}</div>`

    usersList.appendChild(userItem);
  }
}

module.exports = {
  getUsers
}