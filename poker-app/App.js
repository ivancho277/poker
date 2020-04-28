import React, { useEffect, useState } from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import HomeScreen from "./Home";
import StatsScreen from "./Stats";
import { GlobalState } from "./stateContext/GlobalState";
import { AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Provider as PaperProvider, ActivityIndicator, Colors } from 'react-native-paper';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
//import { GameProvider } from './stateContext/contextProvider'
// import Menu from 'react-native--storage-dev-menu-item';
import TestScreen from './TestScreen';
import SettingsNew from './SettingsNew';
import { UseGameStore } from './DataStore/GameStore'
import GameScreenNew from './GameScreenNew';
import { COLOR } from "react-native-material-ui";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isReady: true
//     };
//   }

// async componentDidMount() {
//   await Font.loadAsync({
//     Roboto: require("native-base/Fonts/Roboto.ttf"),
//     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//     ...Ionicons.font
//   });
//   this.setState({ isReady: true });
// }

const App = () => {
  const [state, {load, loadTotals}] = UseGameStore();
  const [loading, setLoading] = useState(true);

  const DataLoad = async () => {
    await loadTotals().then(async (res) => {
      await load().then(res => {
        console.log("!!DONE LOADING!!")
      })
    })
  }

  useEffect(() => {
    DataLoad().then(res => {
      setLoading(false);
    })
    // load().then(res => {
    //   setLoading(false)
    // });
  }, [])



  
    // <Root>
    //   <Container>
    return (loading ? 
      <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'}></ActivityIndicator>
    :
    <GlobalState>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </GlobalState>

    //   </Container>
    // </Root>
    )
  
}

export default App;

const AppSwitchNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
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
