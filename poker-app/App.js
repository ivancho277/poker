import React from "react";
import { StyleSheet, View, AppRegistry } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import HomeScreen from "./Home";
import GameScreen from "./Game";
import SettingsScreen from "./Settings";
import StatsScreen from "./Stats";
import { GlobalState } from "./stateContext/GlobalState";
import { AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
// import Menu from 'react-native--storage-dev-menu-item';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    

    return (
      <Container>
        <GlobalState>
          <AppContainer />
        </GlobalState>
      </Container>
    );
  }
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
    screen: GameScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Game"
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Settings"
    })
  },

  Statistics: {
    screen: StatsScreen,
    navigationOptions: { title: "Statistics" }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppSwitchNavigator,
    navigationOptions: ({ navigation }) => ({
      title: "Home" // Title to appear in status bar
    })
  },
  Settings: {
    screen: SettingsScreen
  },
  Statistics: {
    screen: StatsScreen
  }
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
