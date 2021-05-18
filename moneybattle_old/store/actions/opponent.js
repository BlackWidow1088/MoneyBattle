export const SAVE_OPPONENT = 'SAVE_OPPONENT';
export const ASSIGN_PLAY_AREA_OPPONENT = 'ASSIGN_PLAY_AREA_OPPONENT'

export const saveOpponent = opponent => {
    return {type: SAVE_OPPONENT, opponent: opponent}
}
export const assignPlayAreaToOpponent = opponent => {
    return {type: ASSIGN_PLAY_AREA_OPPONENT, opponent: opponent}
}