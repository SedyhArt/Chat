function getUserInfo() {
  const userName = document.querySelector('.enter__name');
  const userNick = document.querySelector('.enter__nick');
  const currentUser = document.getElementById('user');
  const userDom = document.getElementById('userDom');
  currentUser.innerHTML = [
    '<div class="user__icon">',
      '<svg class="user__icon-img">',
        '<use xlink:href="img/photo-camera.svg">',
        '</use>',
      '</svg>',
    '</div>',
    '<div class="user__info">',
      `<div>${userName.value}</div>`,
      `<div><i>${userNick.value}</i></div>`,
    '</div>'
  ].join('');
  console.log(userName.value, userNick.value)
  return {
    name: userName.value,
    nick: userNick.value
  }
}

module.exports = {
  getUserInfo
}