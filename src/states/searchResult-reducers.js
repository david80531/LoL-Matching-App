const initSearchState = {
    inputValue: '',
    userId: 'nopasslook',
    championId: 1,
    championName:'Ezreal',
    championLevel: NaN,
    championTag:'Assassin',
    tier: 'DIAMOND',
    rank: 'V',
    winRate: 70
}
export function searchResult (state = initSearchState, action){
    switch (action.type) {
        case '@SEARCH_RESULT/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@SEARCH_RESULT/BEGIN_SEARCH':
            return {
                ...state,
                beginSearch: !state.beginSearch,
                inputValue: action.value
            };
        case '@SEARCH_RESULT/START_GET_INFO':
            return {
                 ...state,
                 userId: action.userId
            };
        case '@SEARCH_RESULT/END_GET_INFO':
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
         case　'@SEARCH_RESULT/RESET_USER':
            return {
                  ...initSearchState,
            }
        default:
            return state;
    }
};
