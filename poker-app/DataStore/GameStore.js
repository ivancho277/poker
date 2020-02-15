import React, { Component, Children } from 'react';
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
import { Game, Action } from '../components/gameObjects'
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
    liveGame: null,
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

const setLiveGame = gameInstance => ({ setState }) => {
    setState(draft => {
        draft.liveGame = gameInstance
    })
}

const setError = msg => ({ setState }) => {
    setState(draft => {
        dispatch(setData(loadedData));
        draft.error = 'Error with loading';
    });
}

// const createNewActionInstances = actions => {
//     let gameActions = actions.map(action => { return new Action(action) })
//     return new Game(gameActions);
// };

const reInstanceCurrentGame = currentGame => {
    let actions = currentGame.actions.map(action => { return new Action(action.actionName, action.count, action.countPerPosition) })
    return new Game(actions, currentGame.tags, currentGame.position, currentGame.version, currentGame.date);
}

const createGame = actions => {
    let gameActions = actions.map(action => { return new Action(action) })
    return new Game(gameActions);
};

const incrementAction = actionName => {

}


//TODO: reconfigure save all games to work from actions in store
const SaveAllGames = () => ({ setState, getState }) => {
    //*this Game instance might actually come from contect state.
    const liveGame = getState().liveGame
    //const GameToSave = new Game(this.props.currentActions, this.props.tags, this.props.position, "1.0.5", new Date())
    const totals = liveGame.actions.map(action => {
        return { [action.actionName]: action.getTotalCount() }
    });
    const gameStats = liveGame.getCurrentStats();
    const tagsForCurrentGame = liveGame.tags.length === 0 ? liveGame.tags.concat('default') : liveGame.tags;
    const gamesObj = {
        gameRaw: liveGame,
        totals: totals,
        game: gameStats,
        tags: tagsForCurrentGame,
        version: liveGame.getVersion(),
        time: liveGame.date.toDateString(),
        date: liveGame.date.getTime()
    }
    const updatedGamesList = getState().allGamesArray.concat(gamesObj);
    setState(draft => {
        draft.allGamesArray = updatedGamesList;
        draft.gamesObj = { games: updatedGamesList, currentVersion: VERSION }
    });
    storage.saveData({ games: updatedGamesList, currentVersion: VERSION })
    // this.props.updateGames({ games: updatedGamesList, currentVersion: '1.0.5' })

}
//TODO:  reconfigure save current game to work from actions in store 
const CurrentGameSave = () => ({ setState, getState }) => {
    const date = new Date();
    //const currentgame = new Game(game.currentActions, game.tags, game.position, "1.0.5", date);
    const currentgame = getState().liveGame;
    const gamesObj = {
        rawGameData: currentgame,
        date: date.toDateString(),
        time: date.getTime(),
        tags: currentgame.getTags(),
        currentGame: currentgame.getCurrentStats(),
        actions: currentgame.getAllActions(),
        actionStrings: currentgame.getActionsAsList()
    }

    storage.saveCurrentGame(gamesObj);
    //this.props.context.modifiers.updateCurrentGame(gamesObj)

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

        const loadedData = await fetchData();
        console.log("load action: ", loadedData);
        // setData({
        //     loading: false,
        //     data: data,
        //     error: false
        // })
        dispatch(setData(loadedData));
        if (loadedData.currentGame) {
            const game = reInstanceCurrentGame(loadedData.currentGame)
            dispatch(setLiveGame(game))
            dispatch(setState(draft => {
                draft.allGamesArray = loadedData.allGames.games;
                draft.gamesObj = loadedData.allGames;

            }))
        } else {
            const newGame = createGame(loadedData.actions)
            dispatch(setLiveGame(newGame));
            dispatch(setState(draft => {
                draft.allGamesArray = loadedData.allGames.games;
                draft.gamesObj = loadedData.allGames;
            }))
        }
    },

    createGameActions: createGameActions = actionsArr => ({ getState, setState, dispatch }) => {

    },

    createNewGameInstance: createGameInstance = () => ({ getState, setState, dispatch }) => {

    },

    createCurrentGameInstance: createCurrentGame = () => ({ getState, setState, dispatch }) => {

    },


    updateGames: updateGames = () => ({ getState, setState, dispatch }) => {

    },

    saveAllGames: saveAllGames = () => ({ getState, setState, dispatch }) => {
        dispatch(SaveAllGames());
    },

    saveCurrentGame: saveCurrentGame = () => ({ getState, setState, dispatch }) => {
        dispatch(CurrentGameSave());
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




