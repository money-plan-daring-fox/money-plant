import React, { useState } from 'react'
import { View, Text, TouchableHighlight, TextInput, Picker } from 'react-native'

const NewPlant = props => {
    const [plan, setPlan] = useState("default")

    return (
        <>
            <TextInput value="Nama plant" />
            <TextInput value="Harga" />

            <Picker
                selectedValue={plan}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => setPlan(itemValue)}>
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="By month" value="month" />
                <Picker.Item label="$ / month" value="money" />
            </Picker>

            <TouchableHighlight
            onPress={() => props.navigation.navigate("Garden")}>
                <Text>Create plant</Text>
            </TouchableHighlight>
        </>
    )
}

NewPlant.navigationOptions = props => ({
    title: "New plant",
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "green",
    },
})

export default NewPlant