import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './Home';
import GameScreen from './Game';
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
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen }
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
