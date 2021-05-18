import { SAVE_LOGGEDIN_PLAYER, ASSIGN_PLAY_AREA_PLAYER } from '../actions/player';

const initialState = {
    loggedInPlayer: null,
    playAreaSlot: null
}

export default (state= initialState, action) => {
    switch(action.type) {
        case SAVE_LOGGEDIN_PLAYER:
            return {...state, loggedInPlayer: action.player};
            break;
        case ASSIGN_PLAY_AREA_PLAYER:
            return {...state, playAreaSlot: action.player}
            break;
    }
    return state;
}