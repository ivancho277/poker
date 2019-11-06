import React, { useState, useContext, Component } from 'react';
const storage = require('../components/AsyncStorageController.js')
const calculation = require('../components/statscalculation.js')

export const MyContext = React.createContext();


export class GlobalState extends Component {
    state = {
        allgames: {},     
        position: 0,
        totalsByPosition: {},
        totals: {}
    }
    componentDidMount() {
       // storage.removeData()
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));
            let temp = calculation.calculateByPosition(JSON.parse(res))
            this.setState({
                gamesObj: JSON.parse(res),
                loading: false,
                totals: temp
            })
            console.log("THIS IS ASYNC")
            console.log(this.state.gamesObj)
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            throw error;
        })
    }

    componentDidUpdate(){
        let checkStorageVsState;
        storage.retrieveData().then((res) => {
            checkStorageVsState = JSON.parse(res);
            console.log("POOOOOOOOOO", checkStorageVsState)
            if(checkStorageVsState.calls != this.state.gamesObj.calls ||
                checkStorageVsState.folds != this.state.gamesObj.folds ||
                checkStorageVsState.raises != this.state.gamesObj.raises){
                    this.componentDidMount();
                }
        })
        
    }
    logTotalsByPosition = () => {
        console.log(calculation.calculateByPosition(this.state.gamesObj));
        return calculation.calculateByPosition(this.state.gamesObj);
    }

    incrementPosition(){
        this.setState({
            position: this.state.position + 1
        })
    }

    setPosition(position){
        this.setState({
            position: position
        })
    }

    render(){
        return(
            <MyContext.Provider value={{
                state: this.state,
                incrementPosition: () => this.incrementPosition(),
                setPosition: (position) => this.setPosition(position),
                remount: () => this.componentDidMount()
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

