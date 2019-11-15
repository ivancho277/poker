import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Radio from './Radio.js';
import { MyContext } from '../stateContext/GlobalState';
import TagsModal from './TagsModal.js';
const storageController = require('./AsyncStorageController.js')




function gameStats(actions) {
    this.currentStats = {}
    this.actions = actions;
    console.log(actions)

    this.getCurrentStats = function () {
        //debugger;
        this.actions.forEach(action => {
            //console.log(action)
            this.currentStats[action.actionName] = {}
            this.currentStats[action.actionName].total = action.count;
            console.log(this.currentStats[action.actionName])
            for (count in action.countPerPosition) {
                this.currentStats[action.actionName][count] = action.countPerPosition[count];

            }
        })
        return this.currentStats;
    };

    this.addGameStats = function (gameStats) {

    }



}





function Action(actionName, count = 0, countPerPosition = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }) {
    this.actionName = actionName,
    this.count = count;
    this.countPerPosition = countPerPosition;

    this.incrementActionAtPosition = function (position) {
        this.countPerPosition[position] = ++this.countPerPosition[position];
        this.count++;
    }

    this.getPositionCount = function () {
        return Object.assign({}, this.countPerPosition)
    }

    this.getTotalCount = function () {
        return this.count;
    }

}




export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            call: 0,
            fold: 0,
            raise: 0,
            actions: [],
            actionStrings: [],
            tag: "",
            tags: this.props.tags,
            gamesArray: [],
            position: 0,
            currentGame: {},
            currentTime: new Date(),
            previousTime: new Date(),
            actionInputOpen: false,
            showModal: false,
            actionToAdd: ''
        };
    };

    async populateGames() {
        await storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            if (pastGames.games) {
                pastGames.games.forEach(game => {
                    arrayOfgames.push(game);
                    console.log(game)
                })
            }
            console.log("TAKE A LOOK")
            console.log(arrayOfgames)
            console.log(res)
            console.log(pastGames)
            this.setState({
                gamesArray: arrayOfgames,
            });
        }).catch((error) => {
            alert("populate error");
            throw error;
        })
    }

    async retrieveCurrentGame() {
        let game = await storageController.retrieveCurrentGame().then((res) => {
            let currentgame = JSON.parse(res);
            console.log("LOOOOOOGGGGGG")
            //console.log(currentgame.actions)
            //console.log(JSON.parse(res))
            if (currentgame) {
                let pastactions = currentgame.actions.map((action)=> {
                    return new Action(action.actionName, action.count, action.countPerPosition)
                })
                
                
                this.setState({
                    currentGame: currentgame,
                    actions: pastactions
                }) 
            }
            return res; 
        }).catch(err => {
            throw err;    
        })    
        return game === null ? true : false
    }


    async retrieveActions() {
       await storageController.retrieveActions().then((res) => {
            if (!res) {
                console.log("AHSHAHSSAH")
                console.log(res)
                storageController.resetActions();
                this.setState({
                    actions: [new Action('call'), new Action('fold'), new Action('raise')]
                }, () => { alert('Your actions were reset') })
            } else {
                let actions = JSON.parse(res).map(action => {
                    return new Action(action)
                });
                this.setState({
                    actions: actions,
                    actionStrings: JSON.parse(res)
                })
            }
        })
    }

    componentDidMount() {
        this.populateGames().then(() => {
            console.log("LOOK UNDER");
            console.log(this.state.gamesArray)
            this.retrieveCurrentGame().then(res => {
                console.log("MY RESPONSE", res)
                if(res){
                    this.retrieveActions().then((res) => {
                        console.log('actions')
                    })
                }
            })

        })
    }

    saveToTags(tag) {
        let tagsArray = this.state.tags;
        tagsArray.push(tag);
        this.setState({
            tags: tagsArray
        })
    };

    toBeSaved = (shouldReturn = false) => {
        let date = new Date();
        let temp = new gameStats(this.state.actions);
        let totals = this.state.actions.map((action) => {
            return { [action.actionName]: action.getTotalCount()}
        })
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: this.state.calls,
            folds: this.state.folds,
            raises: this.state.raises,
            tags: this.state.tags,
            game: temp.getCurrentStats(),
            totals: totals
            
        }
        //debugger;
        console.log(temp.getCurrentStats())
        //debugger;

        let gamesarr = this.state.gamesArray.concat(gamesObj);
        let saveObj = {
            version: "1.0.3",
            games: gamesarr
        }
        console.log("LOOOK")
        console.log(gamesarr)
        if (shouldReturn) {
            return saveObj;
        } else {
            storageController.saveData(saveObj);

        }
        //debugger
    };

    saveCurrentGame() {
        let date = new Date();
        let temp = new gameStats(this.state.actions);

        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: this.state.calls,
            folds: this.state.folds,
            raises: this.state.raises,
            tags: this.state.tags,
            currentGame: temp.getCurrentStats(),
            actions: this.state.actions

        }
        console.log("HOLLLY MOLLY")
        //console.log(temp.getCurrentStats())
        console.log(gamesObj.currentGame)
        storageController.saveCurrentGame(gamesObj)
    }



    clearTags() {
        this.setState({
            tag: ''
        })
    }

    getPosition = (position) => {
        this.setState({
            position: position
        })
        this.props.setPosition(position);
    }

    incrementcurrentGame(position, pressedButton) {
        //debugger
        if (pressedButton === "call") {
            ++this.state.currentGame[position].calls;
        }
        else if (pressedButton === "fold") {
            ++this.state.currentGame[position].folds;
        }
        else if (pressedButton === "raise") {
            ++this.state.currentGame[position].raises;
        }
    }



    shouldPositionIncrement = (cb) => {
        if (this.state.currentTime.getTime() != this.state.previousTime.getTime()) {
            cb(this.state.position)
            //this.toBeSaved();
            this.saveCurrentGame();
            this.setState({
                previousTime: this.state.currentTime
            })
        }
    }


    onActionClick(action) {

    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    saveActions(action){
        let newActions = this.state.actionStrings.concat(action);
        this.setState({ actionStrings: newActions});
        storageController.saveActions(newActions);
        
    }

    render() {
        return (
            <View>

                {/* <Text> PracticeButtonController </Text> */}
                <Text>{'\n'}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
                    
                    {this.state.actions ?
                        this.state.actions.map((action, index) => {
                        return (
                            <Button key={index} title={`${action.actionName} #${action.count}`} onPress={() => { console.log(`you clicked ${action.actionName}`); action.incrementActionAtPosition(this.state.position); this.setState({ currentTime: new Date() }); this.props.setPosition(this.state.position);this.props.setLiveGamePosition(this.state.actions) ;console.log(action) }} />
                        )
                    }) :
                    <Text>Loading....</Text>
                }
                    

                    {/* <Button title={`call, #${this.state.calls}`} onPress={() => { this.setState({ calls: ++this.state.calls, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'call'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} />
                    <Button title={`fold, #${this.state.folds}`} onPress={() => { this.setState({ folds: ++this.state.folds, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'fold'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} />
                    <Button title={`raise, #${this.state.raises}`} onPress={() => { this.setState({ raises: ++this.state.raises, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'raise'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} /> */}
                </View>
                <Text>{'\n'}</Text>
                {this.state.actionInputOpen ?
                    <View>
                        <TextInput
                            style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                            placeholder='Add a new game Action'
                            onChangeText={(actionToAdd) => this.setState({ actionToAdd })}
                            value={this.state.actionToAdd}
                        />
                        <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="add action" onPress={() => {this.saveActions(this.state.actionToAdd.toLowerCase().trim()); this.setState({ actionInputOpen: false, actions: this.state.actions.concat(new Action(this.state.actionToAdd)), actionToAdd: ''  })}} />
                    </View>
                    :
                    <Button title='Add new Action' onPress={() => { this.setState({ actionInputOpen: true }); }} />
                }
                <Text>{'\n'}</Text>
                <View>
                    <Radio getPosition={this.getPosition} shouldPositionIncrement={this.shouldPositionIncrement} />
                </View>
                <MyContext.Consumer >
                    {(context) => <Button title='Save Data. End game.' onPress={() => { storageController.removeCurrentGame(); this.toBeSaved(); context.updateGames(this.toBeSaved(true)); this.props.goHome() }} />}
                </MyContext.Consumer>
            </View>
        );
    }
}