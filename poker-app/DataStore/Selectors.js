import { createStore, createSubscriber, createHook } from 'react-sweet-state';
import * as Utils from '../utils/objectOps';
import * as Calculate from '../components/GameCalculations/calculateStats.js';
import {
    isValidTag,
    validActionAdd,
    validActionRemove
} from "../utils/validators.js";



export const getSelected = (state) => ({ sel: state.selected });

export const selectGamesByTags = state => {
    Calculate.searchByManyTags(state.liveGame.tags, state.allGamesArray)

}
