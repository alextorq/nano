class Modele {
    constructor() {

    }
    gettingData() {
        let self = this;
        makeRequest({}, '/data').then((answer) => {
                self.data = JSON.parse(answer);
                self.ready();
            });
    }
    ready() {

    }
}
module.exports = Modele;
