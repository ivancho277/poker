// import { createActions } from './contextProvider';

const LOADING_DATA = 'LOADING_DATA';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export const initialState = {
    allGames: null,
    allTags: [],
    actions: [],
    currentGame: null

}

const reducer = (state = initialState, { type, response } = {}) => {
    switch (type) {
        case LOADING_DATA:
            return { ...initialState, status: LOADING_DATA };
        case SUCCESS:
            return { ...state, status: SUCCESS, response };
        case ERROR:
            return { ...state, status: ERROR, response };
        default:
            return state;


    }
}

export default reducer;