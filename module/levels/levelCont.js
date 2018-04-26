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