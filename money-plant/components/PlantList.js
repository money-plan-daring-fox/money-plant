import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const PlantList = ({props}) => {
    return (
        <>
            <TouchableHighlight
                style={{
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    backgroundColor: "grey"
                }}
                onPress={() => props.navigation.navigate("Plant")}>
                <Text>aku 1 contoh plant. touch me mas</Text>
            </TouchableHighlight>
        </>
    )
}

export default PlantList