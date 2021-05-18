export const SAVE_LOGGEDIN_PLAYER = 'SAVE_LOGGEDIN_PLAYER';
export const ASSIGN_PLAY_AREA_PLAYER = 'ASSIGN_PLAY_AREA_PLAYER'

export const saveLoggedInPlayer = player => {
    return {type: SAVE_LOGGEDIN_PLAYER, player: player}
}
export const assignPlayAreaToPlayer = player => {
    return {type: ASSIGN_PLAY_AREA_PLAYER, player: player}
}