// React
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions
} from "react-native";

// Navigation
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";

// Screens
import Login from "./screens/Login";
import Garden from "./screens/Garden";
import Plant from "./screens/Plant";
import NewPlant from "./screens/NewPlant";
import Profile from "./screens/Profile";

// Firebase
import { AuthProvider } from './components/AuthContext'

const drawerStyle = {
  contentComponent: props => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            paddingTop: 20,
            backgroundColor: "#262525"
          }}
        >
          <View
            style={{
              flex: 2,
              backgroundColor: "#262525",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10
            }}
          >
            <View
              style={{
                borderColor: "#f6f4f2",
                border: 6,
                borderWidth: 1.25,
                borderStyle: "solid",
                width: 80,
                height: 80,
                borderRadius: Dimensions.get("window").width / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
              }}
            >
              <Image
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
                }}
                style={{
                  width: "80%",
                  height: "80%"
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#262525",
              width: "100%",
              flex: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "MachineGunk",
                textAlign: "center",
                letterSpacing: 5,
                fontSize: 40,
                marginBottom: -15,
                color: "#587e5b"
              }}
            >
              Saving
            </Text>
            <Text
              style={{
                fontFamily: "MachineGunk",
                textAlign: "center",
                letterSpacing: 1,
                fontSize: 20,
                marginBottom: -20,
                color: "#fff"
              }}
            >
              Plant
            </Text>
          </View>
        </View>
        <View style={{ flex: 5 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#587e5b",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={e => props.navigation.navigate("Profile")}
          >
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#587e5b",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={e => props.navigation.navigate("Garden")}
          >
            <Text style={styles.text}>See Garden</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = {
  text: {
    fontFamily: "PingFangHK-Light",
    textAlign: "center",
    color: "#fff"
  }
};

const appNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: createDrawerNavigator(
      {
        Garden: {
          screen: createStackNavigator({
            Garden: { screen: Garden },
            Plant: { screen: Plant },
            NewPlant: { screen: NewPlant }
          })
        },
        Profile: {
          screen: createStackNavigator({
            Profile: { screen: Profile }
          })
        }
      },
      drawerStyle
    )
  }
});

export default function App() {
  const Route = createAppContainer(appNavigator)
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  )
}
