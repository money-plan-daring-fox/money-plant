import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native'
// import NumberFormat from 'react-number-format'

const PlantList = ({ props, item }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
            {
                item === "add" &&
                <TouchableOpacity
                    style={{
                        border: 6,
                        borderRadius: 4,
                        borderWidth: 1.25,
                        borderStyle: "dashed",
                        borderColor: 'black',

                        backgroundColor: "white",

                        height: 252,
                        width: 144,

                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => props.navigation.navigate("NewPlant")}>
                    <Image style={{ height: "50%", width: "50%" }} resizeMode="contain" source={{ uri: "https://i.pinimg.com/originals/7f/19/03/7f1903f28214a9a971e74dae53d48028.png" }} />
                    <Text>Plant new seed!</Text>
                </TouchableOpacity>
            }
            {
                item.name &&
                <TouchableOpacity
                    style={{
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: 'black',

                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,

                        backgroundColor: "white",

                        height: 252,
                        width: 144,

                        justifyContent: "center",
                        alignItems: "center",
                        padding: 15
                    }}
                    onPress={() => props.navigation.navigate("Plant")}>
                    <Text>{item.name}</Text>
                    <Image style={{ height: "50%", width: "50%" }} source={require('../assets/plant.png')} />
                    <Text>Remaining</Text>
                    <Text>{item.price - item.invest}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default PlantList