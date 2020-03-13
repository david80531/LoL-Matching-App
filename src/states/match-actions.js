import {getMatchFromApi} from '../api/match.js';
//Match
export function startLoading(){
    return {
        type: '@MACTH/START_LOADING'
    };
}

export function endLoading(){
    return {
        type: '@MATCH/END_LOADING'
    };
}

export function openMatch(){
    return {
        type: '@MATCH/OPEN_MATCH'
    };
}

function noMatch(){
    return {
        type: '@MATCH/NO_MATCH'
    };
}

function endGetMatch(matches){
    return {
        type: '@MATCH/END_Get_MATCH',
        matches
    };
}

export function getMatch(userId){
    return (dispatch, getState) =>{

        return getMatchFromApi(userId).then(matches =>{
          dispatch(endGetMatch(matches));
          dispatch(endLoading());
        }).catch(err =>{
            console.log('Error Getting match');
            console.log(err);
        })
    }
}

//Match item
