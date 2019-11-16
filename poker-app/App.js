import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './Home';
import GameScreen from './Game';
import SettingsScreen from './Settings'
import { GlobalState } from './stateContext/GlobalState'
class App extends React.Component {
  render() {
    return (
      <GlobalState>
        <AppContainer />
      </GlobalState>
    )
  }
}
export default App;

const AppSwitchNavigator = createSwitchNavigator({
  Home: { screen : HomeScreen},
  Game: { screen: GameScreen },
  
  
})


const AppDrawerNavigator = createDrawerNavigator({
  Home: AppSwitchNavigator,
  Home: {screen: HomeScreen},
  Game: {screen : GameScreen},
  Settings: {screen: SettingsScreen}

})



const AppContainer = createAppContainer(AppDrawerNavigator);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
