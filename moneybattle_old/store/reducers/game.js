import { ROLL_DICE } from '../actions/game';
import { diceGenerator } from '../../components/lib/randomNumberGenerator'
const initialState = {
    diceValues: []
}

export default (state= initialState, action) => {
    switch(action.type) {
        case ROLL_DICE:
            return {...state, diceValues: [diceGenerator(), diceGenerator()]};
            break;
    }
    return state;
}