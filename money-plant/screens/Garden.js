// React
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native'

// Children
import PlantList from '../components/PlantList'

// Drawer
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'
import { SafeAreaView } from 'react-navigation';
import { Feather } from '@expo/vector-icons'

// Firebase
import db from '../api/firebase'

const Garden = props => {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState({})

    async function getUid() {
        try {
            const uidKu = await AsyncStorage.getItem("uid")
            setUid(uidKu)
            db.firestore()
                .collection('plants')
                .where('uid', '==', uidKu)
                .onSnapshot(function (doc) {
                    let data = []
                    doc.forEach(el => {
                        data.push({ ...el.data() })
                    })
                    setPlants(["add", ...data, "space"])
                    setLoading(false)
                })
        } catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        getUid()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#587E5B" }}>
            {
                loading &&
                <View style={{ height: Dimensions.get("window").width, justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            }
            {
                !loading &&
                <FlatList
                    style={{ padding: 12.5, backgroundColor: "#31422e" }}
                    data={plants}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <PlantList props={props} item={item} />
                        )
                    }}
                />
            }
        </SafeAreaView>
    )
}

Garden.navigationOptions = props => ({
    title: "My Garden",
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "#587E5B"
    },
    headerLeft:
        <View style={{ marginLeft: 15 }}>
            <NavigationDrawerStructure navigationProps={props.navigation} />
        </View>
    // headerRight:
    //     <TouchableOpacity onPress={() => props.navigation.navigate("NewPlant")}>
    //         <Feather name="plus-circle" size={25} color="white" />
    //     </TouchableOpacity>
})

export default Garden