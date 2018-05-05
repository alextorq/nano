const mongoClient    = require('mongodb').MongoClient;
const levels         = require('./module/data/levels/levels');

let client;
const levelsUrl = "mongodb://localhost:27017";
const levelsDatabase = 'levels';

mongoClient.connect(levelsUrl).
then((clientObj) => {
    client = clientObj;
    let db = client.db(levelsDatabase);
    let collection = db.collection('levels');
    return collection.insertOne(levels);
}).
then(() => {
    client.close();
}).
catch((err) => {
 console.log(err)
});

