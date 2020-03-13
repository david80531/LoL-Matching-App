initChatState = {
    idx: 0,
    chatingName: '',
    chatingChampionName: 'Ezreal',
};

export function chatroom (state = initChatState, action) {
    switch (action.type) {
        case '@CHAT/SET_INDEX':
            return {
                ...state,
                idx: action.idx
            };
        case '@CHAT/SET_CHATROOM':
            return {
                ...state,
                chatingName: action.chatingName,
                chatingChampionName: action.chatingChampionName
            };
        default:
            return state;
    }
}
