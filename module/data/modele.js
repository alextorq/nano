class Modele {
    constructor() {

    }
    get data() {
        let self = this;
        makeRequest({}, '/data').then((answer) => {
                self.data = answer;
            })
    }
    set data(object) {
        this.data = object;
        this.ready();
    }
    ready() {

    }
}
module.exports = Modele;
