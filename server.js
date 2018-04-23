const express        = require('express');
const opn            = require('opn');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

app.use(express.static(__dirname + "/"));

app.listen(port, () => {
    opn('http://127.0.0.1:8000');
});





