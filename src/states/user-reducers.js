import {AsyncStorage} from 'AsyncStorage';


const initUserState = {
    userId: 'nopasslook',
    championId: 1,
    championName:'Fizz',
    championLevel: 7,
    championTag:'Assassin',
    tier: 'DIAMOND',
    rank: 'V',
    winRate: 70
}

export function user (state = initUserState, action){
    switch (action.type) {
        case '@USER/START_GET_INFO':
            return {
                ...state,
                userId: action.userId
            };
        case '@USER/END_GET_INFO':
            return {
                ...state,
                championId: action.championId,
                championLevel: action.championLevel,
                tier: action.tier,
                rank: action.rank,
                championName: action.championName,
                championTag: action.championTag,
                winRate: action.winRate 
            };
        case　'@USER/RESET_USER':
            return {
                ...initUserState,
            };
        default:
            return state;
    }
};

const initAllMsgState = {
    UsersAndMessages:[],
    ChatingUsers:[]
}

export function allMessages (state = initAllMsgState, action){
    switch(action.type) {
        case '@MSG/SET_USER_AND_MSG':
            return{
                ...state,
                UsersAndMessages: action.UserandMessage,
                ChatingUsers: action.User
            };
        case '@MSG/SET_MESSAGES':
            return {
                ...state,
                UsersAndMessages: action.Messages
            }
        default:
            return state;
    }
}
