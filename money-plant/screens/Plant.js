import React, { useState } from 'react'
import { View, Text, TouchableHighlight, FlatList } from 'react-native'

const Plant = props => {
    const [touched, setTouched] = useState([])

    return (
        <>
        <View>
            <Text>Hai! aku detail plant</Text>

            <Text>disini ada foto plant, segal deskripsi plant nama harga lala</Text>

            <TouchableHighlight
            onPress={() => setTouched([...touched, 'ah lagi'])}>
                <Text>invest me mas</Text>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={() => setTouched([...touched, 'ah lagi'])}>
                <Text>delete me mas</Text>
            </TouchableHighlight>
            
            <Text>{JSON.stringify(touched)}</Text>
        </View>
        </>
    )
}

Plant.navigationOptions = props => ({
    title: "Nama product",
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "green"
    }
})

export default Plant