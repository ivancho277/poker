import React from 'react'
import { View, Text } from 'react-native';
import { useGameContext } from '../stateContext/useGameContext'
import { isLoading } from 'expo-font';
// const storage = require("./components/AsyncStorageController.js");
// const calculation = require('./components/statscalculation.js')

//  const context = useContext(MyContext)


const tester = () => {
    [state, dispatch] = useGameContext();
    const { isLoading, allGames, allTags, actions, currentGame } = state;
    console.log(state)

    return (

        <View>
            <Text>is Loading = {isLoading}</Text>
            <Text>actions = {actions}</Text>
            <Text>all Tags = {allTags}</Text>
            <Text>all Games = {allGames}</Text>
            <Text>Current Game = {currentGame}</Text>
        </View>
    )
}

export default tester
