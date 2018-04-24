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

app.post("/data", jsonParser, function (request, response) { //Обработка запроса на аддресе
    console.log('same body want your data');
    mongoClient.connect(levelsUrl).
    then((clientObj) => {
        client = clientObj;
        let db = client.db(levelsDatabase);
        let collection = db.collection('levels');
        return collection.find().toArray();
    }).
    then((results) => {
        console.log(results);
        client.close();
        response.send(results);
    }).
    catch((err) => {console.log(err)});
});