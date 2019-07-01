// React
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  AsyncStorage
} from "react-native";

// Navigation
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// Screens
import Login from "./screens/Login";
import Garden from "./screens/Garden";
import Plant from "./screens/Plant";
import NewPlant from "./screens/NewPlant";
import Profile from "./screens/Profile";
import HistoryCompleted from "./screens/HistoryCompleted";
import HistoryDetails from "./screens/HistoryDetails";
import HistoryOngoing from "./screens/HistoryOngoing";

// Firebase
import { AuthProvider } from "./components/AuthContext";

// Icons
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

// Disable Yellow Warnings
console.disableYellowBox = true;

const drawerStyle = {
  contentComponent: props => {
    const [income, setIncome] = useState(0);
    const [balance, setBalance] = useState(0);
    const [logoLoading, setLogoLoading] = useState(false);
    useEffect(() => {
      AsyncStorage.getItem("income").then(incomeKu => {
        setIncome(incomeKu);
      });
      AsyncStorage.getItem("balance").then(balanceKu => {
        setBalance(balance);
      });
    }, []);

    return (
      <View style={{ flex: 1, backgroundColor: "#262525" }}>
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
            <Image
              onLoadStart={() => setLogoLoading(true)}
              onLoadEnd={() => setLogoLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/logo.png?alt=media&token=0f0ed0be-e04d-472a-9191-4ba172b7311c"
              }}
              style={{
                width: "100%",
                height: Dimensions.get("window").width / 2
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{ flex: 5 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <MaterialCommunityIcons name="coin" size={25} color="gold" />
            <Text style={{ ...styles.text, color: "gold" }}>
              {parseInt(balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#587e5b",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={e => props.navigation.navigate("Garden")}
          >
            <Text style={styles.text}>Zen Garden</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#587e5b",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
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
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={e => props.navigation.navigate("History")}
          >
            <Text style={styles.text}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#587e5b",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={e => props.navigation.navigate("Notification")}
          >
            <Text style={styles.text}>Notification</Text>
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
        },
        History: {
          screen: createBottomTabNavigator(
            {
              Ongoing: {
                screen: createStackNavigator({
                  HistoryOngoing: {
                    screen: HistoryOngoing
                  },
                  HistoryDetails: {
                    screen: HistoryDetails
                  }
                }),
                navigationOptions: {
                  tabBarIcon: () => (
                    <FontAwesome name="leaf" color="white" size={20} />
                  )
                }
              },
              Completed: {
                screen: createStackNavigator({
                  HistoryCompleted: {
                    screen: HistoryCompleted
                  },
                  HistoryDetails: {
                    screen: HistoryDetails
                  }
                }),
                navigationOptions: {
                  tabBarIcon: () => (
                    <MaterialIcons name="check-box" color="white" size={20} />
                  )
                }
              }
            },
            {
              tabBarOptions: {
                style: {
                  backgroundColor: "#587E5B"
                },
                inactiveTintColor: "#f6f4f2",
                activeTintColor: "#ffd02c"
              }
            }
          )
        }
      },
      drawerStyle
    )
  }
});

export default function App() {
  const Route = createAppContainer(appNavigator);
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
}
