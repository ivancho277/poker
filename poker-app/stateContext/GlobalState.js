import React, { useState, useContext, Component } from 'react';
const storage = require('../components/AsyncStorageController.js')
const calculation = require('../components/statscalculation.js')

export const MyContext = React.createContext();


export class GlobalState extends Component {
    state = {
        position: 0,
        totalsByPosition: {},
        totals: {},
        gamesObj: {},
        allTags: []
    }
    componentDidMount() {
        // storage.removeData()
        storage.retrieveData().then((res) => {
            //console.log(JSON.parse(res));
            if (res != undefined) {
                let temp = calculation.calculateByPosition(JSON.parse(res))
                this.setState({
                    gamesObj: JSON.parse(res),
                    loading: false,
                    totals: temp
                })
                console.log("THIS IS ASYNC")
                console.log(this.state.gamesObj)
            }
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            storage.resetActions();
            throw error;
        })
    }

    componentDidUpdate() {


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

    updateGames(newGamesObj) {
        this.setState({
            gamesObj: newGamesObj
        })
    }

    setPosition(position) {
        this.setState({
            position: position
        })
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                incrementPosition: () => this.incrementPosition(),
                setPosition: (position) => this.setPosition(position),
                remount: () => this.componentDidMount(),
                updateGames: (gamesObj) => { this.updateGames(gamesObj) }
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

