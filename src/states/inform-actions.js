export function clearInfoNum(){
    return {
        type:'@INF/CLEAR_INFO_NUM'
    }
}

export function clearInfo(){
    return {
        type:'@INF/CLEAR_INFO'
    }
}

function endSetInform(Informs){
    return {
        type: '@INF/END_SET_INFORM',
        Informs
    }
}

function startSetInform(Informs){
    return {
        type: '@INF/START_SET_INFORM'
    }
}

export function getInform(Inform){
    return(dispatch, getState) =>{
        dispatch(startSetInform);
        var AllInforms = getState().inform.informs;
        // Todo later
        var idx = AllInforms.indexOf(Inform);

        if(idx > -1){
            AllInforms.splice(idx, 1);
            AllInforms.push(Inform);
        } else {
            AllInforms.push(Inform);
        }
        dispatch(endSetInform(AllInforms));
    }
}
