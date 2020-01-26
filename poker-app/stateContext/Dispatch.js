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
import { MyContext, GlobalState } from './GlobalState';
import { useImmer } from 'use-immer';
export const MyDispatch = React.createContext({});





export function Dispatch({ children }) {
    const { state, stats, modifiers } = useContext(MyContext);
    const initialState = useState(loadedState = { state, stats, modifiers })
    const [globalState, dispatch] = useImmer({...loadedState})
    //MyDispatch = useImmer({ ...state, ...stats, ...modifiers });


    return (
        <GlobalState>
            <MyDispatch.Provider value={[globalState, dispatch]}>
                {children}
            </MyDispatch.Provider>
        </GlobalState>
    )
}



export function useGlobalState() {
    const state = useContext(MyContext);
    if (state === undefined) {
        throw new Error("Ut oh, where is my state?");
    }








    return state;
}

export function useDispatch() {
    const dispatch = useContext(DispatchContext)


    if (dispatch === undefined) {
        throw new Error("Ut oh, where is my dispatch?");
    }


    return dispatch



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