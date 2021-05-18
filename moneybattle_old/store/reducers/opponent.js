import { SAVE_OPPONENT, ASSIGN_PLAY_AREA_OPPONENT } from '../actions/opponent';

const initialState = {
    loggedInPlayer: null,
    playAreaSlot: null
}

export default (state= initialState, action) => {
    switch(action.type) {
        case SAVE_OPPONENT:
            return {...state, loggedInPlayer: action.opponent};
            break;
        case ASSIGN_PLAY_AREA_OPPONENT:
            return {...state, playAreaSlot: action.opponent}
            break;
    }
    return state;
}