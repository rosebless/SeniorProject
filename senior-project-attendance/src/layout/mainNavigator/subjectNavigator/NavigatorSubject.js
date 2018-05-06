import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigatorMain from '../NavigatorMain';
import SubjectManage_Selection from './SubjectManage_Selection';
import Manager from './Manager'

const SNSubject = createStackNavigator({
  SubjectManage_Selection,
  Manager
}, {
    headerMode: 'none',
    headerVisible: false,
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default class NavigatorSubject extends React.Component {

  static router = SNSubject.router;

  static navigationOptions = ({ navigation }) => ({
    title: 'รายวิชา',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../pics/temp3.png')}
        style={styles.icon}
      />
    ),

  })

  render() {
    const { deviceSize, professorKey } = this.props.screenProps
    const { openDrawer } = this.props.navigation
    // @FIX step 1
    // add screenProps
    // alert('test ->', JSON.stringify(this.props))
    return (
      <SNSubject navigation={this.props.navigation}  /*screenProps={{ rootNavigation: this.props.navigation }}*/
        screenProps={{ deviceSize, professorKey, openDrawer }} />
    );
  }
}


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});