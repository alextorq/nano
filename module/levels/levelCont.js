let levelView = require('./levels');
let levels = require('../data/levels/levels');
let changeLevel = require('../utils/utils');

class Level {
    constructor() {
        this.view = new levelView();
    }
    init() {
        this.view.level = levels.level0;
        console.log(this.view);
        changeLevel(this.view.element);
    }
}

module.exports = Level;