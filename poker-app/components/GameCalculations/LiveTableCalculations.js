/**
 * This file will calculate our necessary percentage data for display while tracking a game.
 */
//================================================================
/**
 * helper functions
 */
//NOTE: need to define where this function will be used. and in what component. So I know exactly what data it will be recieving. 

filterActionsListFromLiveGame = (liveGame) => {
    let actions = [];
    liveGame.actions.forEach((action) => {
      actions.push(action.actionName);
    })
    return this.props.gameState.data.actions;

  }
















//================================================================
/**
 * Export functions under
 */

const getLiveGameActionList = (game) => {


}


const currentGamePercentage = ( game ) => {

}


const historicPercentage = ( game ) => {

}

const historicPercentageAtPosition = ( game ) => {


}



module.exports = {
    getLiveGameActionList: getLiveGameActionList,
    currentGamePercentage: currentGamePercentage,
    historicPercentage: historicPercentage,
    historicPercentageAtPosition: historicPercentageAtPosition


}