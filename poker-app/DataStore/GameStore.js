import React, { Component, Children, useState } from 'react';
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
import { StorageAPI as storage } from '../components/storageAPI/AsyncStorageController';
import { Game, Action } from '../components/gameObjects';
import {
    isValidTag,
    validActionAdd,
    validActionRemove
} from "../utils/validators.js";
import * as Utils from '../utils/objectOps';
const calculation = require("../components/statscalculation.js");


//import * as selectors from './selectors';


defaults.mutator = (currentState, producer) => produce(currentState, producer);

//TODO: this is middleware.
const logger = storeState => next => action => {
    console.log('Updating(gamesObj)..: ', storeState.getState());
    next(action);
    console.log("action: ", action.toString());
    console.log("result!!: ");
    //console.log('UPDATED>> :', storeState.getState());
}


defaults.middlewares.add(logger);
// defaults.middlwares.add(makeLiveGame);



const initialState = {
    data: {
        allGames: null,
        savedGames: null,
        currentGame: null,
        allTags: null,
        actions: null,
    },
    calculatedData: {
        loading: false,
        totals: null,
        positionTotals: null
    },
    allGamesArray: [],
    gamesObj: null,
    liveGame: null,
    loading: false,
    error: null,
    MAX_POSITION: 8,
    MIN_POSITION: 0,
    currentTime: new Date(),
    previousTime: new Date()
};

const setCurrentTime = () => ({ setState }) => {
    setState(draft => {
        draft.currentTime = new Date();
    })
}

const setLoading = () => ({ setState }) => {
    setState(draft => {
        draft.loading = true;
    })
};

const setTotalsLoading = () => ({ setState }) => {
    setState(draft => {
        draft.calculatedData.loading = true;
    })
}

const finishLoading = () => ({ setState }) => {
    setState(draft => {
        draft.loading = false;
    })
}

const setData = data => ({ setState }) => {
    setState(draft => {
        draft.data = data;
        draft.error = false;
        draft.allGamesArray = data.savedGames;
        draft.gamesObj = data.savedGames;
        draft.loading = false;

    })
};


const setLiveGame = actions => ({ setState }) => {
    const newGame = createGame(actions)
    setState(draft => {
        draft.liveGame = newGame.getGameData()
    })
};



const setError = msg => ({ setState }) => {
    setState(draft => {
        //dispatch(setData(loadedData));
        draft.error = 'Error with loading';
    });
}



/**
 * * Storage Action
 * @param {String} tag - a new tag to add to liveGame 
 */
const addNewTag = tag => ({ getState, setState }) => {
    const { liveGame, } = getState();
    if (isValidTag(tag, liveGame.tags)) {
        // let updatedtags = allTags.concat(tag);
        setState(draft => {
            draft.liveGame.tags = liveGame.tags.concat(tag);
        })
    }
}


const removeAllTags = () => ({ setState }) => {
    storage.removeTags();
    setState(draft => {
        draft.data.tags = [];
    })
}

const addToAllTags = tag => ({ getState, setState }) => {
    const { data } = getState();
    if (data.tags === null || data.tags === undefined) {
        if (isValidTag(tag, [])) {
            setState(draft => {
                draft.data.tags = [tag]
            })
            storage.saveTags([tag])
            return;
        }
    }
    if (isValidTag(tag, data.tags)) {
        let updatedtags = data.tags.concat(tag);
        setState(draft => {
            draft.data.tags = updatedtags;
        })
        storage.saveTags(updatedtags)
    }
}

const removeTag = tagtoremove => ({ getState, setState }) => {
    const { data } = getState();
    const newTags = data.tags.filter(tag => { return tagtoremove != tag })
    setState(draft => {
        draft.data.tags = newTags;
    });
    storage.saveTags(newTags);

}

const addNewAction = action => ({ getState, setState }) => {
    const { data, liveGame } = getState();
    if (validActionAdd(action, data.actions)) {
        let updatedActions = data.actions.concat(action);
        let updatedLiveGame = liveGame.actions.concat(new Action(action))
        console.log(data.actions);
        console.log(updatedActions);
        setState(draft => {
            draft.data.actions = updatedActions
            draft.liveGame.actions = updatedLiveGame
        })
        storage.saveActions(updatedActions);
    }

}

const removeAction = action => ({ getState, setState }) => {
    const { data } = getState();
    if (validActionRemove(action, data.actions)) {
        let updatedActions = data.actions.filter((Oaction) => Oaction != action)
        setState(draft => {
            draft.data.actions = updatedActions
        })
        storage.saveActions(updatedActions);
    } else {
        alert('Can not remove base action, or action doesnt exsist')
        console.log("sup"); ''
    }

}

const retrieveGamesNew = () => async ({ setState }) => {
    const savedGames = await storage.getAllNewGames();
    return savedGames;
}


const resetActions = () => ({ setState }) => {
    storage.resetActions();
}

const deleteAllSavedData = () => () => {
    storage.deleteAllNewGames();
    storage.deleteTotals();
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

// const incrementAction = actionName => {

// }


//TODO: reconfigure save all games to work from actions in store
const SaveAllGames = () => ({ setState, getState }) => {
    //*this Game instance might actually come from contect state.
    const { liveGame, allGamesArray } = getState()
    //const GameToSave = new Game(this.props.currentActions, this.props.tags, this.props.position, "1.0.5", new Date())
    const totals = liveGame.actions.map(action => {
        return { [action.actionName]: action.count }
    });
    // const gameStats = liveGame.getCurrentStats();
    //!!this may not work, not important now though just condition under.
    if (liveGame.tags.length === 0) {
        setState(draft => {
            draft.liveGame.tags = liveGame.tags.concat('default')
        })
    }


    const game = {
        game: {
            data: liveGame,
            totals: totals,
            savedDate: new Date().getUTCDate(),
            saveTime: new Date().getTime()
        }
    }
    console.log("AHAHAHAHAHAHAHAHAHAHAASDFLHKJASFDALS:DJ:L", game)


    let updatedGamesList;
    if (storage.isEmpty(getState().data.savedGames)) {
        updatedGamesList = [game]
    } else {
        updatedGamesList = allGamesArray.concat(game)
    }
    setState(draft => {
        draft.allGamesArray = updatedGamesList;
        draft.gamesObj = { games: updatedGamesList, currentVersion: VERSION }
    });
    console.log("LIST: ", updatedGamesList);
    console.log("STATE: ", getState().data.savedGames);
    storage.saveAllNewGames(updatedGamesList);

    //storage.saveData({ games: updatedGamesList, currentVersion: VERSION })
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
    try {
        const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? {} : JSON.parse(res) })
        const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? [] : JSON.parse(res) })
        const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? [] : JSON.parse(res) })
        const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
        const savedGamesResponse = await storage.getAllNewGames().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? {} : JSON.parse(res) })
        return { allGames: dataResponse, savedGames: savedGamesResponse, actions: actionsResponse, tags: tagsResponse, CurrentGame: CurrentGameResponse }
    } catch {
        console.log('error fetching');
        throw Error("this is a fetch error")
    }
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



/**
 * 
 * @param {Number} index - index of clicked action in LiveGame.actions[]
 * - will increment state of clicked action, as well as state of liveGame position.
 */
const incrementLiveAction = (index) => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.actions[index].count = liveGame.actions[index].count + 1;
        draft.liveGame.actions[index].countPerPosition[liveGame.position] = liveGame.actions[index].countPerPosition[liveGame.position] + 1;
        // draft.liveGame.position = liveGame.position + 1 <= MAX_POSITION ? ++liveGame.position : MIN_POSITION;
    })

    setCurrentTime();
}

const incrementPosition = () => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.position = liveGame.position + 1 <= MAX_POSITION ? ++liveGame.position : MIN_POSITION;
    })
}

const updatePosition = (newPosition) => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.position = newPosition;
    })
}

const loadTotalsFromStorage = async () => {
    const totals = await storage.getTotals().then(res => { return JSON.parse(res) !== null ? JSON.parse(res) : {} });
    const positionTotals = await storage.getTotalsByPosition().then(res => { return JSON.parse(res) !== null ? JSON.parse(res) : {} });
    return { totals: totals, positionTotals: positionTotals }
}


const setTotals = (totalsObj) => ({ setState, getState }) => {
    setState(draft => {
        draft.calculatedData.totals = totalsObj.totals;
        draft.calculatedData.positionTotals = totalsObj.positionTotals;
        draft.calculatedData.loading = false;
    })
}




const actions = {
    /**
     * !! LOOK AT THIS IF ITS STILL HERE
     *  TODO: we will need to add a check for if a current game exsists in storage.
     */
    load: () => async ({ getState, setState, dispatch }) => {
        if (getState().loading === true) return;
        dispatch(setLoading());
        const loadedData = await fetchData().then(response => { return response });
        //     console.log("load action: ", loadedData);
        dispatch(setLiveGame(loadedData.actions));
        dispatch(setData(loadedData));
        // console.log('loadedData: ', loadedData);
    },

    loadStorage: () => async ({ getState, dispatch }) => {
        if (getState().loading === true) return;
        dispatch(setLoading());
        const data = await fetchData().then(response => { return respone });
        dispatch(setData(data));
        return data;
    },

    getGames: () => async ({ dispatch }) => {
        return await retrieveGamesNew();

    },

    getGameTotals: () => ({ getState, setState }) => {
        const { liveGame } = getState();
        const totals = liveGame.actions.map(action => {
            return { [action.actionName]: action.count }
        });
        return totals;
    },

    resetLiveGame: () => ({ getState, setState, dispatch }) => {
        const { data } = getState();
        dispatch(setLiveGame(data.actions));
    },


    onActionClick: (clickedAction, index) => ({ getState, setState, dispatch }) => {
        dispatch(setCurrentTime());
        dispatch(incrementLiveAction(index));
        dispatch(incrementPosition());
    },



    updatePosition: (newPosition) => ({ getState, setState, dispatch }) => {
        dispatch(updatePosition(newPosition));
    },

    incrementPosition: () => ({ dispatch }) => {
        dispatch(incrementPosition());
    },


    updateGames: updateGames = () => ({ getState, setState, dispatch }) => {

    },

    saveAllGames: () => ({ getState, setState, dispatch }) => {
        dispatch(SaveAllGames());
    },

    saveCurrentGame: () => ({ getState, setState, dispatch }) => {
        dispatch(CurrentGameSave());
    },

    resetActions: () => ({ dispatch }) => {
        dispatch(resetActions());
    },

    addNewAction: (action) => ({ getState, dispatch }) => {
        dispatch(addNewAction(action));
    },

    removeAction: (action) => ({ dispatch }) => {
        dispatch(removeAction(action));
    },

    addTagToCurrentGame: (tag) => ({ dispatch }) => {
        dispatch(addNewTag(tag))
    },

    addTagToAll: (tag) => ({ dispatch }) => {
        dispatch(addToAllTags(tag))
    },

    removeTag: (tag) => ({ dispatch }) => {
        dispatch(removeTag(tag))
    },

    removeAllTags: () => ({ dispatch }) => {
        dispatch(removeAllTags());
    },

    removeAllData: () => ({ dispatch }) => {
        dispatch(deleteAllSavedData());
    },

    /**
     * *Will get our running totals from StorageAPI and set current state to them
     * ? not sure if I should just be pulling them directly from storage here and returning them, rather than initializing values in state
     */
    LoadOverallTotals: () => async ({ getState, setState, dispatch }) => {

    },

    // getBothTotals: () => async ({ getState, setState, dispatch }) => {
    //     const totals = await storage.getTotals(); 
    //     const positionTotals = await storage.getTotalsByPosition();
    //     const totalObj = {
    //         totals: JSON.parse(totals),
    //         positionTotals: JSON.parse(positionTotals)
    //     }
    //     setTimeout(() => {
    //         console.log('OBJECT: ', totalObj);
    //     }, 0);
    //     dispatch({totalObj})
    // },

    //TODO: Better place to check if games exsist before init totals.
    loadTotals: () => ({ dispatch, getState }) => {
        dispatch(setTotalsLoading());
        const { data } = getState();
        if (Utils.isEmpty(data.savedGames)) {
            initializeStorageTotals();
            loadTotalsFromStorage().then(res => {
                if (res) {
                    dispatch(setTotals(res));
                }
            })
            return;
        }
        loadTotalsFromStorage().then(res => {
            if (res) {
                dispatch(setTotals(res));
            }
        })

    },

    //!!WE BE RIGHTHUURRR
    updateTotalsWithCurrentGame: () => ({ getState, dispatch }) => {
        const { liveGame } = getState();
        storage.updateTotals(liveGame);

    },

    getPositionTotalsFromStorage: () => ({ dispatch }) => {

    }







}


const initializeStorageTotals = () => {
    storage.setInitialTotals();
}


export const Store = createStore({
    initialState,
    actions,
    name: "Global Store"
});


export const GameSubscriber = createSubscriber(Store);
export const GameContainer = createContainer(Store,
    {
        onInit: actions.load(),

    }
);

// export const GameSelectedSubscriber = createSubscriber(Store, {
//     selector: selectors.getSelected
// })

export const UseGameStore = createHook(Store);




