//fetch functions to populate state of the Game Store.js
//Connection to API 

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

/**
 * *Fetching functions from storage!
 * 
 */

export /**
 * 
 *
 * @returns {Object} - Object with primary game data.
 */
const fetchData = async () => {
    try {
        // const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? {} : JSON.parse(res) })
        const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? storage.resetActions() : JSON.parse(res) })
        const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? [] : JSON.parse(res) })
        const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
        const savedGamesResponse = await storage.getAllNewGames().then(res => { return JSON.parse(res) === null || JSON.parse(res) === undefined ? {} : JSON.parse(res) })
        return { allGames: savedGamesResponse, savedGames: savedGamesResponse, actions: actionsResponse, tags: tagsResponse, currentGame: CurrentGameResponse }
    } catch {
        console.log('error fetching');
        throw Error("this is a fetch error")
    }
}

export const fetchTotalsFromStorage = async () => {
    const totals = await storage.getTotals().then(res => { return JSON.parse(res) !== null ? JSON.parse(res) : {} });
    const positionTotals = await storage.getTotalsByPosition().then(res => { return JSON.parse(res) !== null ? JSON.parse(res) : {} });
    const positionCount = await storage.getPositionCount().then(res => { return JSON.parse(res) !== null ? JSON.parse(res) : {} })
    console.log('POSITION COUNT: =====>', positionCount);
    return { totals: totals, positionTotals: positionTotals, positionCount: positionCount }
}

export const fetchCurrentGame = async () => {
    return await storage.retrieveCurrentGame().then(res => {
        if (res) {
            console.log("live:", JSON.parse(res).liveGameData);
            console.log("cancellced:", JSON.parse(res).calcData);
            // setState(draft => {
            //     draft.liveGame = JSON.parse(res).liveGameData;
            //     draft.calculatedData = JSON.parse(res).calcData;
            // })
        }
        return res;
    })
}

export const fetchSecureState = async () => {
    return await storage.getData().then(res => {
        if (res) {
            console.log("WE FUCKING FETCHIN:", JSON.parse(res));
            return JSON.parse(res);
        }
        else return null
    })
}


//NOTE: 8.4.2020 Copy
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







