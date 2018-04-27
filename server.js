const express        = require('express');
const opn            = require('opn');
const mongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const levels         = require('./module/data/levels/levels.js');


const port = 8000;
const jsonParser = bodyParser.json();

let client;
const levelsUrl = "mongodb://localhost:27017";
const levelsDatabase = 'levels';

app.use(express.static(__dirname + "/"));

app.listen(port, () => {
    opn('http://127.0.0.1:8000');
});

app.post("/data", jsonParser, function (request, response) { //Обработка запроса на адресе
    mongoClient.connect(levelsUrl).
    then((clientObj) => {
        client = clientObj;
        let db = client.db(levelsDatabase);
        let collection = db.collection('levels');
        return collection.find().toArray();
    }).
    then((results) => {
        client.close();
        delete results[0]['_id'];
        response.send(results[0]);
    }).
    catch((err) => {console.log(err)});
});

app.post("/user", jsonParser, function (request, response) { //Обработка запроса на адресе
    let client;
    let user = request.body;

    mongoClient.connect(levelsUrl).then((clientObj) => {
        client = clientObj;
        let db = client.db(levelsDatabase);
        let collection = db.collection('users');
        return collection.insertOne({
            user
        }).then(function (result) {
            response.sendStatus(200);
        }).catch((err) => {
            console.log(err)
        });
    });
});