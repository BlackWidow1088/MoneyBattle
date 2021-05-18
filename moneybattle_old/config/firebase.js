// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ENV from '../env';
// require('firebase/firestore')

const config = {
  apiKey: ENV.apiKey,
  authDomain: ENV.authDomain,
  databaseURL: ENV.databaseURL,
  projectId: ENV.projectId,
  storageBucket: ENV.storageBucket,
  messagingSenderId: ENV.messagingSenderId,
  // credential: firebase.credential.cert(ENV.certificate),
}

firebase.initializeApp(config)
// firestore.settings({ timestampsInSnapshots: true });
const db = firebase.firestore()

//Need to add this to forgo deprecated warnings
db.settings({
  timestampsInSnapshots: true
});

export default db;