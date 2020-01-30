import { useReducerAsync } from 'use-reducer-async';
import { createContainer } from 'react-tracked';
import { Game } from '../components/gameObjects';
import { VERSION } from '../constants/version';
import {
    saveData,
    saveCurrentGame,
    retrieveCurrentGame,
    removeCurrentGame,
    retrieveData,
    removeData,
    saveTags,
    retrieveTags,
    removeTags,
    saveActions,
    retrieveActions,
    resetActions,
    firstTimeLauching,
    isEmpty
} from "../components/AsyncStorageController.js";

const initialState = {
    allGames: {},
    GamesArray: [],
    allTags: [],
    allActions: [],
    currentGame: null,
    loading: false,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING_STATE":
            return {
                ...state,
                loading: true
            };
        case "FETCH_DATA":
            return {
                ...state,
                allGames: action.allGames,
                GamesArray: action.allGames.games,
                allTags: action.allTags,
                allActions: action.allActions,
                currentGame: action.currentGame === null ? new Game(action.allActions, [], 0, VERSION, new Date()) : new Game(action.currentGame.actionStrings, action.currentGame.tags, 0, action.currentGame.VERSION, action.currentGame.Date),
                loading: false
            };
        case "FAILED": {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        default: {
            throw new Error('unkown action type');
        }

    }
}



const asyncActionHandlers = {

    LOAD_DATA: dispatch = async action => {
        try {
            dispatch({ type: 'LOADING_STATE' });
            const data = {
                allGames: await retrieveData().then(res => { return JSON.parse(res) }),
                allTags: await retrieveTags().then(res => { return JSON.parse(res) }),
                allActions: await retrieveActions().then(res => { return JSON.parse(res) }),
                currentGame: await retrieveCurrentGame().then(res => { return JSON.parse(res) })
            }
            dispatch({ type: 'FETCH_DATA', allData: data });
        } catch (error) {
            dispatch({ type: 'FAILED', error });
        }
    }
}


const useValue = () => {
    useReducerAsync(reducer, initialState, asyncActionHandlers)
}

export const {
    Provider,
    useTrackedState,
    useUpdate: useDispatch,
} = createContainer(useValue);


