const Player = require("./structs/player");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Room = require("./structs/room");
const Rooms = require("./structs/rooms");
// const path = require('path');
const {firebaseAppInit, db} = require("./firestoreApp");
const playerCreated = functions.firestore
 .document('players/{playerId}')
//  .onCreate((event: functions.Event<functions.firestore.DeltaDocumentSnapshot>) => {
    .onCreate((snap, context) => {
  try {
      // console.log('trigerred event ', JSON.stringify(snap.val()))
      const data = snap.data();
      console.log('data for snap ', snap);
      // console.log(snap.val())
      console.log('player created')
      console.log(data);
  const playerId = context.params.playerId;
  console.log('context ', context)
  console.log(playerId);
//   const player: Player = event.data.data();
// console.log(JSON.stringify(playerId));
const player = new Player(data);
  // const db = admin.firestore();
  console.log('trying to run transaction')
  return db.runTransaction((trs) => {
//   return db.runTransaction((trs: FirebaseFirestore.Transaction) => {
    const roomsObj = new Rooms();
   return roomsObj.findFreeRoom(db, trs, player.players)
    // .then((roomResult: FirebaseFirestore.QuerySnapshot) => {
        .then((roomResult) => {
          console.log('room resukt ', roomResult);
     var roomId;
     if (roomResult.size == 1) {
      // a room was found, add the player to it
    //const roomSnapshot: FirebaseFirestore.DocumentSnapshot = roomResult.docs[0];
      const roomSnapshot = roomResult.docs[0];
    //   const room: Room = <Room> roomSnapshot.data();
    console.log(roomSnapshot.data())
    const room = new Room(roomSnapshot.data());
      const players = [...room.players, playerId];
      const full = players.length == room.size;
    //   const newRoomData: Room = { full, size: room.size, players };
    const newRoomData = { full, size: room.size, players };
      trs.set(roomSnapshot.ref, newRoomData);
      roomId = roomSnapshot.id;
     } else {
       console.log('creating room')
      // no room was found, create a new room with the player
      const players = [playerId];
    //   const roomRef: FirebaseFirestore.DocumentReference = db.collection('rooms').doc();
    const roomRef = db.collection('rooms').doc();
    // console.log('room ref ', roomRef);
      trs.set(roomRef, { full: false, size: player.players, players:players });
      roomId = roomRef.id;
     }
     console.log('room ID', roomId, playerId);
     // then add a reference to the room in the player document
     console.log('data')
    //  const playerRef = 
    // db.collection('players').doc(`${playerId}`).then(d => console.log(d));
    //  console.log(d);
     trs.update(db.collection('players').doc(`${playerId}`), { roomId: roomId });
    });
   });
  } catch(err) {
    console.log('error in trigger ', err);
  }
  });
module.exports = {playerCreated};
