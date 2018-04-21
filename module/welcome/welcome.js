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