import React, { Component, useReducer, useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { MyContext } from '../stateContext/GlobalState'
import Radio from './Radio.js'

const storageController = require('./AsyncStorageController.js')




function gameStats(calls = 0, folds = 0, raises = 0) {
    this.calls = calls,
        this.folds = folds,
        this.raises = raises
}





export default function PracticeButtonController(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         calls: 0,
    //         folds: 0,
    //         raises: 0,
    //         tag: "",
    //         tags: [],
    //         gamesArray: [],
    //         position: 0,
    //         positionStats: {
    //             0: new gameStats,
    //             1: new gameStats,
    //             2: new gameStats,
    //             3: new gameStats,
    //             4: new gameStats,
    //             5: new gameStats,
    //             6: new gameStats,
    //             7: new gameStats,
    //         },
    //         currentTime: new Date(),
    //         previousTime: new Date(),
    //         tagInputOpen: false

    //     };
    // };

    const [calls, setCalls] = useState(0);
    const [folds, setFolds] = useState(0);
    const [raises, setRaises] = useState(0);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [gamesArray, setGamesArray] = useState([]);
    const [position, setPosition] = useState(0);
    const [positionStats, setPositionStats] = useState({
        0: new gameStats,
        1: new gameStats,
        2: new gameStats,
        3: new gameStats,
        4: new gameStats,
        5: new gameStats,
        6: new gameStats,
        7: new gameStats
    });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [previousTime, setPreviousTime] = useState(new Date());
    const [tagInputOpen, setTagInputOpen] = useState(false);

    useEffect(() => {
        populateGames().then(() => {
            console.log("LOOK UNDER");
            console.log(gamesArray)
        })
    }, [])




    const populateGames = async () => {
        await storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            pastGames.games.forEach(game => {
                arrayOfgames.push(game);
                console.log(game)
            })
            console.log("TAKE A LOOK")
            console.log(arrayOfgames)
            console.log(res)
            console.log(pastGames)
            setGamesArray(
                arrayOfgames
            )
        }).catch((error) => {
            alert("populate error");
            throw error;
        })
    }




    const saveToTags = (tag) => {
        let tagsArray = tags;
        tagsArray.push(tag);
        setTags({
            tags: tagsArray
        })
    }

    const toBeSaved = () => {
        let date = new Date();
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: calls,
            folds: folds,
            raises: raises,
            tags: tags,
            positionStats: positionStats
        }
        console.log("))))))))))))))))))))))))))", gamesArray)
        debugger;
        
        console.log("LOOOK")
        

        gamesArray.push(gamesObj);
        
        
        let saveObj = {
            version: "1.0.2",
            games: gamesArray
        }
        return saveObj;
    }

    const clearTags = () => {
        setTag('')
    }

    const getPosition = (position) => {
        setPosition(position)
        props.setPosition(position);
    }

    const incrementPositionStats = (position, pressedButton) => {
        //debugger
        if (pressedButton === "call") {
            //++this.state.positionStats[position].calls;
            setPositionStats({
                ...positionStats,
                position: calls + 1
            })

        }
        else if (pressedButton === "fold") {
            // ++this.state.positionStats[position].folds;
            setPositionStats({
                ...positionStats,
                position: folds + 1
            })
        }
        else if (pressedButton === "raise") {
            // ++this.state.positionStats[position].raises;
            setPositionStats({
                ...positionStats,
                position: raises + 1
            })
        }
    }



     function shouldPositionIncrement (cb) {
        if (currentTime.getTime() != previousTime.getTime()) {
            cb(position)
            setPreviousTime(currentTime)
            // this.setState({
            //     previousTime: this.state.currentTime
            // })
        }

    }



    return (
        <View>

            {/* <Text> PracticeButtonController </Text> */}
            {tagInputOpen ?
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                        placeholder="Type your tags here"
                        onChangeText={(tag) => setTag(tag)}
                        value={tag}
                    />
                    <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { saveToTags(tag); clearTags(); setTagInputOpen(false) }} />
                </View>
                :
                <Button title="add tag" onPress={() => setTagInputOpen(true)} />
            }
            <Text>{'\n'}</Text>
            <MyContext.Consumer>
                {(context) => <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
                    <Button title={`call, #${calls}`} onPress={() => { setCalls(calls + 1); setCurrentTime(new Date()); incrementPositionStats(position, 'call'); props.setPosition(position); props.setLiveGamePosition(positionStats) }} />
                    <Button title={`fold, #${folds}`} onPress={() => { setFolds(folds + 1); setCurrentTime(new Date()); incrementPositionStats(position, 'fold'); props.setPosition(position); props.setLiveGamePosition(positionStats) }} />
                    <Button title={`raise, #${raises}`} onPress={() => { setRaises(raises + 1); setCurrentTime(new Date()); incrementPositionStats(position, 'raise'); props.setPosition(position); props.setLiveGamePosition(positionStats) }} />
                </View>}
            </MyContext.Consumer>
            <Text>{'\n'}</Text>
            <View>
                <Radio getPosition={getPosition} shouldPositionIncrement={shouldPositionIncrement} />
            </View>
            <Button title='Save Data. End game.' onPress={() => { storageController.saveData(toBeSaved()); props.goHome() }} />

        </View >
    );

}
