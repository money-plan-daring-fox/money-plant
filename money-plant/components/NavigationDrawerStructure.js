import React, { Component } from 'react'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Feather name="list" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}