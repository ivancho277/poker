import React, { Component, Children, useState } from 'react';
import { VERSION } from '../constants/version';
import {
    createStore,
    createContainer,
    createSubscriber,
    createHook,
    defaults
} from 'react-sweet-state';
import { createSelector } from 'reselect'
import { produce } from 'immer';
import { StorageAPI as storage } from '../components/storageAPI/AsyncStorageController';
import { Game, Action } from '../components/gameObjects';
import * as Calculate from '../components/GameCalculations/calculateStats.js';
import { actions } from './actions.js';
import { initialState } from './actionHelpers.js';
// //import * as selectors from './selectors';


//defaults.mutator = (currentState, producer) => produce(currentState, producer);

//NOTE: this is middleware.
const logger = storeState => next => action => {
    console.log('Updating(gamesObj)..: ', storeState.getState());
    next(action);
    //console.log("action: ", action.toString());
    //console.log("result!!: ", storeState.getState());
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
const GamesByTags = (state, props) => ({ foundGamesArray: Calculate.searchByManyTags(state.liveGame.tags, allGamesArray) })

const GetLiveTags = createSelector(
    state => state.liveGame,
)

export const TagsSubscriber = createSubscriber(Store, {
    selector: GetLiveTags
})

export const TagsComponent = props => (
    <TagsSubscriber>
        ...props
    </TagsSubscriber>
)

const GetGamesByTag = createSelector(
    state => state.data.liveGame.tags,
    state => state.allGamesArray,
    state => state.foundGamesArray,
    (foundGamesArray) => ({ foundGamesArray: GamesByTags() })
)

export const FoundGamesSubscriber = createSubscriber(Store, {
    selector: GetGamesByTag,
})

export const FoundGames = ({ foundGamesArray }, props) => (
    <FoundGamesSubscriber>
        {({ foundGamesArray }) =>  <View> ...props </View> }
    </FoundGamesSubscriber>
)

//TODO: Selectors test

export const UseGameStore = createHook(Store);




