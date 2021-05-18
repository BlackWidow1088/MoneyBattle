class Rooms {
    /**
      * Search a non full room of a specific size
      *
      * @param db The database connection
      * @param trs The transaction in which to execute the request
      * @param size The number of players in the room
      */
     findFreeRoom = (db, trs, size) => {
        return trs.get(db.collection('rooms')
          .where('full', '==', false)
          .where('size', '==', size)
          .limit(1));
     }
    //   static findFreeRoom(
    //      db: FirebaseFirestore.Firestore,
    //      trs: FirebaseFirestore.Transaction,
    //      size: number): Promise<FirebaseFirestore.QuerySnapshot> {
    //      return trs.get(db.collection('rooms')
    //        .where('full', '==', false)
    //        .where('size', '==', size)
    //        .limit(1));
    //   }
   }
   module.exports = Rooms;