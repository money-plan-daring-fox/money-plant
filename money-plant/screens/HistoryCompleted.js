// React
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'

// Components
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

// Firebase
import db from '../api/firebase'

const HistoryCompleted = (props) => {
  useEffect(() => {
    getUID()
  })

  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)

  const getUID = async () => {
    try {
      let uid = await AsyncStorage.getItem('uid')
      db.firestore()
        .collection('plants')
        .where('uid', '==', uid)
        .get()
        .then(data => {
          let arr = []
          data.forEach(item => {
            let obj = item.data()
            obj.id = item.id
            arr.push(obj)
          })
          setPlants(arr)
          setLoading(false)
        })
        .catch(err => {
        })
    } catch (err) {
      alert(err.toString())
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#31422e' }}>
      {
        loading
          ? <View style={{ height: Dimensions.get("window").width, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="white" />
          </View>
          : <View>
            <Text>History Completed</Text>
            <Text>{JSON.stringify(plants)}</Text>
          </View>
      }
    </SafeAreaView>
  )
}

HistoryCompleted.navigationOptions = props => ({
  title: "Completed",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587E5B",
  },
  headerLeft:
    <View style={{ marginLeft: 15 }}>
      <NavigationDrawerStructure navigationProps={props.navigation} />
    </View>
})

export default HistoryCompleted
