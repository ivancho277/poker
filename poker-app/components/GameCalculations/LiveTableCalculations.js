const { findTag,
  findManyTags,
  calculateTotalStats,
  calculateStatsByTag,
  calculateByPosition,
  getPercentages,
  includesAllTags,
  calcTotalsPerPosition,
  calcTotalsPerAction,
  calcPercentByPosition,
  calcCurrentGamePercentages,
  isEmpty
} = require('../statscalculation.js');

/**
 * This file will calculate our necessary percentage data for display while tracking a game.
 */
//================================================================
/**
 * helper functions
 */
//NOTE: need to define where this function will be used. and in what component. So I know exactly what data it will be recieving. 


//NOTE: :This will filter the actions of the current live game into an array of actions. Rather than just pulling the array from storage, bc It may change live and we want to display whats current
filterActionsListFromLiveGame = (liveGame) => {
    let actions = [];
    liveGame.actions.forEach((action) => {
      actions.push(action.actionName);
    })
//TODO: am I even using this anywhere? 


    
    return this.props.gameState.data.actions;

  }
















//================================================================
/**
 * Export functions under
 */

 /**
  * description: function puts together a matrix or array of data for the display table.
  */
const getLiveGameActionList = (livegame) => {


  
}


const currentGamePercentage = ( livegame ) => {
  

  return livegame.actions;
}


const historicPercentage = ( livegame ) => {

}

const historicPercentageAtPosition = ( livegame ) => {


}



module.exports = {
    getLiveGameActionList: getLiveGameActionList,
    currentGamePercentage: currentGamePercentage,
    historicPercentage: historicPercentage,
    historicPercentageAtPosition: historicPercentageAtPosition


}