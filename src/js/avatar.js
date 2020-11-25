const userAvatar = document.querySelector('.user__icon-img');

function addAvatar(user) {
  userAvatar.style.backgroundImage = `url(${user.avatar})`;
  console.log("Ава")
}  

module.exports = {
  addAvatar
}