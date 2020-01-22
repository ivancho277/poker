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
import { GameProvider, MyContext, MyDispatch } from './contextProvider'


//const MyContext = React.createContext('app');


/**
 * !for returning state and any calculations
 */

function useMyContext() {
  const state = useContext(MyContext);
  if (state === undefined) {
    throw new Error("Ut oh, where is my state?");
  }

  function logTotalsByPosition() {
    console.log(calculation.calculateByPosition(state.allGames));
    return calculation.calculateByPosition(state.allGames);
  };

  function logPercentageTotals() {
    return calculation.getPercentages(state.allGames);
  }

  function logTotals() {
    return calculation.objToArray(calculation.calculateTotalStats(state.allGames))
  }

  function logPercentByPosition() {
    return calculation.calcPercentByPosition(state.allGames)
  }





  return state;
}
/**
 * ! dispatch for wirting mutator methods to state
 */
function useMyDispatch() {
  const dispatch = useContext(MyDispatch);

  if (dispatch === undefined) {
    throw new Error("Ut oh, where is my dispatch?");
  }




  function incrementAtPosition() {

  }

  function addTag(tag) {

  }

  function addAction() {

  }

  function updateAllGames() {

  }

  function saveAllGames() {

  }

  function saveCurrentGame() {

  }

  return dispatch
}




function WithMyContext(Component) {
  return function WrappedComponent(props) {
    const myContext = useMyContext();
    return <Component {...props} value={myContext.state} />;
  }
}

function WithMyDispatch(Component) {
  return function WrappedComponent(props) {
    const MyDispatch = useMyDispatch();
    return <Component {...props} value={MyDispatch.dispatch} />;
  }
}

// function LoadContext(contextProvider) {
//   const [loading, setLoading] = useState(true);




// }



const useGameContext = () => {
  return [useMyContext(), useMyDispatch()]
}

export { useGameContext }


// function WithGlobalState(WrappedComponent) {
//   const [initialState, SetInitialState] = useState();

//   const [state, dispatch] = useState();

//   return class GlobalState extends Component {

//     //TODO: there's a better was to represent some things
//     state = {
//       position: 0,
//       totalsByPosition: {},
//       gamesObj: {},
//       gamesArray: [],
//       allTags: [],
//       actions: [],
//       actionStrings: [],
//       currentGame: {},
//       currentActions: null,
//       currentGameStats: null,
//       currentTags: []

//     };
//     componentDidMount() {
//       // storage.removeData()
//       this.getDataFromStorage().then(res => {
//         console.log("VVVVV");
//         console.log(res);
//         console.log("global state populated");
//       });



//     }
//     //TODO: thing about order here, what happens when?
//     async getDataFromStorage() {
//       console.log("==========")
//       await this.setAllGames().then(res => { console.log("SET ALL", res); });
//       await this.setActions().then(res => { console.log("SET ACTIONS", res) });
//       await this.setTags().then(res => { console.log("SET TAGS", res) });
//       await this.setCurrentGame().then(res => { console.log("SET CURRENT", res) });
//       console.log("==========")
//     }

//     setTags = async () => {
//       return await retrieveTags()
//         .then(res => {
//           if (res != undefined && res != null) {
//             this.setState({
//               allTags: JSON.parse(res)
//             });
//           }
//           return res
//         })
//         .catch(err => {
//           console.log("NO TAGS IN STORAGE");
//         })
//     };

//     setActions = async () => {
//       return await retrieveActions()
//         .then(res => {
//           let createdActions = JSON.parse(res).map(action => {
//             return new Action(action)
//           })
//           this.setState({
//             actionStrings: JSON.parse(res),
//             currentActions: createdActions
//           });
//           return res
//         })
//         .catch(err => {
//           alert("actions!");

//         });
//     };

//     setCurrentGame = async () => {
//       return await retrieveCurrentGame().then(res => {
//         if (res != null) {
//           let currentGame = JSON.parse(res);
//           let actionsObj = this.createActions(currentGame);
//           console.log("BUILT ACTIONS :", actionsObj);

//           this.setState({
//             currentGame: currentGame,
//             currentActions: actionsObj,
//             currentTags: currentGame.tags
//           })
//           alert('it in')
//           return currentGame
//         } else {
//           let currentActions = this.state.actionStrings.map((action) => {
//             return new Action(action);
//           })
//           this.setState({
//             currentGame: null,
//             currentActions: currentActions
//           })
//           return JSON.parse(res);
//         }
//       });
//     };




//     //TODO: thesen 2 methods might need some edge case checks.
//     createActions = (game) => {
//       let createdActions = game.actions.map(action => {
//         return new Action(action.actionName, action.count, action.countPerPosition)
//       })
//       return createdActions;
//     }

//     createGameStats = (actoins, tags) => {
//       let createGameStats = new GameStats(actions, tags);


//     }



//     setAllGames = async () => {
//       return await retrieveData()
//         .then(res => {
//           //console.log(JSON.parse(res));
//           //debugger;
//           if (res != undefined) {
//             let pastGames = JSON.parse(res);
//             console.log("SYNCC ", pastGames);
//             let temp = calculation.calculateByPosition(pastGames);
//             let allGamesArray = [];
//             if (pastGames.games) {
//               pastGames.games.forEach(game => {
//                 allGamesArray.push(game);
//               });
//             }

//             this.setState({
//               gamesObj: JSON.parse(res),
//               totals: temp,
//               gamesArray: allGamesArray,
//               totalGames: allGamesArray.length
//             });
//             console.log("THIS IS ASYNC");
//             console.log(pastGames);
//             console.log(this.state.gamesObj);
//           }
//           return res
//         })
//         .catch(error => {
//           console.log("HOME SCREEN ERROR");
//           resetActions();
//           throw error;
//         });
//     };

//     //TODO: create a function to update global actions, remove access to actions storage elsewhere, use validators
//     updateActions = action => { };
//     //TODO: finish writing this funtion, use validators
//     updateTags = tag => { };

//     updateGames = (newGamesObj) => {
//       this.setState({
//         gamesObj: newGamesObj,
//         gamesArray: newGamesObj.games
//       });
//       saveData(newGamesObj);
//     }

//     updateCurrentGame = (CurGame) => {
//       this.setState({ currentGame: CurGame });
//       saveCurrentGame(CurGame);
//     }

//     createNewStartingActions = () => {
//       return this.state.actionStrings.map((action) => {
//         return new Action(action);
//       })
//     }

//     deleteCurrentGame = () => {
//       this.setState({
//         currentGame: null,
//         currentActions: this.createNewStartingActions(),
//         currentTags: []
//       })

//       removeCurrentGame();
//       this.setCurrentGame();
//     }








//     //TODO: handle all storage control in context, after you finish these funtions implement them in settings screen
//     resetActions = () => {
//       resetActions();
//       this.setActions();
//       console.log("actions reset");

//     };

//     deleteAllTags = () => {
//       removeTags();
//       this.setState({
//         allTags: []
//       });
//       console.log("tags removed");
//     };

//     addTag(tag) {
//       if (isValidTag(tag, this.state.allTags)) {
//         let updatedTags = this.state.allTags.concat(tag);
//         this.setState(
//           {
//             allTags: updatedTags
//           },
//           () => {
//             saveTags(this.state.allTags);
//           }
//         );
//         return true;
//       } else {
//         return false;
//       }
//     };


//     removeTag = (tagtoremove) => {
//       const newTags = this.state.allTags.filter(tag => {
//         console.log("ARG:", tagtoremove);
//         console.log("filter: ", tag);
//         return tagtoremove != tag
//       })
//       console.log("NEW TAGS", newTags);

//       this.setState({ allTags: newTags }, () => {
//         saveTags(this.state.allTags);
//       });
//       console.log("NEW TAGS", newTags);


//     }

//     addAction(action) {
//       if (validActionAdd(action, this.state.actionsStrings)) {
//         let updatedActions = this.state.actionStrings.concat(action);
//         this.setState({
//           actionStrings: updatedActions
//         });
//         saveActions(updatedActions);
//         return true;
//       } else {
//         return false;
//       }

//     }

//     removeAction = (action) => {
//       if (validActionRemove(action, this.state.actionStrings)) {
//         let updatedActions = this.state.actionStrings.filter((Oaction) => Oaction != action)
//         this.setState({ actionStrings: updatedActions });
//         saveActions(updatedActions);
//       } else {
//         alert('Can not remove base action, or action doesnt exsist')
//         console.log("sup")
//       }
//     };

//     componentDidUpdate() {

//     }

//     logTotalsByPosition = () => {
//       console.log(calculation.calculateByPosition(this.state.gamesObj));
//       return calculation.calculateByPosition(this.state.gamesObj);
//     };

//     logPercentageTotals = () => {
//       return calculation.getPercentages(this.state.gamesObj);
//     }

//     logTotals = () => {
//       return calculation.objToArray(calculation.calculateTotalStats(this.state.gamesObj))
//     }

//     logPercentByPosition = () => {
//       return calculation.calcPercentByPosition(this.state.gamesObj)
//     }








//     incrementPosition() {
//       this.setState({
//         position: this.state.position + 1
//       });
//     }

//     setPosition(position) {
//       this.setState({
//         position: position
//       });
//     }

//     getPostion() {
//       return () => { return this.state.position };
//     }

//     getGames() {
//       return this.state.gamesObj;

//     }

//     getGamesArray() {
//       return this.state.gamesArray;

//     }

//     //TODO: remember to add new funtions to context provider
//     render() {
//       return (
//         <WrappedComponent
//           data={{
//             state: this.state,
//             stats: {
//               totals: () => this.logTotals(),
//               totalPercentages: () => this.logPercentageTotals(),
//               totalsByPosition: () => this.logTotalsByPosition(),
//               percentByPosition: () => this.logPercentByPosition()
//             },
//             modifiers: {
//               incrementPosition: () => this.incrementPosition(),
//               setPosition: position => this.setPosition(position),

//               remount: () => this.componentDidMount(),
//               updateGames: gamesObj => {
//                 this.updateGames(gamesObj);
//               },
//               updateCurrentGame: currgame => this.updateCurrentGame(currgame),
//               addTag: (tag) => this.addTag(tag),
//               addAction: (action) => this.addAction(action),
//               removeAction: (action) => this.removeAction(action),
//               removeTag: (tag) => this.removeTag(tag),
//               getGames: () => this.getGames(),
//               getGamesArray: () => this.getGamesArray(),
//               deleteAllTags: () => this.deleteAllTags(),
//               resetActions: () => this.resetActions(),
//               deleteCurrentGame: () => this.deleteCurrentGame()
//             }
//           }} {...prop}
//         />


//       );
//     }
//   }
// }


