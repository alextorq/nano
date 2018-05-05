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
class Modele {
    constructor() {

    }
    gettingData() {
        let self = this;
        makeRequest({}, '/data').then((answer) => {
                self.data = JSON.parse(answer);
                self.ready();
            });
    }
    ready() {

    }
}
module.exports = Modele;

},{}],3:[function(require,module,exports){
let levelView = require('./levels');

let changeLevel = require('../utils/utils');

class Level {
    constructor(modele) {
        this.modele = modele;
        this.view = new levelView();
        this.view.changeScreen = function(level) {
            level = this.modele[level];
            this.init(level);
        }.bind(this);
    }
    init(level = this.modele.level0) {
        this.view.level = level;
        changeLevel(this.view.element);
    }
}

module.exports = Level;
},{"../utils/utils":7,"./levels":4}],4:[function(require,module,exports){

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
},{}],5:[function(require,module,exports){
let welcome = require('./welcome/welcome.js');
let header = require('./data/header');
let game = require('./levels/levelCont.js');
let modele = require('./data/modele');
require('./utils/makeRequest');

let end;

let initialState = {
    status: 'В норме',
    time: 'Вечер',
    location: 'Близ городского порта'

};

let URL = {
    'WELCOME': '',
    'GAME': 'game',
    'END': 'gameover'
};

let getControlerFromHash = (hash) => {
    hash = hash.replace('#', '');
    return hash;
};

class App {
    constructor() {
        this.modele = new modele();
        this.modele.ready =  () => {
            this.addRouters();

        };
        this.modele.gettingData();
    }
    addRouters() {
        this.routes = {
            [URL.WELCOME]: welcome,
            [URL.GAME]: game,
            [URL.END]: end
        };
        window.onhashchange = () => {
            this.changeControler(getControlerFromHash(window.location.hash));
        };
        this.changeControler(getControlerFromHash(window.location.hash));
    }
    changeControler(route = '') {
        let Controler = this.routes[route];
        new Controler(this.modele.data).init();
    }
}

let app = new App();


let head = document.getElementById('head');
head.appendChild(header(initialState));


},{"./data/header":1,"./data/modele":2,"./levels/levelCont.js":3,"./utils/makeRequest":6,"./welcome/welcome.js":8}],6:[function(require,module,exports){
(function (global){
function makeRequest(date, url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader('Content-Type', 'application/json');
        let json = JSON.stringify(date);
        request.onreadystatechange = function() { // (3)
            if (request.readyState != 4) return;
            if (request.status != 200) {
                reject(request.status);
            }
            else {
                console.clear();
                resolve(this.responseText);
            }
        };
        request.send(json);
    })
}
global.makeRequest = makeRequest;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
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
},{"../data/modele":2,"../utils/utils":7,"./welcomeView":9}],9:[function(require,module,exports){
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

},{}]},{},[5]);
