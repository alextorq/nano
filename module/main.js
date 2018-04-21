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

