import React, { useState, useContext, Component, useEffect, } from "react";
//const storage = require('../components/AsyncStorageController.js')
const calculation = require("../components/statscalculation.js");
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
import {
    isValidTag,
    validActionAdd,
    validActionRemove
} from "../utils/validators.js";
import { GameStats, Action, Game } from '../components/gameObjects.js';
import { useImmer } from 'use-immer';
// import { isLoaded } from "expo-font";
// import createActions from './createActions';
// import useAsyncReducer from './useAsyncReducer';
// import reducer, { initialState } from './reducer'

const MyContext = React.createContext('app');
const MyDispatch = React.createContext('app');


defaultState = {
    allGames: null,
    currentGame: null,
    allTags: [],
    actions: [],
    firstload: true
};

async function getAllGames() {
    const allGames = await retrieveData().then(res => {
        return res;
    }).catch(err => { console.error(err) });
    return allGames;
}

async function getCurrentGame() {
    const currentGame = await retrieveCurrentGame().then(res => {
        return res;
    }).catch(err => { console.error(err) });
    return currentGame;
}

async function getAllTags() {
    const allTags = await retrieveTags().then(res => {
        return res;
    }).catch(err => { console.error(err) });
    return allTags;
}

async function getActions() {
    const allActions = await retrieveActions().then(res => {
        return res;
    }).catch(err => console.error(err));
    return allActions;
}

async function setAllData() {
    const allgames = await getAllGames().then(res => { return JSON.parse(res) });
    const currentGame = await getCurrentGame().then(res => { return JSON.parse(res) });
    const allTags = await getAllTags().then(res => { return JSON.parse(res) });
    const allActions = await getActions().then((res => { return JSON.parse(res) }));

    return data = {
        gameObj: allgames,
        currentGame: currentGame,
        allTags: allTags,
        actions: allActions,
    }

}

// function createActions(dispatch) {
//     return {
//         LOADING_DATA: () => dispatch({type: 'LOADING_DATA'}),
//         SUCCESS: () => dispatch({type: 'SUCCESS', response}),
//         ERROR: () => dispatch({type: 'ERROR', response})
//     }
// }


// const GameProvider = ({ children }) => {
//     const [state, dispatch] = useAsyncReducer(reducer, initialState);
//     const actions = createActions(dispatch);



//     return (
//         <MyContext.Provider value={[state, actions]}>

//             {children}

//         </MyContext.Provider>
//     );
// };




const GameProvider = ({ children }) => {
    const [state, dispatch] = useImmer({ ...defaultState });
    const [loading, setLoading] = useState(false);
    const [initialState, setInitialState] = useState({});


    useEffect(() => {
        const populate = async () => {
            setLoading(true);
            const gamedata = await setAllData(res => {
                setAllData().then(res => {
                    console.log("this is loaded data: ", res);
                    setInitialState(res);
                    setLoading(false);
                })
            })

            dispatch(draft => {
                draft.allGames = initialState.gameObj;
                draft.allTags = initialState.allTags;
                draft.actions = initialState.actions;
                draft.currentGame = initialState.currentGame;
                draft.loading = loading;
            })

        }
        populate();
    }, [])



    return (
        <MyContext.Provider value={state}>
            <MyDispatch.Provider value={dispatch}>
                {children}
            </MyDispatch.Provider>
        </MyContext.Provider>
    );
};


export { GameProvider, MyContext, MyDispatch, }