import{getUserInfoFromApi} from '../api/riot.js';

export function input(inputValue){
    return {
        type: '@SEARCH_RESULT/INPUT',
        inputValue
    };
}

function startGetUserInfo (userId) {
    return {
        type: '@SEARCH_RESULT/START_GET_INFO',
        userId
    }
}

function endGetUserInfo (championId, championLevel, rank, tier, championName, winRate) {
    return {
        type: '@SEARCH_RESULT/END_GET_INFO',
        championId,
        championLevel,
        tier,
        rank,
        championName,
        winRate
    }
}


export function resetUser() {
    return {
        type:'@SEARCH_RESULT/RESET_USER'
    }
}

export function getUserInfo(userId) {
    return (dispatch, getState) =>{
        dispatch(startGetUserInfo(userId));

        return getUserInfoFromApi(userId).then(userInfo =>{
            const {championId, championLevel, rank, tier, championName, winRate} = userInfo;
            console.log('in client:');
            console.log(userInfo);
            dispatch(endGetUserInfo(championId, championLevel, rank, tier, championName, winRate));
        }).catch(err =>{
            //console.error('Error getting user information', err);
            dispatch(resetUser());
        });
    };
}
