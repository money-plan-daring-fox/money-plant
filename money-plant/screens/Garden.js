// React
import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

// Children
import PlantList from '../components/PlantList'

// Drawer
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

const Garden = props => {
    return(
        <>
        <View>
            <TouchableHighlight
            onPress={() => props.navigation.navigate("NewPlant")}
            >
                <Text>To NewPlant. remas aku</Text>
            </TouchableHighlight>
        </View>

        {/* flat list */}
        <Text>Ceritanya di bawah ini adalah flat list plant</Text>
        <PlantList 
        // kasih item ke component
        props={props}
        />
        </>
    )
}

Garden.navigationOptions = props => ({
    title: "Rp 10.000.000",
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "green"
    },
    headerLeft: <NavigationDrawerStructure navigationProps={props.navigation} />,
    headerRight: 
    <TouchableHighlight onPress={() => props.navigation.navigate("NewPlant")}>
        <Text style={{color: "white"}}>Create new plant</Text>
    </TouchableHighlight>
})

export default Garden