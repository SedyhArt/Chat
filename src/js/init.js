function getUserInfo() {
  const userName = document.querySelector('.enter__name');
  const userNick = document.querySelector('.enter__nick');
  const currentUser = document.getElementById('user');
  const userInfo = document.querySelector('.user__info');
  
  userInfo.innerHTML = `<div>${userName.value}</div><div><i>${userNick.value}</i></div>`;
  // [
  //   // '<div class="user__icon">',
  //   //   '<div class="user__icon-img">',
  //   //     // '<img src="./src/img/photo-camera.png" id="avatar">',
  //   //   '</div>',
  //   // '</div>',
  //   // '<div class="user__info">',
  //     `<div>${userName.value}</div>`,
  //     `<div><i>${userNick.value}</i></div>`,
  //   // '</div>'
  // ].join('');
  
  console.log(userName.value, userNick.value)

  return {
    name: userName.value,
    nick: userNick.value
  }
}

module.exports = {
  getUserInfo
}