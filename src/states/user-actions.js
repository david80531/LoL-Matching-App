import{getUserInfoFromApi} from '../api/riot.js';
import { GiftedChat } from 'react-native-gifted-chat';
//user

function startGetUserInfo (userId) {
    return {
        type: '@USER/START_GET_INFO',
        userId
    }
}

function endGetUserInfo (championId, championLevel, rank, tier, championName, championTag, winRate) {
    return {
        type: '@USER/END_GET_INFO',
        championId,
        championLevel,
        tier,
        rank,
        championName,
        championTag,
        winRate
    }
}


function resetUser() {
    return {
        type:'@USER/RESET_USER'
    }
}

export function getUserInfo(userId) {
    return (dispatch, getState) =>{
        dispatch(startGetUserInfo(userId));

        return getUserInfoFromApi(userId).then(userInfo =>{
            const {championId, championLevel, rank, tier, championName, championTag, winRate} = userInfo;
            console.log('in client:');
            console.log(userInfo);
            dispatch(endGetUserInfo(championId, championLevel, rank, tier, championName, championTag, winRate));
        }).catch(err =>{
            console.error('Error getting user information', err);
            dispatch(resetUser());
        });
    };
}

export function setUserAndMessage(UserandMessage, User){
    return {
        type: '@MSG/SET_USER_AND_MSG',
        UserandMessage,
        User
    }
}

export function setMessage(Messages) {
    return {
        type:'@MSG/SET_MESSAGES',
        Messages
    }
}

export function ISendMsg(messages){
    return (dispatch, getState) => {
        var AllMessages = getState().allMessages.UsersAndMessages;
        var idx = getState().chatroom.idx;

        AllMessages[idx].msg = GiftedChat.append(AllMessages[idx].msg, messages);
        dispatch(setMessage(AllMessages));
    }
}

export function receiveMessages(data) {
    return (dispatch, getState) =>{

        var AllMessages = getState().allMessages.UsersAndMessages;
        var AllUsers = getState().allMessages.ChatingUsers;

        var idx = AllUsers.indexOf(data.partnerName);

        if(idx > -1){
            AllMessages[idx].msg = GiftedChat.append(AllMessages[idx].msg, data.msg);
        } else {
            AllMessages.push(data);
            AllUsers.push(data.partnerName);
        }
        dispatch(setUserAndMessage(AllMessages, AllUsers));

    }
}
