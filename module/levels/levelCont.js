let levelView = require('./levels');
let levels = require('../data/levels/levels');
let changeLevel = require('../utils/utils');

class Level {
    constructor() {
        this.view = new levelView();
        this.view.changeScreen = function(level) {
            level = levels[level];
            this.init(level);
        }.bind(this);
    }
    init(level = levels.level0) {
        this.view.level = level;
        changeLevel(this.view.element);
    }
}

module.exports = Level;