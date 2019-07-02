import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'

const LeaderboardList = (props) => {
    const el = props.el
    const index = props.index
    let color
    let image
    if (index === 0) {
        color = '#ffd02c'
        image - '../assets/v01.png'
    } else if (index === 1) {
        color = '#b2bcc0'
        image - '../assets/v02.png'
    } else if (index === 2) {
        color = '#ac6d5f'
        image - '../assets/v03.png'
    } else {
        color = '#31422e'
        image = null
    }

    return (
        <View style={{backgroundColor: "rgba(246, 244, 242, 0.9)", 
        flexDirection:'row', flexWrap:'wrap', marginHorizontal: 20,
        marginBottom:10, borderRadius: 15, height: 70}}>
            <View style={{flex:1, marginRight:30}}>
                <Text style={{textAlign:'center', fontFamily:'MachineGunk', fontSize:52, 
                fontWeight:'700', paddingRight:20,
                borderBottomRightRadius:60, 
                backgroundColor:color,
                 width: 60, color: 'white',
                borderBottomLeftRadius: 15, borderTopLeftRadius:15}}
                >{index+1}</Text>
            </View>
            <View style={{flex:6, flexDirection:'column'}}>
                <View style={{flex:2}}>
                    <Text style={{fontFamily:'MachineGunk', fontWeight:'400', fontSize:20, marginTop:5}}> {el.name}</Text>
                </View>
                <View style={{flex:3, justifyContent: 'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image 
                            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-32.png?alt=media&token=b72a980e-6307-4e51-bf7a-aaebcdd0a5c3'}} 
                            style={{height:20, width:20}}
                            resizeMode='cover'
                        />
                        <Text style={{marginRight:10}}>{el.plants.length}</Text>
                        <Image 
                            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65'}} 
                            style={{height:25, width:25}}
                            resizeMode='cover'
                        />
                        <Text>{el.plants.length}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 2}}>
                <Image 
                    source={
                        index === 0 ? require('../assets/v01.png') : index === 1 ? require('../assets/v02.png') : index === 2 ? require('../assets/v03.png') : null
                    }
                    style={{marginTop:5, height:60, width:60}}
                    resizeMode='cover'
                />
            </View>
        </View>
    )
}

export default LeaderboardList
