let welcome = require('./welcome/welcome.js');
let header = require('./data/header');
let game = require('./levels/levelCont.js');
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
        // this.modele = new Modele();
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
    }
    changeControler(route = '') {
        let Controler = this.routes[route];
        new Controler().init();
    }

    init() {
        this.changeControler(getControlerFromHash(window.location.hash));
    }
}


let app = new App();
app.addRouters();
app.init();

let head = document.getElementById('head');
head.appendChild(header(initialState));

