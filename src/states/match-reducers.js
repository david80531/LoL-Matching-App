const initMatchState = {
    matchToggle: false,
    matches:[],
    loading: false
};

export function match(state = initMatchState, action) {
    switch(action.type){
        case '@MACTH/START_LOADING':
          return {
              ...state,
              loading: true
          }

        case '@MATCH/END_LOADING':
            return {
                ...state,
                loading: false
            }

        case '@MATCH/OPEN_MATCH':
            return {
                ...state,
                matchToggle: true
            }

        case '@MATCH/END_Get_MATCH':
            console.log('@MATCH/END_Get_MATCH');
            return {
                ...state,
                matches:action.matches            };
        default:
            return state;
    }
}
