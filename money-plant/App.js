// React
import React from 'react'
import { Image, Text, TouchableHighlight } from 'react-native'

// Navigation
import { createAppContainer, createSwitchNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation'

// Screens
import Login from './screens/Login'
import Garden from './screens/Garden'
import Plant from './screens/Plant'
import NewPlant from './screens/NewPlant'
import Profile from './screens/Profile'

const drawerStyle = {
  contentComponent: props => {
    return (
      <>
        <Image
        style={{ width: '100%', height: 150 }}
        source={{ uri: "https://borrowingtape.com/wp-content/uploads/2017/01/Studio-Ghibli-1.jpg" }} />
        <Text>style aku mas</Text>
        <TouchableHighlight
            style={{
              backgroundColor: "green",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={e => props.navigation.navigate("Garden")}>
              <Text>Remas aku ke garden</Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={{
              backgroundColor: "green",
              borderWidth: 1,
              borderColor: "black",
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={e => props.navigation.navigate("Profile")}>
              <Text>Tekan aku ke profile</Text>
            </TouchableHighlight>
      </>
    )
  }
}

const appNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: createDrawerNavigator({
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
  },
  
})

export default createAppContainer(appNavigator)