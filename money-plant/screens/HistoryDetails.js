import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

const HistoryDetails = (props) => {
  const [item, setItem] = useState({})
  const [line, setLine] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const input = props.navigation.getParam("item")
    setItem(input)
    const label = []
    const dataset = []
    input.history.forEach(item => {
      let date = Date(item.updatedAt)
      let dateString = `${ new Date(date).getDate() }-${ new Date(date).getMonth() }-${ new Date(date).getFullYear() }`
      let money = Number(item.invested)/1e6
      label.push(dateString)
      dataset.push(money)
    })
    const obj = {
      labels: label,
      datasets: [
        {
          data: dataset
        }
      ]
    }
    setLine(obj)
    setLoading(false)
  }, [line])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#31422e', padding: 10, alignItems : "center" }}>
      {
        loading
        ? <View style={{ height: Dimensions.get("window").width, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        : <LineChart
            data={line}
            width={Dimensions.get('window').width - 20} // from react-native
            height={Dimensions.get('window').height }
            yAxisLabel={'Rp'}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#587E5B',
              backgroundGradientTo: '#587E5B',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
      }
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
