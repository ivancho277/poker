import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Home } from './Home';
import { Game } from './Game';
const MainNavigator = createStackNavigator({
  Home: Home,
  Game: Game
},
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(MainNavigator);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
