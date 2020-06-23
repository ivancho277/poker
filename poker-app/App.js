import React, { useEffect, useState } from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import HomeScreenNew from "./HomeNew";
import StatsScreen from "./Stats";
import { AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Provider as PaperProvider, ActivityIndicator, Colors, DefaultTheme } from 'react-native-paper';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
//import { GameProvider } from './stateContext/contextProvider'
// import Menu from 'react-native--storage-dev-menu-item';
import TestScreen from './TestScreen';
import SettingsNew from './SettingsNew';
import { UseGameStore, GameSubscriber } from './DataStore/GameStore'
import GameScreenNew from './GameScreenNew';
import { COLOR } from "react-native-material-ui";

const theme = {  
  ...DefaultTheme,
  roundness: 69,
  colors: {
    ...DefaultTheme,
    primary: '#7FB7BE',
    accent: '#BC2C1A',
    surface: '#D3F3EE',
    backdrop: '#7FB7BE',
    background: '#7FB7BE'
  },
  font: {
    ...DefaultTheme
  }
}

const App = () => {
  const [state, { load, loadTotals }] = UseGameStore();
  const [loading, setLoading] = useState(true);

  return (
    // <GlobalState>
    <GameSubscriber>
      {(state, actions) => (
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>

      )
      }
    </GameSubscriber>
    // </GlobalState>

    //   </Container>
    // </Root>
  
  )
}

export default App;

const AppSwitchNavigator = createStackNavigator({
  Home: {
    screen: HomeScreenNew,
    navigationOptions: ({ navigation }) => ({
      title: "Home", // Title to appear in status bar
      headerLeft: (
        <AntDesign
          name="menu-fold"
          size={35}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )
    })
  },

  Game: {
    screen: GameScreenNew,
    navigationOptions: ({ navigation }) => ({
      title: "Game"
    })
  },
  Settings: {
    screen: SettingsNew,
    navigationOptions: ({ navigation }) => ({
      title: "Settings"
    })
  },

  Statistics: {
    screen: StatsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Statistics"
    })
  },

  Tests: {
    screen: TestScreen,
    navigationOptions: { title: "Test Things" }
  },

});

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppSwitchNavigator,
    navigationOptions: ({ navigation }) => ({
      title: "Home" // Title to appear in status bar
    })
  },
  Settings: {
    screen: SettingsNew
  },

  Statistics: {
    screen: StatsScreen,

  },
  Tests: {
    screen: TestScreen,
  },

});

const AppContainer = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
