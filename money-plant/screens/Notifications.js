import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import NavigationDrawerStructure from '../components/NavigationDrawerStructure';
// Notif
import {
  Notifications, Permissions
} from 'expo'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    
  })
    return (
        <View>
            <Text>Ini notifications broo</Text>
        </View>
    )
}

Notifications.navigationOptions = props => ({
    title: "Notifications",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#587E5B",
    },
    headerLeft:
      <View style={{ marginLeft: 15 }}>
        <NavigationDrawerStructure navigationProps={props.navigation} />
      </View>
  })

export default Notification
