let container = document.querySelector('#main');
function changeLevel (template) {
    container.innerHTML = '';
    container.appendChild(template);
}

module.exports = changeLevel;