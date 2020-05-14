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

export const MyContext = React.createContext('app');


export class GlobalState extends Component {

  //TODO: there's a better was to represent some things
  state = {
    position: 0,
    totalsByPosition: {},
    gamesObj: {},
    gamesArray: [],
    allTags: [],
    actions: [],
    actionStrings: [],
    currentGame: {},
    currentActions: null,
    currentGameStats: null,
    currentTags: [],
    game: null

  };
  componentDidMount() {
    // storage.removeData()
    this.getDataFromStorage().then(res => {
      console.log("VVVVV");
      //console.log(res);
      console.log("global state populated");
      
        const game = new Game(this.state.currentActions, this.state.currentTags, this.state.position, "1.0.5", new Date())
        
        console.log("the game=====: ", game);
      
    });



  }
  // thing about order here, what happens when?
  async getDataFromStorage() {
    console.log("==========")
    await this.setAllGames().then(res => { console.log("SET ALL"); });
    await this.setActions().then(res => { console.log("SET ACTIONS", ) });
    await this.setTags().then(res => { console.log("SET TAGS",) });
    await this.setCurrentGame().then(res => { console.log("SET CURRENT",) });
    console.log("==========")
  }

  setTags = async () => {
    return await retrieveTags()
      .then(res => {
        if (res != undefined && res != null) {
          this.setState({
            allTags: JSON.parse(res)
          });
        }
        return res
      })
      .catch(err => {
        console.log("NO TAGS IN STORAGE");
      })
  };

  setActions = async () => {
    return await retrieveActions()
      .then(res => {
        let createdActions = JSON.parse(res).map(action => {
          return new Action(action)
        })
        this.setState({
          actionStrings: JSON.parse(res),
          currentActions: createdActions
        });
        return res
      })
      .catch(err => {
        alert("actions!");

      });
  };

  setCurrentGame = async () => {
    return await retrieveCurrentGame().then(res => {
      if (res != null) {
        let currentGame = JSON.parse(res);
        let actionsList = this.createActions(currentGame);
        console.log("BUILT ACTIONS :", actionsList);
        this.state.currentGame.actions = actionsList;
        this.setState({
          currentGame: currentGame,
          currentActions: actionsList,
          currentTags: currentGame.tags
        })
        alert('it in')
        return currentGame
      } else {
        let currentActions = this.state.actionStrings.map((action) => {
          return new Action(action);
        })
        this.setState({
          currentGame: null,
          currentActions: currentActions
        })
        return JSON.parse(res);
      }
    });
  };

  


  createActions = (game) => {
    let createdActions = game.actions.map(action => {
      return new Action(action.actionName, action.count, action.countPerPosition)
    })
    return createdActions;
  }

  createGameStats = (actoins, tags) => {
    let createGameStats = new GameStats(actions, tags);


  }



  setAllGames = async () => {
    return await retrieveData()
      .then(res => {
        //console.log(JSON.parse(res));
        //debugger;
        if (res != undefined) {
          let pastGames = JSON.parse(res);
          console.log("SYNCC ", pastGames);
          let temp = calculation.calculateByPosition(pastGames);
          let allGamesArray = [];
          if (pastGames.games) {
            pastGames.games.forEach(game => {
              allGamesArray.push(game);
            });
          }

          this.setState({
            gamesObj: JSON.parse(res),
            totals: temp,
            gamesArray: allGamesArray,
            totalGames: allGamesArray.length
          });
         // console.log("THIS IS ASYNC");
          //console.log(pastGames);
          //console.log(this.state.gamesObj);
        }
        return res
      })
      .catch(error => {
        console.log("HOME SCREEN ERROR");
        resetActions();
        throw error;
      });
  };

  updateActions = action => { };
  //finish writing this funtion, use validators
  updateTags = tag => { };

  updateGames = (newGamesObj) => {
    this.setState({
      gamesObj: newGamesObj,
      gamesArray: newGamesObj.games
    });
    saveData(newGamesObj);
  }

  updateCurrentGame = (CurGame) => {
    this.setState({ currentGame: CurGame });
    saveCurrentGame(CurGame);
  }

  createNewStartingActions= () =>{
    return this.state.actionStrings.map((action) => {
      return new Action(action);
    })
  }

  deleteCurrentGame = () => {
    this.setState({
      currentGame: null,
      currentActions: this.createNewStartingActions(),
      currentTags: []
    })

    removeCurrentGame();
    this.setCurrentGame();
  }


 





  resetActions = () => {
    resetActions();
    this.setActions();
    console.log("actions reset");

  };

  deleteAllTags = () => {
    removeTags();
    this.setState({
      allTags: []
    });
    console.log("tags removed");
  };

  addTag(tag) {
    if (isValidTag(tag, this.state.allTags)) {
      let updatedTags = this.state.allTags.concat(tag);
      this.setState(
        {
          allTags: updatedTags
        },
        () => {
          saveTags(this.state.allTags);
        }
      );
      return true;
    } else {
      return false;
    }
  };


  removeTag = (tagtoremove) => {
      const newTags = this.state.allTags.filter(tag => {
        console.log("ARG:", tagtoremove);
        console.log("filter: ", tag);
        return tagtoremove != tag
      })
      console.log("NEW TAGS", newTags);
      
      this.setState({allTags: newTags}, () =>{
        saveTags(this.state.allTags);
      } );
      console.log("NEW TAGS", newTags);
    
    
  }

  addAction = (action) => {
    if (validActionAdd(action, this.state.actionsStrings)) {
      let updatedActions = this.state.actionStrings.concat(action);
      this.setState({
        actionStrings: updatedActions
      });
      saveActions(updatedActions);
      return true;
    } else {
      return false;
    }

  }

  removeAction = (action) => {
    if (validActionRemove(action, this.state.actionStrings)) {
      let updatedActions = this.state.actionStrings.filter((Oaction) => Oaction != action)
      this.setState({ actionStrings: updatedActions });
      saveActions(updatedActions);
    } else {
      alert('Can not remove base action, or action doesnt exsist')
      console.log("sup")
      

    }

  };

  componentDidUpdate() {
   
  }




  

  logTotalsByPosition = () => {
    console.log(calculation.calculateByPosition(this.state.gamesObj));
    return calculation.calculateByPosition(this.state.gamesObj);
  };

  logPercentageTotals = () => {
    return calculation.getPercentages(this.state.gamesObj);
  }

  logTotals = () => {
    return calculation.objToArray(calculation.calculateTotalStats(this.state.gamesObj))
  }

  logPercentByPosition = () => {
    return calculation.calcPercentByPosition(this.state.gamesObj)
  }
  







  incrementPosition() {
    this.setState({
      position: this.state.position + 1
    });
  }

  setPosition(position) {
    this.setState({
      position: position
    });
  }

  getPostion(){
    return () => {return this.state.position};
  }

  getGames() {
    return this.state.gamesObj;

  }

  getGamesArray() {
    return this.state.gamesArray;

  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          stats: {
            totals: () => this.logTotals(),
            totalPercentages: () => this.logPercentageTotals(),
            totalsByPosition: () => this.logTotalsByPosition(),
            percentByPosition: () => this.logPercentByPosition()
          },
          modifiers: {
            incrementPosition: () => this.incrementPosition(),
            setPosition: position => this.setPosition(position),
            
            remount: () => this.componentDidMount(),
            updateGames: gamesObj => {
              this.updateGames(gamesObj);
            },
            updateCurrentGame: currgame => this.updateCurrentGame(currgame),
            addTag: (tag) => this.addTag(tag),
            addAction: (action) => this.addAction(action),
            removeAction: (action) => this.removeAction(action),
            removeTag: (tag) => this.removeTag(tag),
            getGames: () => this.getGames(),
            getGamesArray: () => this.getGamesArray(),
            deleteAllTags: () => this.deleteAllTags(),
            resetActions: () => this.resetActions(),
            deleteCurrentGame: () => this.deleteCurrentGame()
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
