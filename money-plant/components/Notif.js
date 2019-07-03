import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const Notif = (props) => {
    const el = props.el
    return (
        <View style={{flex : 1, marginBottom:5, 
        backgroundColor: "#f6f4f2", borderRadius:2 }}>
            <View style={{flex:1}}>
                <Text style={{ margin: 10, fontWeight: '800', fontSize: 14, fontFamily: "PingFangHK-Regular"}} >{el.title}</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{ margin: 10, fontSize: 12, fontFamily: "PingFangHK-Light"}}>{el.body}</Text>
            </View>            
            <View style={{flex:1}}>
                <Text style={{ margin: 10, color:'#b9523e',  fontSize: 10, fontFamily: "PingFangHK-Light"}}>{new Date(el.date).toLocaleDateString('id-ID',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})+' '+new Date(el.date).toLocaleTimeString('id-ID') }</Text>
            </View>  
        </View>
    )
}

export default Notif
