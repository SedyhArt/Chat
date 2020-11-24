const quant = document.getElementById('quant-users');

function quantUsers(connections) {
    quant.textContent = `Колличество участников: ${Object.keys(connections).length}`;
}


module.exports = {
  quantUsers
}
