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

