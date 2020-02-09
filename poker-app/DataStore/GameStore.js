import React, { Component, Children } from 'react';
import { Game } from '../components/gameObjects';
import { VERSION } from '../constants/version';
import { GlobalState } from '../stateContext/GlobalState';
import {
    createStore,
    createContainer,
    createSubscriber,
    createHook,
    defaults
} from 'react-sweet-state';
import { produce } from 'immer';
import { AsyncStorageController as storage } from '../components/storageAPI/AsyncStorageController';
const calculation = require("../components/statscalculation.js");





//import * as selectors from './selectors';
// import { } from 'react-tracked';

defaults.mutator = (currentState, producer) => produce(currentState, producer);




const initialState = {
    data: {
        allGames: null,
        currentGame: null,
        allTags: null,
        actions: null
    },
    loading: false,
    error: null
};

const setLoading = () => ({ setState }) => {
    setState(draft => {
        draft.loading = true;
    })
};

const setData = data => ({ setState }) => {
    setState(draft => {
        draft.loading = false;
        draft.data = data;
        draft.error = false;
    })
};
//defaults.mutator = (currentState, producer) => produce(currentState, producer);

const setError = msg => ({ setState }) => {
    setState({ error: msg });
}



const fetchData = async () => {
    const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) })
    const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) })
    const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) })
    const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
    return { allGames: dataResponse, actions: actionsResponse, tags: tagsResponse, CurrentGame: CurrentGameResponse }
}

logTotalsByPosition = () => {
    console.log(calculation.calculateByPosition(this.state.gamesObj));
    return calculation.calculateByPosition(this.state.gamesObj);
};

logPercentageTotals = () => {
    return calculation.getPercentages(this.state.gamesObj);
}

logTotals = () => {
    return calculation.objToArray(calculation.calculateTotalStats(this.state.gamesObj))
}

logPercentByPosition = () => {
    return calculation.calcPercentByPosition(this.state.gamesObj)
}






const actions = {
    load: load = () => async ({ getState, setState, dispatch }) => {
        if (getState().loading === true) return;
        dispatch(setLoading());

        const data = await fetchData();
        console.log("load action: ", data);
        // setData({
        //     loading: false,
        //     data: data,
        //     error: false
        // })
        dispatch(setData({
            loading: false,
            data: data,
            error: false
        }))
    },

    createGameActions: createGameActions = () => ({ getState, setState, dispatch }) => {

    },

    createGameInstance: createGameInstance = () => ({ getState, setState, dispatch }) => {

    },

    createCurrentGame: createCurrentGame = () => ({ getState, setState, dispatch }) => {

    },


    updateGames: updateGames = () => ({ getState, setState, dispatch }) => {

    },

    saveAllGames: saveAllGames = () => ({ getState, setState, dispatch }) => {

    },

    saveCurrentGame: saveCurrentGame = () => ({ getState, setState, dispatch }) => {

    },

    

}


export const Store = createStore({
    initialState,
    actions,
    name: "Global Store"
});


export const GameSubscriber = createSubscriber(Store)
export const GameContainer = createContainer(Store,
    {
        onInit: actions.load,

    }
);

// export const GameSelectedSubscriber = createSubscriber(Store, {
//     selector: selectors.getSelected
// })

export const UseGameStore = createHook(Store);




