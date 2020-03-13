import {AsyncStorage} from 'AsyncStorage';

initFormState = {
    informs: [],
    informNum: 0,
    setting: false
};

export function inform (state = initFormState, action){
    switch (action.type) {
        case '@INF/END_SET_INFORM':
            return{
                ...state,
                informs: action.Informs,
                setting: false,
                informNum: state.informNum + 1
            };
        case '@INF/START_SET_INFORM':
            return {
                ...state,
                setting: true
            };
        case '@INF/CLEAR_INFO_NUM':
            return {
                ...state,
                informNum: 0
            };
        case '@INF/CLEAR_INFO':
            return {
                ...state,
                informs:[]
            };
        default:
            return state;

    }
};
