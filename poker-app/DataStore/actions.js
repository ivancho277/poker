// import React, { Component, Children, useState } from 'react';
// import { VERSION } from '../constants/version';
// import { GlobalState } from '../stateContext/GlobalState';
// import {
//     createStore,
//     createContainer,
//     createSubscriber,
//     createHook,
//     defaults
// } from 'react-sweet-state';
// import { produce } from 'immer';
// import { AsyncStorageController as storage } from '../components/storageAPI/AsyncStorageController';
// import { Game, Action } from '../components/gameObjects';
// import {
//     isValidTag,
//     validActionAdd,
//     validActionRemove
// } from "../utils/validators.js";
// const calculation = require("../components/statscalculation.js");


// /**
//  * * Sets Sweet-States default mutator setState to be used with Immer
//  */
// defaults.mutator = (currentState, producer) => produce(currentState, producer);

// //TODO: this is middleware.
// const logger = storeState => next => action => {
//     console.log('Updating(gamesObj)..: ', storeState.getState());
//     next(action);
//     console.log("action: ", action.toString());
//     console.log("result!!: ");
//     //console.log('UPDATED>> :', storeState.getState());
// }

// /**
//  *  * Apply middleware function
//  */
// defaults.middlewares.add(logger);


// /** 
//  * * Initial state before data is loaded
//  */
// const initialState = {
//     data: {
//         allGames: null,
//         currentGame: null,
//         allTags: null,
//         actions: null
//     },
//     allGamesArray: null,
//     gamesObj: null,
//     liveGame: null,
//     loading: false,
//     error: null,
//     MAX_POSITION: 8,
//     MIN_POSITION: 0,
//     currentTime: new Date(),
//     previousTime: new Date()
// };

// /** 
//  * * action functions and helpers to remain private.
//  */
// const setCurrentTime = () => ({ setState }) => {
//     setState(draft => {
//         draft.currentTime = new Date();
//     })
// }

// const setPreviousTimeToCurrent = () => ({ getState, setState }) => {
//     const { currentTime } = getState();
//     setState(draft => {
//         draft.previousTime = currentTime;
//     })
// }

// const setLoading = () => ({ setState }) => {
//     setState(draft => {
//         draft.loading = true;
//     })
// };

// const finishLoading = () => ({ setState }) => {
//     setState(draft => {
//         draft.loading = false;
//     })
// }

// const setData = data => ({ setState }) => {
//     setState(draft => {
//         draft.data = data;
//         draft.error = false;
//         draft.allGamesArray = data.allGames.games;
//         draft.gamesObj = data.allGames;
//         draft.loading = false;

//     })
// };


// const setLiveGame = actions => ({ setState }) => {
//     const newGame = createGame(actions)
//     setState(draft => {
//         draft.liveGame = newGame.getGameData()
//     })
// };

// const setError = msg => ({ setState }) => {
//     setState(draft => {
//         //dispatch(setData(loadedData));
//         draft.error = 'Error with loading';
//     });
// }

// const addNewTag = tag => ({ getState, setState }) => {
//     const { liveGame, } = getState();
//     if (isValidTag(tag, liveGame.tags)) {
//         // let updatedtags = allTags.concat(tag);
//         setState(draft => {
//             draft.liveGame.tags = liveGame.tags.concat(tag);
//         })
//     }
// }

// const addToAllTags = tag => ({ getState, setState }) => {
//     const { liveGame, data } = getState();
//     if (isValidTag(tag, data.tags)) {
//         let updatedtags = data.tags.concat(tag);
//         setState(draft => {
//             draft.data.tags = updatedtags;
//         })
//         storage.saveTags(updatedtags)
//     }
// }

// const removeTag = tag => ({ getState, setState }) => {

// }

// const addNewAction = action => ({ getState, setState }) => {
//     const { data, liveGame } = getState();
//     if (validActionAdd(action, data.actions)) {
//         let updatedActions = data.actions.concat(action);
//         let updatedLiveGame = liveGame.actions.concat(new Action(action))
//         console.log(data.actions);
//         console.log(updatedActions);
//         setState(draft => {
//             draft.data.actions = updatedActions
//             draft.liveGame.actions = updatedLiveGame
//         })
//         storage.saveActions(updatedActions);
//     }

// }

// const removeAction = actions => ({ getState, setState }) => {

// }

// const resetActions = () => ({ setState }) => {
//     storage.resetActions();


// }

// // const createNewActionInstances = actions => {
// //     let gameActions = actions.map(action => { return new Action(action) })
// //     return new Game(gameActions);
// // };

// const reInstanceCurrentGame = currentGame => {
//     let actions = currentGame.actions.map(action => { return new Action(action.actionName, action.count, action.countPerPosition) })
//     return new Game(actions, currentGame.tags, currentGame.position, currentGame.version, currentGame.date);
// }

// const createGame = actions => {
//     let gameActions = actions.map(action => { return new Action(action) })
//     return new Game(gameActions);
// };





















/**
 * !!!!!!!! UNDER IS OLD
 */

// const setLoading = () => ({ setState }) => {
//     setState({ loading: true });
// };



// const setData = data => ({ setState }) => {
//     setState({
//         loading: false,
//         data: data,
//         error: false
//     });
// };
// //defaults.mutator = (currentState, producer) => produce(currentState, producer);

// const setError = msg => ({ setState }) => {
//     setState({ error: msg });
// }

// const fetchData = async () => {
//     const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) })
//     const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) })
//     const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) })
//     const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
//     return { allGames: dataResponse, actions: actionsResponse, tags: tagsResponse, CurrentGame: CurrentGameResponse }

// }






// export const load = () => async ({ getState, setState, dispatch }) => {
//     if (getState().loading === true) return;
//     dispatch(setLoading());

//         const data = await fetchData();
//         console.log("load action: ", data);
//         // setData({
//         //     loading: false,
//         //     data: data,
//         //     error: false
//         // })
//         dispatch(setData({
//             loading: false,
//             data: data,
//             error: false
//         }))


//     }










