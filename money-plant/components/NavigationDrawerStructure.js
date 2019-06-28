import React, { Component } from 'react'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'

export default class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png' }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}