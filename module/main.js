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

