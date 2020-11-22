function getUserInfo() {
  const userName = document.querySelector('.enter__name');
  const userNick = document.querySelector('.enter__nick');
  const userInfo = document.querySelector('.user__info');
  
  userInfo.innerHTML = `<div>${userName.value}</div><div><i>${userNick.value}</i></div>`;
  
  console.log(userName.value, userNick.value)

  return {
    name: userName.value,
    nick: userNick.value
  }
}

module.exports = {
  getUserInfo
}