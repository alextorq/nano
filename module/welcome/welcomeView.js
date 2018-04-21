let startComand = 'Попытатся открыть';
let endGame = 'Выбросить';

class welcomeView {
    constructor() {

    }
    get template() {
        return `<p>Отмель вблизи городского порта всегда кишила рыбой.</p>
        <p>Сидя на корме и неспешно потягивая ром вы оттягиваете момент<br>
        когда нужно будет выбирать сеть. Джарвис не пришел и вам
        придется ташить сеть одному.<br>
        В отсвете луны на воде вы замечаете что что-то покачивается на волнах <br>
        Весла не успели опустится и десятка раз и вот вы уже держите в руках деревянный <br>
        короб.
        </p>
        <input type="text">
        <p>Попытатся открыть</p>
        <p>Выбросить</p>
    `

    }
    bind() {
        let input = this._element.querySelector('input');
        input.onkeydown = function(event) {
            if (event.keyCode == '13') {
                let value = event.target.value;
                if (value == startComand) {
                    this.startGame();
                }
                else if (value == endGame) {
                    this.endGame();
                }
                else {
                    alert('Выберете ответ из доступных вариантов');
                }
            }
        }.bind(this);
    }
    endGame() {

    }
    startGame() {

    }
    render(template) {
        let div = document.createElement('div');
        div.innerHTML = template;
        return div;
    }
    get element() {
        if(!this._element) {
            this._element = this.render(this.template);
            this.bind();
        }
        return this._element;
    }
}
module.exports = welcomeView;
