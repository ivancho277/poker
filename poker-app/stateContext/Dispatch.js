import React, { useState, useContext, Component, Children } from "react";
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
import { MyContext } from './GlobalState'
export const DispatchContext = React.createContext({});


export function DispatchProvider({ children }) {
    const [globalState, dispatch] = useContext(MyContext);


    return (
        <DispatchProvider value={[globalState, dispatch]}>
            {Children}
        </DispatchProvider>
    )



}








// export class Dispatch extends Component {
//     state = {
//         allGames: null,
//         currentGame: null,
//         allTags: null,
//         allActions: null,
//         initialLoad: true,
//     }











//     render(){
//         return(
//             <DispatchContext.Provider value={[]}>

//             </DispatchContext.Provider>
//         )
//     }
// }