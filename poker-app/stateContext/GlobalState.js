import React, { useState, useContext, Component } from 'react';
const storage = require('../components/AsyncStorageController.js')
const calculation = require('../components/statscalculation.js')
const { saveCurrentGame,
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
} = require('../components/AsyncStorageController.js')
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

    }
    componentDidMount() {
        // storage.removeData()
        this.getDataFromStorage().then((res) => {
            console.log('global state populated')
        })
    }

    async getDataFromStorage() {
        await this.getAllGames();
        await this.getActions();
        await this.getTags();
        await this.getCurrentGame();
    }

    getTags = async () => {
        await storage.retrieveTags().then(res => {
            if (res != undefined && res != null) {
                this.setState({ allTags: JSON.parse(res) })
            }
        }).catch(err => {
            console.log('NO TAGS IN STORAGE');
        })
    }

    getActions = async  () => {
        await storage.retrieveActions().then((res) => {
            this.setState({ actions: JSON.parse(res) });
        }).catch(err => {
            alert('actions!')
        })
    }

    getCurrentGame = async () => {
        return currentTags = await storage.retrieveCurrentGame().then(res => {
            if (res) {
                return JSON.parse(res);
            }
            else return res;
        })
    }

    getAllGames = async () => {
        await storage.retrieveData().then((res) => {
            //console.log(JSON.parse(res));
            //debugger;
            if (res != undefined) {
                let pastGames = JSON.parse(res)
                console.log("SYNCC ", pastGames)
                let temp = calculation.calculateByPosition(pastGames)
                let allGamesArray = [];
                if (pastGames.games) {
                    pastGames.games.forEach(game => {
                        allGamesArray.push(game)
                    })
                }

                this.setState({
                    gamesObj: JSON.parse(res),
                    loading: false,
                    totals: temp,
                    gamesArray: allGamesArray,
                    totalGames: allGamesArray.length
                })
                console.log("THIS IS ASYNC")
                console.log(pastGames)
                console.log(this.state.gamesObj)
            }
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            storage.resetActions();
            throw error;
        })
    }

    updateActions() {

    }

    updateTags() {

    }

    updateGames(newGamesObj) {
        this.setState({
            gamesObj: newGamesObj,
            gamesArray: newGamesObj.games
        })

    }

    resetActions() {

    }

    deleteAllTags() {

    }

    addTag() {

    }

    addAction(){
        
    }





    componentDidUpdate() {
        //checks to see if any new tags are added to our list of overall tags, and updates state if so.
        storage.retrieveTags().then(res => {
            if (res != undefined && res != null) {
                if (this.state.allTags.length >= 1) {
                    //debugger;
                    if (this.state.allTags.length !== JSON.parse(res).length) {
                        this.setState({ allTags: JSON.parse(res) })
                    }
                }
            }
        })
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
    }

    incrementPosition() {
        this.setState({
            position: this.state.position + 1
        })
    }



    setPosition(position) {
        this.setState({
            position: position
        })
    }

    getGames() {
        return this.state.gamesObj;
    }

    getGamesArray() {
        return this.state.gamesArray;
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                incrementPosition: () => this.incrementPosition(),
                setPosition: (position) => this.setPosition(position),
                remount: () => this.componentDidMount(),
                updateGames: (gamesObj) => { this.updateGames(gamesObj) },
                getGames: () => this.getGames(),
                getGamesArray: () => this.getGamesArray(),
                

            }
            }>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

