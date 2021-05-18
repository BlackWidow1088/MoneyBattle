const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.join(__dirname, './MoneyBattle.json'));
const config = {
  }
const firebaseAppInit = firebase.initializeApp(config);
const db = firebaseAppInit.firestore();
db.settings({ ignoreUndefinedProperties: true })

module.exports =  {firebaseAppInit, db};
