
class levelView {
    constructor() {

    }
    render() {
        let div = document.createElement('template');
        div.innerHTML = this.modele.description;
        let input = document.createElement('input');
        div.content.appendChild(input);
        for (let answer of this.modele.answers) {
            let answerWrapper = document.createElement('p');
            answerWrapper.innerHTML = answer;
            div.content.appendChild(answerWrapper);
        }
        this._element = div.content;
    }
    bind() {
        let input = this._element.querySelector('input');
        input.onkeydown = () => {
            if (event.keyCode == '13') {
                // let value = event.target.value;
                // if (value == startComand) {
                //     this.startGame();
                // }
                // else if (value == endGame) {
                //     this.endGame();
                // }
                // else {
                //     alert('Выберете ответ из доступных вариантов');
                // }
                console.log('123');
            }
        }
    }
    set level(obj) {
        this.modele = obj;
    }
    get element() {
        if (!this._element) {
            this.render();
            this.bind();
        }
        return this._element;
    }
}

module.exports = levelView;