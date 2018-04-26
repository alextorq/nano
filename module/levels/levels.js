
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
                let value = event.target.value;
                for (let answer of this.modele.answers) {
                    if (value == answer) {
                        let number = this.modele.answers.indexOf(value);
                        let nextLevel = this.modele.answersLevel[number];
                        this.changeScreen(nextLevel);
                        return
                    }
                }
                alert('Выберете ответ из доступных вариантов');
            }
        }
    }
    changeScreen() {

    }
    set level(obj) {
        this.modele = obj;
    }
    get element() {
        this.render();
        this.bind();
        return this._element;
    }
}

module.exports = levelView;