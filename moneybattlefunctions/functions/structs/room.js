  class Room {  
    constructor(data) {
      this.full = data.full;
      this.size = data.size;
      this.players = data.players;
      // this.full = false;
      // this.size = 0;
      // this.players = [];
    }
  }
  module.exports = Room;