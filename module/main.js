let welcome = require('./welcome/welcome.js');
let header = require('./data/header');
let modele = require('./data/modele.js');

let URL = {

};

class Route {
    constructor() {

    }
}


let app = new Route();


let welcomeControl = new welcome();
welcomeControl.init();

let head = document.getElementById('head');
head.appendChild(header(modele));

