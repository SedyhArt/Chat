const userAvatar = document.querySelector('.user__icon-img');

function addAvatar(bs64) {
  userAvatar.style.backgroundImage = `url(${bs64})`;
  
}  

module.exports = {
  addAvatar
}