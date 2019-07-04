import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const Notif = (props) => {
    const el = props.el
    let payload = el.data
    return (
        <TouchableOpacity
            onPress={() => /* alert(JSON.stringify(payload)) */ props.navigation.navigate('Garden')}
        >
            <View style={{height: 90, marginBottom:5, 
            backgroundColor: "#f6f4f2", borderRadius:2 }}>
                <View style={{flex:1}}>
                    <Text style={{ margin: 10, fontWeight: '800', fontSize: 14, fontFamily: 'sans-serif'}} >{el.title}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{ margin: 10, fontSize: 12, fontFamily: 'sans-serif'}}>{el.body}</Text>
                </View>            
                <View style={{flex:1}}>
                    <Text style={{ margin: 10, color:'#b9523e',  fontSize: 10, fontFamily: 'sans-serif'}}>{new Date(el.date).toLocaleDateString('en-US',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})+' '+new Date(el.date).toLocaleTimeString('id-ID') }</Text>
                </View>  
            </View>
        </TouchableOpacity>
    )
}

export default withNavigation(Notif)
