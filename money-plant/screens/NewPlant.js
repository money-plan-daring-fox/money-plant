import React, { useState } from 'react'
import { View, Text, TouchableHighlight, TextInput, Picker, StyleSheetr } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewPlant = props => {
    const [plan, setPlan] = useState("default")

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Plant/Product Name" placeholderTextColor="#f6f4f2" />
            <TextInput style={styles.input} placeholder="Price" placeholderTextColor="#f6f4f2"/>
            <Text style={{...styles.text, paddingTop : 15, paddingBottom : 6}}> How would you like to Save? </Text>
            <Picker
                selectedValue={plan}
                onValueChange={(itemValue, itemIndex) => setPlan(itemValue)}
                itemStyle={styles.picker}
                >
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Month" value="month" />
                <Picker.Item label="$ / month" value="money" />
            </Picker>

            <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate("Garden")}>
                <Text style={styles.text}>Create plant</Text>
            </TouchableOpacity>
        </View>
    )
}

NewPlant.navigationOptions = props => ({
    title: "New Plant",
    headerTintColor: "#f6f4f2",
    headerStyle: {
        backgroundColor: "#31422e",
    },
})

const styles = {
    container: {
      flex: 1,
      backgroundColor: "#262525",
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
      height: 40,
      width: 300,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "#FFF",
      borderRadius: 10
    },
    picker: {
      height: 50,
      width: 300,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "#FFF",
      borderRadius: 10
    },
    header: {
      fontFamily: "MachineGunk",
      textAlign: "center",
      letterSpacing: 1,
      fontSize: 50,
      marginBottom: -35,
      color: "#587e5b"
    },
    text: {
      fontFamily: "PingFangHK-Light",
      textAlign: "center",
      color: "#fff"
    },
    button: {
      backgroundColor: "#b9523e",
      paddingVertical: 15,
      borderRadius: 30,
      width: 200
    }
  };

export default NewPlant