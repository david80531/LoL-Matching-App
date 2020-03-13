import { GiftedChat } from 'react-native-gifted-chat';
import {setUserAndMessage} from './user-actions.js';

function setIdx (idx) {
    return {
        type: '@CHAT/SET_INDEX',
        idx
    }
}

function setChatRoom(chatingName, chatingChampionName) {
    return {
        type: '@CHAT/SET_CHATROOM',
        chatingName,
        chatingChampionName
    }
}


export function chatRoomInit (chatingName, chatingChampionName) {
    return (dispatch, getState) => {
        dispatch(setChatRoom(chatingName, chatingChampionName));

        var AllMessages = getState().allMessages.UsersAndMessages;
        var AllUsers = getState().allMessages.ChatingUsers;

        var idx = AllUsers.indexOf(chatingName);
        if(idx > -1){
            dispatch(setIdx(idx));
        } else {
            AllMessages.push({
                partnerName: chatingName,
                championName: chatingChampionName,
                msg: []
            });
            AllUsers.push(chatingName);

            dispatch(setIdx(AllMessages.length - 1));
        }
        dispatch(setUserAndMessage(AllMessages, AllUsers));
    }
}
