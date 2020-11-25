const avatar = require('./js/avatar');
const { getUserInfo } = require('./js/init');
const init = require('./js/init');
const { sendMessage } = require('./js/message.js');

/// получение данных пользователя

const enterButton = document.querySelector('#enterButton');
const wrapper = document.querySelector('.wrapper');
const chat = document.querySelector('.chat');

enterButton.addEventListener('click', (e) => {
  wrapper.classList.add('hidden');
  chat.classList.remove('hidden');

  const socket = require('./js/sockets');

  /// сообщение

  const sendButton = document.querySelector('#sendButton');
  sendButton.addEventListener('click', sendMessage.bind(socket));

  /// Avatar

  const avatarIcon = document.querySelector('.user__icon-img');
  const avatarForm = document.querySelector('.avatar-form__wrapper');

//// открытие формы загрузки картинки

  avatarIcon.addEventListener('click', () => {
    avatarForm.classList.remove('hidden');
    chat.classList.add('hidden');
  })

  const avatarContainer = document.querySelector('.avatar-form__img');

  avatarContainer.addEventListener('dragover', (e) => {
    e.preventDefault();

    if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
      e.preventDefault();
    }
  });

  /// обработчик закрытия формы

  const closeImageButton = document.querySelector('.controlls__close');
  closeImageButton.addEventListener('click', () => {
    avatarContainer.style.backgroundImage = null;
    console.log('1111')
    avatarForm.classList.add('hidden');
    chat.classList.remove('hidden');
  });

  //// обработчки добавления фото "drop"

  avatarContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    const file = e.dataTransfer.items[0].getAsFile();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      avatarContainer.style.backgroundImage = `url(${reader.result})`;

///// обработчки загрузки фото

      const loadImageButton = document.querySelector('.controlls__load');
      loadImageButton.addEventListener('click', () => {
        avatarIcon.style.backgroundImage = `url(${reader.result})`;
        
        let dataImg = {
          nick: getUserInfo().nick,
          img: reader.result
        };

        socket.emit('send image', dataImg);

        avatarForm.classList.add('hidden');
        chat.classList.remove('hidden');
      });
    })
  })
});


