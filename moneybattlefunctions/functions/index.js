const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const {firebaseAppInit, db} = require("./firestoreApp");
// const firebaseApp = require("firebase/app")
// require('firebase/firestore');
const express = require('express');
// console.log(functions.config().firebase)

const playerCreated = require('./playerFunctions');

const getData = async () =>  {
    const users = await db.collection('users').listDocuments();
    console.log('users ', users);
    return users;
}
const app = express();
app.use(express.json());
app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
});
app.get('/timestamp-cached', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
});
app.get('/users', async (req,res) => {
    let data = await getData();
    res.send(JSON.stringify(data))
    // getData().then(data => res.send(JSON.stringify(data)))
});
app.post('/signup', async (req,res) => {

})
const addPlayer = (uid, name, players) => {

    return db.collection('players').doc().create({ uid, name, players });
}
app.post('/addusers', async (req,res) => {
    try {
        console.log('data from post');
        console.log({a: req.body.uid, b: req.body.name, c: req.body.players})
        let data = await addPlayer(req.body.uid, req.body.name, req.body.players);
        console.log('data ', data);
        res.send('success');
    } catch(err) {
        res.send('error')
    }
    //   addPlayer('Huey', 3).then(() => console.log('added Huey'));
    //   addPlayer('Foo', 2).then(() => console.log('added Foo'));
    //   addPlayer('Dewey', 3).then(() => console.log('added Dewey'));
    //   addPlayer('Bar', 2).then(() => console.log('added Bar'));
    //   addPlayer('Louie', 3).then(() => console.log('added Louie'));
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.player = playerCreated.playerCreated;
exports.helloWorld = functions.https.onRequest(app);
