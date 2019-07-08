import React, {useEffect, useState} from 'react'
import { View, Text, AsyncStorage, ScrollView } from 'react-native'
import NavigationDrawerStructure from '../components/NavigationDrawerStructure';
import db from '../api/firebase'
import Notif from '../components/Notif'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [userId, setUserId] = useState("")
  // const [user, setUser]

  useEffect(() => {
    AsyncStorage.getItem("id")
    .then(idKu => {
      setUserId(idKu)
      return idKu
    })
    .then(idKu => {
      db.firestore()
      .collection("users")
      .doc(idKu)
      .onSnapshot(doc => {
        let sortedArr = doc.data().notifications.sort(function(a,b) {
          return new Date(b.date) - new Date(a.date)
        })
        setNotifications(sortedArr)
      })
    })
    .catch(err => {
      console.log("async storage error uy")
    })
  }, [])

  return (
      <ScrollView endFillColor="#31422e" style={{backgroundColor:'#31422e', paddingVertical: 10}}>
        {/* <Text style={{color: "white"}}>liat aku mas ah</Text> */}
        {/* <Text>{JSON.stringify(notifications)}</Text> */}
        <View style={{marginHorizontal:20}}>
          {
            notifications.map((el,index) => {
              return (
                <Notif el={el} />
              )
            })
          }
        </View>
      </ScrollView>
  )
}

Notification.navigationOptions = props => ({
    title: "Notification",
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
