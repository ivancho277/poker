import React, { useState, useContext, Component } from "react";
//const storage = require('../components/AsyncStorageController.js')
const calculation = require("../components/statscalculation.js");
import {
    saveData,
    saveCurrentGame,
    retrieveCurrentGame,
    removeCurrentGame,
    retrieveData,
    removeData,
    saveTags,
    retrieveTags,
    removeTags,
    saveActions,
    retrieveActions,
    resetActions,
    firstTimeLauching,
    isEmpty
} from "../components/AsyncStorageController.js";
import {
    isValidTag,
    validActionAdd,
    validActionRemove
} from "../utils/validators.js";
import { GameStats, Action, Game } from '../components/gameObjects.js';
import { useImmer } from 'use-immer';

const MyContext = React.createContext('app');
const MyDispatch = React.createContext('app');


initialState = {
    allGames: null,
    currentGame: null,
    allTags: [],
    actions: []
};

async function getAllGames() {
    const allGames = await retrieveData().then(res => {
        return res;
    }).catch(err => {console.error(err)});
    return allGames;
}

async function getCurrentGame() {
    const currentGame = await retrieveCurrentGame().then(res => {
        return res;
    }).catch(err => {console.error(err)});
    return currentGame;
}

async function getAllTags() {
    const allTags = await retrieveTags().then(res => {
        return res;
    }).catch(err => {console.error(err)});
    return allTags;
}

async function getActions() {
    const allActions = await retrieveActions().then(res => {
        
    })
}







const GameProvider = ({ children }) => {
    const [state, dispatch] = useImmer({ ...initialState });
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        return () => {
            cleanup
        };
    }, [input])



    return (
        <MyContext.Provider value={state}>
            <MyDispatch.Provider value={dispatch}>
                {children}
            </MyDispatch.Provider>
        </MyContext.Provider>
    );
};


export { GameProvider, MyContext, MyDispatch }