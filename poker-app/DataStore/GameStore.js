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
import {actions} from './actions.js';
import {initialState} from './actionHelpers.js';
// //import * as selectors from './selectors';


//defaults.mutator = (currentState, producer) => produce(currentState, producer);

//NOTE: this is middleware.
const logger = storeState => next => action => {
    console.log('Updating(gamesObj)..: ', storeState.getState());
    next(action);
    console.log("action: ", action.toString());
    console.log("result!!: ", storeState.getState());
    //console.log('UPDATED>> :', storeState.getState());
}
defaults.middlewares.add(logger);
// // defaults.middlwares.add(makeLiveGame);

export const Store = createStore({
    initialState,
    actions,
    name: "Global Store"
});


export const GameSubscriber = createSubscriber(Store);
export const GameContainer = createContainer(Store);

// export const GameSelectedSubscriber = createSubscriber(Store, {
//     selector: selectors.getSelected
// })

export const UseGameStore = createHook(Store);




