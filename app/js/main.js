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
let initialState = {
    status: 'В норме',
    time: 'Вечер',
    location: 'Близ городского порта'

};

module.exports = initialState;

},{}],3:[function(require,module,exports){
let welcome = require('./welcome/welcome.js');
let header = require('./data/header');
let modele = require('./data/modele.js');

let end;

let URL = {
    'WELCOME': '',
    'END': 'gameover'
};

let getControlerFromHash = (hash) => {hash.replace('#', '')};

class Route {
    constructor() {
        this.routes = {
            [URL.WELCOME]: welcome,
            [URL.END]: end
        };
        window.onhashchange = () => {
            this.changeControler(getControlerFromHash(location.hash));
        };
    }
    changeControler(route = '') {
        let Controler = this.routes[route];
        new Controler().init();
    }

    init() {
        this.changeControler(getControlerFromHash(location.hash));
    }
};


let app = new Route();
app.init();

let head = document.getElementById('head');
head.appendChild(header(modele));


},{"./data/header":1,"./data/modele.js":2,"./welcome/welcome.js":5}],4:[function(require,module,exports){
let container = document.querySelector('#main');
function changeLevel (template) {
    container.innerHTML = '';
    container.appendChild(template);
}

module.exports = changeLevel;
},{}],5:[function(require,module,exports){
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
            console.log('a');
        };
    }

}


module.exports = welcomeControler;
},{"../data/modele":2,"../utils/utils":4,"./welcomeView":6}],6:[function(require,module,exports){
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

},{}]},{},[3]);
