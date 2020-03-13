
const initSearchState = {
    inputValue: ''
}

export function searchPage (state = initSearchState, action){
    switch (action.type) {
        case '@SEARCH_PAGE/INPUT':
            return {
                ...state,
                inputValue: action.inputValue
            };
        default:
            return state;
    }
};
