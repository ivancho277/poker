import React, { useState, useContext, Component } from "react";
//const storage = require('../components/AsyncStorageController.js')
const calculation = require("../components/statscalculation.js");
const {
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
  firstTimeLauching
} = require("../components/AsyncStorageController.js");
const {
  isValidTag,
  validActionAdd,
  validActionRemove
} = require("../utils/validators.js");
export const MyContext = React.createContext();

export class GlobalState extends Component {
  state = {
    position: 0,
    totalsByPosition: {},
    totals: {},
    gamesObj: {},
    gamesArray: [],
    allTags: [],
    totalGames: 0,
    actions: [],
    currentGame: {}
  };
  componentDidMount() {
    // storage.removeData()
    this.getDataFromStorage().then(res => {
      console.log("global state populated");
    });
    
    
    
  }

  async getDataFromStorage() {
    await this.getAllGames();
    await this.getActions();
    await this.getTags();
    await this.getCurrentGame();
  }

  getTags = async () => {
    await retrieveTags()
      .then(res => {
        if (res != undefined && res != null) {
          this.setState({
            allTags: JSON.parse(res)
          });
        }
      })
      .catch(err => {
        console.log("NO TAGS IN STORAGE");
      });

  };

  getActions = async () => {
    await retrieveActions()
      .then(res => {
        this.setState({
          actions: JSON.parse(res)
        });
      })
      .catch(err => {
        alert("actions!");
      });
  };

  getCurrentGame = async () => {
    await retrieveCurrentGame().then(res => {
      if (res) {
        return JSON.parse(res);
      } else return res;
    });
    
  };

  getAllGames = async () => {
    await retrieveData()
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
            loading: false,
            totals: temp,
            gamesArray: allGamesArray,
            totalGames: allGamesArray.length
          });
          console.log("THIS IS ASYNC");
          console.log(pastGames);
          console.log(this.state.gamesObj);
        }
      })
      .catch(error => {
        console.log("HOME SCREEN ERROR");
        resetActions();
        throw error;
      });
  };

  //TODO: create a function to update global actions, remove access to actions storage elsewhere, use validators
  updateActions = action => { };
  //TODO: finish writing this funtion, use validators
  updateTags = tag => { };

  updateGames(newGamesObj) {
    this.setState({
      gamesObj: newGamesObj,
      gamesArray: newGamesObj.games
    });
  }

  //TODO: handle all storage control in context, after you finish these funtions implement them in settings screen
  resetActions = () => {
    resetActions();
    this.getActions();
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
    }
  }

  addAction(action) {
    if (validActionAdd(action, this.state.actions)) {
      let updatedActions = this.state.actions.concat(action);
      this.setState({
        actions: updatedActions
      });
      saveActions(updatedActions);
    }
    
  }

  removeAction = (action) => {
    if (validActionRemove(action, this.state.actions)) {
      let updatedActions = this.state.actions.filter((Oaction) => Oaction != action)
      this.setState({ actions: updatedActions });
      saveActions(updatedActions);
    } else {
      alert('Can not remove base action, or action doesnt exsist')
    }

  };

  componentDidUpdate() {
    //checks to see if any new tags are added to our list of overall tags, and updates state if so.
    // retrieveTags().then(res => {
    //   if (res != undefined && res != null) {
    //     if (this.state.allTags.length >= 1) {
    //       //debugger;
    //       if (this.state.allTags.length !== JSON.parse(res).length) {
    //         this.setState({
    //           allTags: JSON.parse(res)
    //         });
    //       }
    //     }
    //   }
    // });
    // storage.retrieveData().then((res) => {
    //     //console.log(JSON.parse(res));
    //     //debugger;
    //     if (res != undefined) {
    //         let pastGames = JSON.parse(res)
    //         console.log("SYNCC ", pastGames)
    //         //let temp = calculation.calculateByPosition(pastGames)
    //         let allGamesArray = [];
    //         if (pastGames.games) {
    //             pastGames.games.forEach(game => {
    //                 allGamesArray.push(game)
    //             })
    //         }
    //         debugger;
    // if (allGamesArray.length !== this.state.totalGames) {
    //    this.getDataFromStorage().then((res) => {
    //        console.log('Update global storage')
    //    })
    // }
    // }
  }
  logTotalsByPosition = () => {
    console.log(calculation.calculateByPosition(this.state.gamesObj));
    return calculation.calculateByPosition(this.state.gamesObj);
  };

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

  getGames() {
    return this.state.gamesObj;

  }

  getGamesArray() {
    return this.state.gamesArray;

  }

  //TODO: remember to add new funtions to context provider
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          incrementPosition: () => this.incrementPosition(),
          setPosition: position => this.setPosition(position),
          remount: () => this.componentDidMount(),

          updateGames: gamesObj => {
            this.updateGames(gamesObj);
          },
          getGames: () => this.getGames(),
          getGamesArray: () => this.getGamesArray(),
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
