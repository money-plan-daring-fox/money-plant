import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

const HistoryDetails = (props) => {
  // let {
  //   name,
  //   price,
  //   deadline,
  //   invested,
  //   investing,
  //   plan
  // } = props.navigation.getParam("item");
  const [item, setItem] = useState({})

  useEffect(() => {
    const input = props.navigation.getParam("item")
    setItem(input)
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#31422e' }}>
      <Text>History Details</Text>
      <Text>{ item }</Text>
    </SafeAreaView>
  )
}

HistoryDetails.navigationOptions = props => ({
  title: "Details",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587E5B",
  },
  headerLeft:
    <View style={{ marginLeft: 15 }}>
      <NavigationDrawerStructure navigationProps={props.navigation} />
    </View>
})

export default HistoryDetails
