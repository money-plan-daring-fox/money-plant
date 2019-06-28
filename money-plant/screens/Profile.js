// React
import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

// Drawer
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

const Profile = props => {
    return (
        <>
        <View>
            <Text>
                Halo aku profile
            </Text>
        </View>
        <TouchableHighlight>
            <Text>touch me</Text>
        </TouchableHighlight>
        <TouchableHighlight>
            <Text>touch me</Text>
        </TouchableHighlight>
        <TouchableHighlight>
            <Text>touch me</Text>
        </TouchableHighlight>

        </>
    )
}

Profile.navigationOptions = props => ({
    headerStyle: {
        backgroundColor: "green"
    },
    headerLeft: <NavigationDrawerStructure navigationProps={props.navigation} />
})

export default Profile