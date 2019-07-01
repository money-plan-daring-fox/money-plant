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
        .where('completed', '==', true)
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
          : <FlatList
            style={{ padding: 12.5, backgroundColor: "#31422e" }}
            data={plants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#31422e",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      backgroundColor: "#f2f2d9",
                      width: "100%",
                      height: 160,
                      justifyContent: "center",
                      alignItems: "center",
                      // padding: 15,
                      flexDirection: 'row'
                    }}
                    onPress={() => props.navigation.navigate("HistoryDetails", { item })}
                  >
                    <View style={{ flex: 1.5, /* backgroundColor: 'cornflowerblue' */ }}>
                      <Image style={{ height: "100%", width: "100%", }}
                        resizeMode="contain"
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02' }} />
                    </View>
                    <View style={{ flex: 3.5, padding: 15, /* backgroundColor: 'aquamarine' */ }}>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        Name: {item.name}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        Price: Rp. {item.price}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        Investing: Rp. {item.investing}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        invested: Rp. {item.invested}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        plan: {item.plan}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        deadline: {item.deadline}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        createdAt: {JSON.stringify(item.createdAt)}
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          // fontFamily: "Trebuchet MS",
                          flex: 1
                        }}
                      >
                        updatedAt: {JSON.stringify(item.updatedAt)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
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
