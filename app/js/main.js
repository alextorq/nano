(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
let levels = {
    level0: {
        description: `
        <p>При попытке открыть короб вы потерпели неудачу</p>
        <p>Пытаясь окрыть короб вы заметили выжженную эмблему на одной из сторон</p>
        <p>Она представляла собой щит и терновник</p> 
        `,
        answers: ['Блыть к берегу', 'Выбрать сеть'],
        answersLevel: {
            '1': 'jail',
            '2': 'city'
        }
    },
    jail: {
        description: `
        <p>Когда вы приблизилиьс к берегу вы увидели стражу рыскающею по берегу</p>
        <p>Как только вы подплыли к вам подошел офицер и спросил что вы тут делаете</p>
        <p>Я рыбак в этих местах полно рыбы</p>
        <p>И где же твоя сеть?</p>
        <p>Сегодня удача не на моей стороне и я оставил ее до завтра может что-то и поймается</p>
        <p>Похоже офицера такой ответ не устроил и он приказал обыскать лодку</p>
        <p>Один из стражников нашел короб и передал его офицеру</p>
        <p>Тот взял короб увидел эмблему</p>
        <p>Схватить</p>
        <p>И вот вы уже едите в городскую управу</p>
        `,
    }

};
module.exports = levels;
},{}],3:[function(require,module,exports){
let initialState = {
    status: 'В норме',
    time: 'Вечер',
    location: 'Близ городского порта'

};

module.exports = initialState;

},{}],4:[function(require,module,exports){
let levelView = require('./levels');
let levels = require('../data/levels/levels');
let changeLevel = require('../utils/utils');

class Level {
    constructor() {
        this.view = new levelView();
    }
    init() {
        this.view.level = levels.level0;
        console.log(this.view);
        changeLevel(this.view.element);
    }
}

module.exports = Level;
},{"../data/levels/levels":2,"../utils/utils":7,"./levels":5}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){
let welcome = require('./welcome/welcome.js');
let header = require('./data/header');
let modele = require('./data/modele.js');
let game = require('./levels/levelCont.js');
let end;

let URL = {
    'WELCOME': '',
    'GAME': 'game',
    'END': 'gameover'
};

let getControlerFromHash = (hash) => {
    hash = hash.replace('#', '');
    return hash;
};

class Route {
    constructor() {
        this.routes = {
            [URL.WELCOME]: welcome,
            [URL.GAME]: game,
            [URL.END]: end
        };
        window.onhashchange = () => {
            this.changeControler(getControlerFromHash(window.location.hash));
        };
    }
    changeControler(route) {
        let Controler = this.routes[route];
        new Controler().init();
        console.log(Controler);
    }

    init() {
        this.changeControler(getControlerFromHash(window.location.hash));
    }
}


let app = new Route();
app.init();

let head = document.getElementById('head');
head.appendChild(header(modele));


},{"./data/header":1,"./data/modele.js":3,"./levels/levelCont.js":4,"./welcome/welcome.js":8}],7:[function(require,module,exports){
let container = document.querySelector('#main');
function changeLevel (template) {
    container.innerHTML = '';
    container.appendChild(template);
}

module.exports = changeLevel;
},{}],8:[function(require,module,exports){
let modele = require('../data/modele');
let view = require('./welcomeView');
let changeLevel = require('../utils/utils');

class welcomeControler {
    constructor() {
        this.view = new view();
    }
    init() {
        changeLevel(this.view.element);
        this.view.startGame = function() {
            window.location.hash = 'game';
        };
    }

}


module.exports = welcomeControler;
},{"../data/modele":3,"../utils/utils":7,"./welcomeView":9}],9:[function(require,module,exports){
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

},{}]},{},[6]);
