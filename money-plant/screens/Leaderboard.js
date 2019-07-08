import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import db from '../api/firebase'
import NavigationDrawerStructure from '../components/NavigationDrawerStructure';
import LeaderboardList from '../components/LeaderboardList'
import { Feather, EvilIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

const Leaderboard = (props) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        db.firestore()
            .collection("users")
            .orderBy("completedPlants", "desc")
            .limit(10)
            .onSnapshot((querySnapshot) => {
                let usersFromDb = []
                querySnapshot.forEach((doc) => {
                    usersFromDb.push(doc.data())
                })
                setUsers(usersFromDb)
                console.log('succeed')
                setLoading(false)
            })
    }, [])
    return (
        loading ?
        <ActivityIndicator size="large" color="#31422e" />
        :
        <ScrollView endFillColor="#587E5B" contentContainerStyle={styles.contentContainer}>
            {
                users.length > 0 ?
                (
                    <View>
                        {/* <Text>Ini di Leaderboard</Text>
                        <Text>{JSON.stringify(users, null, 2)}</Text> */}
                        {
                            users.map((el,index) => {
                                return (
                                    <LeaderboardList el={el} index={index} ></LeaderboardList>
                                )
                            })
                        }
                    </View>
                )
                :
                (
                    <ActivityIndicator size="large" color="#31422e" />
                )
            }
        </ScrollView>
    )
}


Leaderboard.navigationOptions = props => ({
    title: "Leaderboard",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#587E5B",
    },
    headerLeft:
      <View style={{ marginLeft: 15 }}>
        <NavigationDrawerStructure navigationProps={props.navigation} />
      </View>
  })

  const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20,
      backgroundColor: "#587E5B",
      flex: 1
    }
  });

export default Leaderboard
