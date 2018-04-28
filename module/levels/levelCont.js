let levelView = require('./levels');
let header           = require('../data/header');
let changeLevel = require('../utils/utils');
let head = document.getElementById('head');

class Level {
    constructor(modele) {
        this.modele = modele;
        this.view = new levelView();
        this.view.changeScreen = function(obj) {
            let level = this.modele[obj.level];
            this.init(level);
            head.innerHTML ='';
            head.appendChild(header({
                status: obj.live,
                time: obj.time,
                location: obj.location
            }));
        }.bind(this);
    }
    init(level = this.modele.level0) {
        this.view.level = level;
        changeLevel(this.view.element);
    }
}

module.exports = Level;