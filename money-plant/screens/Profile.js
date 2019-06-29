// React
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native'
import db from '../api/firebase'

// Drawer
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'

const Profile = props => {
  useEffect(() => {
    db.firestore()
      .collection('users')
      .doc(AsyncStorage.uid)
      .get()
      .then(doc => {
        console.log({doc})
      })
      .catch(err => {
        console.log({err})
      })
  })
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