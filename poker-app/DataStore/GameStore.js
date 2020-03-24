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
import { AsyncStorageController as storage } from '../components/storageAPI/AsyncStorageController';
import { Game, Action } from '../components/gameObjects';
import {
    isValidTag,
    validActionAdd,
    validActionRemove
} from "../utils/validators.js";
const calculation = require("../components/statscalculation.js");





//import * as selectors from './selectors';
// import { } from 'react-tracked';

defaults.mutator = (currentState, producer) => produce(currentState, producer);

//TODO: this is middleware.
const logger = storeState => next => action => {
    console.log('Updating(gamesObj)..: ', storeState.getState());
    next(action);
    console.log("action: ", action.toString());
    console.log("result!!: ");
    //console.log('UPDATED>> :', storeState.getState());
}


// const makeLiveGame = storeState => next => action => {
//     const { data } = storeState.getState();
//     if (data.actions) {
//         const newGame = data.actions;
//         console.log("LOOOK! :", newGame)
//     }
// }


defaults.middlewares.add(logger);
// defaults.middlwares.add(makeLiveGame);





const initialState = {
    data: {
        allGames: null,
        currentGame: null,
        allTags: null,
        actions: null
    },
    allGamesArray: null,
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

const setPreviousTimeToCurrent = () => ({ getState, setState }) => {
    const { currentTime } = getState();
    setState(draft => {
        draft.previousTime = currentTime;
    })
}

const setLoading = () => ({ setState }) => {
    setState(draft => {
        draft.loading = true;
    })
};

const finishLoading = () => ({ setState }) => {
    setState(draft => {
        draft.loading = false;
    })
}

const setData = data => ({ setState }) => {
    setState(draft => {
        draft.data = data;
        draft.error = false;
        draft.allGamesArray = data.allGames.games;
        draft.gamesObj = data.allGames;
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

const addNewTag = tag => ({ getState, setState }) => {
    const { liveGame,  } = getState();
    if (isValidTag(tag, liveGame.tags)) {
        // let updatedtags = allTags.concat(tag);
        setState(draft => {
            draft.liveGame.tags = liveGame.tags.concat(tag);
        })
    }
}

const addToAllTags = tag => ({ getState, setState }) => {
    const { liveGame, data } = getState();
    if (isValidTag(tag, data.tags)) {
        let updatedtags = data.tags.concat(tag);
        setState(draft => {
            draft.data.tags = updatedtags;
        })
        storage.saveTags(updatedtags)
    }
}

const removeTag = tag => ({ getState, setState }) => {

}

const addNewAction = action => ({ getState, setState }) => {
    const {data, liveGame} = getState();
    if(validActionAdd(action, data.actions)){
        let updatedActions =  data.actions.concat(action);
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

const removeAction = actions => ({ getState, setState }) => {

}

const resetActions = () => ({ setState }) => {
    storage.resetActions();


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
    try {
        const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) })
        const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) })
        const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) })
        const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
        return { allGames: dataResponse, actions: actionsResponse, tags: tagsResponse, CurrentGame: CurrentGameResponse }
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
    // if (newPosition < MAX_POSITION) {
    //     setState(draft => {
    //         draft.liveGame.position = newPosition;
    //     })
    // } else {
    //     setState(draft => {
    //         draft.liveGame.position = MIN_POSITION;
    //     })
    // }
}





const actions = {
    load: () => async ({ getState, setState, dispatch }) => {
        if (getState().loading === true) return;
        dispatch(setLoading());
        const loadedData = await fetchData().then(response => { return response });
        //     console.log("load action: ", loadedData);
        if (loadedData.currentGame !== null) {
            //game = reInstanceCurrentGame(loadedData.currentGame)
            dispatch(setLiveGame(loadedData.actions));
            //return;
        } else {
            //game = createGame(loadedData.actions)
            dispatch(setLiveGame(loadedData.actions));
            //return;
        }
        dispatch(setData(loadedData));
        console.log('loadedData: ', loadedData);
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

    saveAllGames: saveAllGames = () => ({ getState, setState, dispatch }) => {
        dispatch(SaveAllGames());
    },

    saveCurrentGame: saveCurrentGame = () => ({ getState, setState, dispatch }) => {
        dispatch(CurrentGameSave());
    },

    resetActions: () => ({ dispatch }) => {
        dispatch(resetActions());
    },

    addNewAction: (action) => ({ getState, dispatch }) => {
        dispatch(addNewAction(action));
    },

    resetActions: () => ({setState}) => {
        dispatch(storage.resetActions())
    },

    addTagToCurrentGame: (tag) => ({ dispatch }) => {
        dispatch(addNewTag(tag))
    },

    addTagToAll: (tag) => ({ dispatch }) => {
        dispatch(addToAllTags(tag))
    },

    removeTag: (tag) => ({ dispatch }) => {

    },

    removeAllTags: () => ({ dispatch }) => {

    },






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




