
/**
 * 
 * 
 * All Game Actions
 * 
 */
import React, { Component, Children, useState } from 'react';
import { VERSION } from '../constants/version';
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
import * as Calculate from '../components/GameCalculations/calculateStats.js';
import * as APIConnect from './StorageInterface.js';
//import * as initialState  from './InitState.js'


defaults.mutator = (currentState, producer) => produce(currentState, producer);

//NOTE: this is middleware.
// const logger = storeState => next => action => {
//     console.log('Updating(gamesObj)..: ', storeState.getState());
//     next(action);
//     console.log("action: ", action.toString());
//     console.log("result!!: ", storeState.getState());

//     //console.log('UPDATED>> :', storeState.getState());
// }


// defaults.middlewares.add(logger);
// defaults.middlwares.add(makeLiveGame);



export const initialState = {
    data: {
        loading: false,
        allGames: null,
        savedGames: null,
        currentGame: null,
        allTags: null,
        actions: null,
    },
    calculatedData: {
        loading: false,
        totals: null,
        positionTotals: null,
        positionCount: null,
    },
    allGamesArray: [],
    gamesObj: null,
    liveGame: null,
    loading: false,
    liveGameLoading: false,
    foundGamesArray: [],
    thereIsSavedData: true, 
    error: null,
    MAX_POSITION: 8,
    MIN_POSITION: 0,
    currentTime: new Date(),
    previousTime: new Date(),
    testModeOn: false,
    testNewSecureStore: [],
};

//TODO: 7.17.2020 finish adding this method and then the acions for it. //TOP PRIORITY //NOTE: When should this happen?? Maybe we get called in the add tag function?? Seems like the best place!
export const searchGamesForLiveTags = () => ({ getState, setState }) => {
    const { liveGame, allGamesArray } = getState();
    console.log("foundGaMes in LIVELOVE!", liveGame.tags)
    // let found = [];
    if (typeof liveGame.tags === 'object') {
        let found = Calculate.searchByManyTags(liveGame.tags, allGamesArray);
        console.log("foundGaMes in Store:", found);
        setState(draft => {
            draft.foundGamesArray = found;
        })
    }
}

export const setSecureState = data => ({ getState, setState }) => {
    console.log('data', data)
    //debugger;
    setState(draft => {
        draft.testNewSecureStore = data;
    })
}
export const saveSecureState = (dataToAdd) => async ({ getState, setState, dispatch }) => {
    const { testNewSecureStore } = getState();
    console.log("log me", testNewSecureStore)
    let updatedData = testNewSecureStore.concat(dataToAdd);
    await storage.setData(updatedData).then(() => {
        console.log('updateddddddd', updatedData);
        dispatch(setSecureState(updatedData));
    });
}


export const laodSecure = () => async ({ dispatch }) => {
    let data = await APIConnect.fetchSecureState().then(res => {
        dispatch(setSecureState(res));
        console.log('test is loaded', res)
        return res;
    })
    return data;


}

export const removeTestData = () => {
    storage.removeTestData();
}


export const setCurrentTime = () => ({ setState }) => {
    setState(draft => {
        draft.currentTime = new Date();
    })
}

export const setDataLoading = () => ({ setState }) => {
    setState(draft => {
        draft.data.loading = true
        // draft.loading = true;
    })
};

export const setCalculatedDataLoading = () => ({ setState }) => {
    setState(draft => {
        draft.calculatedData.loading = true;
    })
}

export const setLiveGameLoading = () => ({ setState }) => {
    setState(draft => {
        draft.liveGameLoading = true;
    })
}

export const endLiveLoading = () => ({ setState }) => {
    setState(draft => {
        draft.liveGameLoading = false;
    })
}

export const endDataLoading = () => ({ setState }) => {
    setState(draft => {
        draft.data.loading = false; 
    })
}

export const setData = data => ({ setState }) => {
    setState(draft => {
        draft.data = data;
        draft.error = false;
        draft.allGamesArray = Utils.isEmpty(data.savedGames) ? [] : (data.savedGames);
        draft.gamesObj = data.savedGames;
        draft.data.loading = false;
    })
};


// NOTE: 6/11/2020 - this is what I have added may need to change a bit.
// TODO: 6/11/2020 - working on this bad Boy
export const setCurrentORNewLiveGame = () => ({ setState, getState, dispatch }) => {
    const { calculatedData } = getState();
    const { actions, currentGame } = getState().data
    console.log("THIS IS WHAT CURGAME I AM IF", currentGame)
    if (currentGame) {
        console.log("Seting Current: ", currentGame.liveGameData);
        console.log("Curr Calc::::", currentGame.calcData);
        //NOTE:Set State here, liveGame and Calculated data...
        dispatch(setCurrentGameToLive());
        dispatch(firstMoveMade());
    } else {
        console.log("No Current Game Present");
        dispatch(setNewLiveGame(actions));
        //dispatch(firstMoveMade());

    }
}

export const setCurrentGameToLive = () => ({ setState, getState }) => {
    const { currentGame } = getState().data;
    console.log("this here currGame::::::", currentGame.liveGameData);
    console.log("this here currGameCalc::::::", currentGame.calcData);
    if (currentGame) {
        setState(draft => {
            draft.liveGame = currentGame.liveGameData;
            draft.calculatedData.positionCount = currentGame.calcData.positionCount;
        })
    } else {
        console.error("I Messed up error, Something I did got you to this point where you shouldn't have got to, now shits all fucked up.")
    }

}

// const setLiveGame = () => ({setState, getState}) => {

// }

export const setNewLiveGame = actions => ({ getState, setState, dispatch }) => {
    const newGame = createGame(actions);
    // console.log('LOOOK AT MY GAME BITCH:::::::', currentGame);
    setState(draft => {
        draft.liveGame = newGame.getGameData()
    })
    dispatch(endLiveLoading());

};

export const setError = msg => ({ setState }) => {
    setState(draft => {
        //dispatch(setData(loadedData));
        draft.error = 'Error with loading';
    });
}

/**
 * * Storage Action
 * @param {String} tag - a new tag to add to liveGame 
 */
export const addNewTag = tag => ({ getState, setState }) => {
    const { liveGame, } = getState();
    if (isValidTag(tag, liveGame.tags)) {
        // let updatedtags = allTags.concat(tag);
        setState(draft => {
            draft.liveGame.tags = liveGame.tags.concat(tag);
        })
    }
}


export const removeAllTags = () => ({ setState }) => {
    storage.removeTags();
    setState(draft => {
        draft.data.tags = [];
    })
}

export const addToAllTags = tag => ({ getState, setState }) => {
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

export const removeTag = tagtoremove => ({ getState, setState }) => {
    const { data } = getState();
    const newTags = data.tags.filter(tag => { return tagtoremove != tag })
    setState(draft => {
        draft.data.tags = newTags;
    });
    storage.saveTags(newTags);

}

export const addNewAction = action => ({ getState, setState }) => {
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

export const removeAction = action => ({ getState, setState }) => {
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

export const retrieveGamesNew = () => async ({ setState }) => {
    const savedGames = await storage.getAllNewGames();
    return savedGames;
}


export const resetActions = () => ({ setState }) => {
    storage.resetActions();
}

export const deleteAllSavedData = () => () => {
    storage.deleteAllNewGames();
    storage.deleteTotals();
}
// const createNewActionInstances = actions => {
//     let gameActions = actions.map(action => { return new Action(action) })
//     return new Game(gameActions);
// };

export const reInstanceCurrentGame = currentGame => {
    let actions = currentGame.actions.map(action => { return new Action(action.actionName, action.count, action.countPerPosition) })
    return new Game(actions, currentGame.tags, currentGame.position, currentGame.version, currentGame.date);
}

export const createGame = actions => {
    let gameActions = actions.map(action => { return new Action(action) })
    return new Game(gameActions);
};

export const updateTotalsWithLiveGame = liveGame => {
    storage.updateTotals(liveGame);
    console.log("Updated broski");
};



export const SaveAllGames = () => ({ setState, getState }) => {
    //*this Game instance might actually come from contect state.
    const { liveGame, allGamesArray } = getState();
    const { positionCount } = getState().calculatedData;
    //const GameToSave = new Game(this.props.currentActions, this.props.tags, this.props.position, "1.0.5", new Date())
    updateTotalsWithLiveGame(liveGame);
    storage.setPositionCount(positionCount);
    console.log('LOOK AT ME NOW!!! :::', positionCount);
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
    //console.log("LIST: ", updatedGamesList);
    //console.log("STATE: ", getState().data.savedGames);
    storage.saveAllNewGames(updatedGamesList);

    //storage.saveData({ games: updatedGamesList, currentVersion: VERSION })
    // this.props.updateGames({ games: updatedGamesList, currentVersion: '1.0.5' })

}


export const CurrentGameSave = () => ({ setState, getState }) => {
    const date = new Date();
    //const currentgame = new Game(game.currentActions, game.tags, game.position, "1.0.5", date);
    const currentgame = getState().liveGame;
    const calcData = getState().calculatedData;
    const currentGameObj = {
        liveGameData: currentgame,
        date: date.toDateString(),
        time: date.getTime(),
        calcData: calcData,
    }
    console.log("What am I saving?", currentGameObj);
    storage.saveCurrentGame(currentGameObj);
    //this.props.context.modifiers.updateCurrentGame(gamesObj)
}

export const removeCurrentGame = () => ({ setState }) => {
    storage.removeCurrentGame();
}


/**
 * 
 * @param {Number} index - index of clicked action in LiveGame.actions[]
 * - will increment state of clicked action, as well as state of liveGame position.
 */
export const incrementLiveAction = (index) => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.actions[index].count = liveGame.actions[index].count + 1;
        draft.liveGame.actions[index].countPerPosition[liveGame.position] = liveGame.actions[index].countPerPosition[liveGame.position] + 1;
        // draft.liveGame.position = liveGame.position + 1 <= MAX_POSITION ? ++liveGame.position : MIN_POSITION;
    })

    setCurrentTime();
}

export const incrementPosition = () => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.position = liveGame.position + 1 <= MAX_POSITION ? ++liveGame.position : MIN_POSITION;
    })
}

export const updatePosition = (newPosition) => ({ setState, getState }) => {
    const { liveGame, MIN_POSITION, MAX_POSITION } = getState();
    setState(draft => {
        draft.liveGame.position = newPosition;
    })
}

/**
 *
 *
 * @param {Object} totalsObj
 */
export const setCalculatedData = (totalsObj) => ({ setState, getState }) => {
    setState(draft => {
        draft.calculatedData.totals = totalsObj.totals;
        draft.calculatedData.positionTotals = totalsObj.positionTotals;
        draft.calculatedData.positionCount = totalsObj.positionCount;
        draft.calculatedData.loading = false;
    });
}



//TODO: Since We are updating the local positionCount as we play, and only save to storage when we save and end, then when we load a currentgame we need to load that pCount, also when we end a game and don't save we should do another load from Storage to set the totals back to what they were 
/**
 *
 * * 
 * @param {number} position
 */
export const incrementPositionCount = (position) => ({ getState, setState }) => {
    const { positionCount } = getState().calculatedData;
    console.log("what is happen: ", position)
    setState(draft => {
        draft.calculatedData.positionCount[position] += 1;
    })
    console.log('POSITION-COUNT: position passed: ', position);
}

//TODO: 8.4.2020 technically a fetch will put in copy in fetch file
export const loadPositionCount = async () => {
    const pCount = await storage.getPositionCount().then((res => {
        if (res) {
            return JSON.parse(res);
        } else {
            alert('this really should not happen, call the developer and complain if it does....');
            return null;
        }
    }));
    return pCount;
}


export const setPositionCount = (pCount) => ({ setState }) => {
    setState(draft => {
        draft.calculatedData.positionCount = pCount
    });
}

export const reloadandSetPositionCount = async () => {
    await loadPositionCount().then(res => {
        if (res) {
            console.log('Did i make it here?')
            setPositionCount(res);
            return res;
        } else {
            return null;
        }
    })
}

export const firstMoveMade = () => ({ setState }) => {
    setState(draft => {
        draft.liveGame.firstMoveMade = true;
    })
}

export const resetFirstMoveNotMade = () => ({ setState }) => {
    setState(draft => {
        draft.liveGame.firstMoveMade = false;
    })
}


export const initializePositionCount = () => {
    storage.setInitialPositionCount();
}


export const initializeStorageTotals = (actionsArr) => {
    storage.setInitialTotals(actionsArr);
    console.log('SHOW ME IM HERE!');
}

export const initializeAllCalculatedData = (actionsArr) => {
    initializePositionCount();
    initializeStorageTotals(actionsArr);

}

