let header = (state) => {
    let template = `<div class="header">
        <div class="container">
                <div class="lives">Состояние: ${state.status}</div>
        <div class="world">Место: ${state.location}</div>
        <div class="time">Время: ${state.time}</div>
    </div>
    </div>`;
    let container = document.createElement('template');
    container.innerHTML = template;
    return container.content;

};

module.exports = header;