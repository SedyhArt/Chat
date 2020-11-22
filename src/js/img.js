// const avatar = document.querySelector('.user__icon-img');

// avatar.addEventListener('dragover', (e) => {
//   e.preventDefault();

//   if(e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
//     e.preventDefault();
//   }
// });

// avatar.addEventListener('drop', (e) => {
//   e.preventDefault();

//   const file = e.dataTransfer.items[0].getAsFile();
//   const reader = new FileReader();
 
//   reader.readAsDataURL(file);
//   reader.addEventListener('load', () => {
//     avatar.style.backgroundImage = `url(${reader.result})`;
    
//   })
// })