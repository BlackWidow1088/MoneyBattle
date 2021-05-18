export const random =  (min, max)  => {
    // both are inclusive
    if(!min) {
        min = 0;
    }
    if(!max) {
        max = 100;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
export const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 export const diceGenerator = () => {
    return Math.floor(Math.random() * (6) + 1);
 }