
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
import * as Helpers from './actionHelpers.js';

const { initialState } = Helpers;


//TODO: 8.4.2020 Seperate from here on into another file, may need to keep some functions after the actions Object here too.

export const actions = {
    /**
     * !! This will be Original Load method
     *  TODO: we will need to add a check for if a current game exsists in storage.
     */
    load: () => async ({ getState, setState, dispatch }) => {
        const { setData, setDataLoading } = Helpers;
        const { fetchData } = APIConnect; 
        if (getState().data.loading === true) return;
        dispatch(setDataLoading());
        //dispatch(setLiveGameLoading());
        const loadedData = await fetchData().then(response => { return response });
        //     console.log("load action: ", loadedData);
        //dispatch(setNewLiveGame(loadedData.actions));
        dispatch(setData(loadedData));
        // console.log('loadedData: ', loadedData);
    },

    gameStart: () => ({ dispatch }) => {
        dispatch(Helpers.firstMoveMade())
    },

    loadTestFromStorage: () => async ({ dispatch }) => {
        dispatch(Helpers.laodSecure())

    },

    removeTestValue: () => ({ dispatch }) => {
        dispatch(Helpers.removeTestData());
    },

    saveTestValue: (value) => ({ getState, dispatch }) => {
        dispatch(Helpers.saveSecureState(value));
        console.log("GET THAT STATE: ", getState().testNewSecureStore);
    },

    //!!I dont believe this is being used at them moment anywhere, just the above action is our main loadData();
    loadData: () => async ({ getState, dispatch }) => {
        if (getState().data.loading === true) return;
        dispatch(Helpers.setDataLoading());
        const data = await APIConnect.fetchData().then(response => { return response });
        dispatch(Helpers.setData(data));
        return data;
    },


    loadCurrentGame: () => async ({ dispatch }) => {
        dispatch(APIConnect.fetchCurrentGame());

    },


    getGames: () => async ({ dispatch }) => {
        dispatch(Helpers.retrieveGamesNew());
    },

    getGameTotals: () => ({ getState, setState }) => {
        const { liveGame } = getState();
        const totals = liveGame.actions.map(action => {
            return { [action.actionName]: action.count }
        });
        return totals;
    },

    endLiveLoading: () => ({ dispatch }) => {
        dispatch(Helpers.endLiveLoading());
    },


    resetLiveGame: () => async ({ getState, setState, dispatch }) => {
        const { data } = getState();
        await Helpers.reloadandSetPositionCount().then(res => {
            dispatch(Helpers.removeCurrentGame())
            dispatch(Helpers.setNewLiveGame(data.actions));
            return res;
        })
    },


    onActionClick: (clickedAction, index) => ({ getState, setState, dispatch }) => {
        const { position } = getState().liveGame;
        dispatch(Helpers.setCurrentTime());
        dispatch(Helpers.incrementLiveAction(index));
        dispatch(Helpers.incrementPositionCount(position))
        dispatch(Helpers.incrementPosition());
        dispatch(Helpers.CurrentGameSave());

    },

    setCurrentORNewLiveGame: () => ({ dispatch }) => {
        dispatch(Helpers.setCurrentORNewLiveGame());
    },



    updatePosition: (newPosition) => ({ getState, setState, dispatch }) => {
        dispatch(Helpers.updatePosition(newPosition));
    },

    incrementPosition: () => ({ dispatch }) => {
        dispatch(Helpers.incrementPosition());
    },

    removeCurrentGameFromStorage: () => ({ dispatch }) => {
        dispatch(Helpers.removeCurrentGame());
    },


    updateGames: updateGames = () => ({ getState, setState, dispatch }) => {

    },

    saveAllGames: () => ({ getState, setState, dispatch }) => {
        dispatch(Helpers.SaveAllGames());
        dispatch(Helpers.removeCurrentGame());
    },

    saveCurrentGame: () => ({ getState, setState, dispatch }) => {
        dispatch(Helpers.CurrentGameSave());
    },

    resetActions: () => ({ dispatch }) => {
        dispatch(Helpers.resetActions());
    },

    addNewAction: (action) => ({ getState, dispatch }) => {
        dispatch(Helpers.addNewAction(action));
    },

    removeAction: (action) => ({ dispatch }) => {
        dispatch(Helpers.removeAction(action));
    },

    //CONCERN: I'm not sure that the state of tags will be updated by the time we search for games
    addTagToCurrentGame: (tag) => ({ dispatch, }) => {
        dispatch(Helpers.addNewTag(tag));
        dispatch(Helpers.searchGamesForLiveTags());
    },

    addTagToAll: (tag) => ({ dispatch }) => {
        dispatch(Helpers.addToAllTags(tag))
    },

    removeTag: (tag) => ({ dispatch }) => {
        dispatch(Helpers.removeTag(tag))
    },

    removeAllTags: () => ({ dispatch }) => {
        dispatch(Helpers.removeAllTags());
    },

    removeAllData: () => ({ dispatch }) => {
        dispatch(Helpers.deleteAllSavedData());
    },

    removeGamesDataOnly: () => ({ dispatch }) => {

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
    loadTotals: () => async ({ dispatch, getState, setState }) => {
        if (getState().calculatedData.loading == true) return true;
        dispatch(Helpers.setCalculatedDataLoading());
        const { data, loading } = getState();

        if (Utils.isEmpty(data.savedGames)) {
            Helpers.initializeAllCalculatedData(data.actions);
            await APIConnect.fetchTotalsFromStorage().then(res => {
                if (res) {
                    dispatch(Helpers.setCalculatedData(res));
                    setState(draft => {
                        draft.thereIsSavedData = false;
                    })
                    //alert('RESET');
                }
            })
            //alert('RESET');
            return 'totals_reset';
        } else {
            APIConnect.fetchTotalsFromStorage().then(res => {
                if (res) {
                    //alert("in fetch callback");
                    dispatch(Helpers.setCalculatedData(res));
                    setState(draft => {
                        draft.thereIsSavedData = true;
                    })
                }
                //alert('before return NO RESET!!!')
                return 'totals';
            })
        }
    },


    /**
     * This Action will Update Storage Running totals with what ever data is in Currently in liveGame 
     * *Not implemented anywhere in code, SaveAllGames is updating them only.
     */
    updateTotalsWithLiveGame: () => ({ getState, dispatch }) => {
        const { liveGame } = getState();
        storage.updateTotals(liveGame);
    },

    getPositionTotalsFromStorage: () => ({ dispatch }) => {

    },

    TestModeSwitch: () => ({ getState, setState }) => {
        const { testModeOn } = getState();
        setState(draft => {
            draft.testModeOn = !testModeOn;
        })
    }




}


// const savePositionCount = () => {

// }


// const initializeStorageTotals = (actionsArr) => {
//     storage.setInitialTotals(actionsArr);
//     console.log('SHOW ME IM HERE!');
// }

// const initializeAllCalculatedData = (actionsArr) => {
//     initializePositionCount();
//     initializeStorageTotals(actionsArr);

// }

// export const Store = createStore({
//     initialState,
//     actions,
//     name: "Global Store"
// });



// export const GameSubscriber = createSubscriber(Store);
// export const GameContainer = createContainer(Store,
//     {
//         onInit: actions.load(),

//     }
// );

// // export const GameSelectedSubscriber = createSubscriber(Store, {
// //     selector: selectors.getSelected
// // })

// export const UseGameStore = createHook(Store);











