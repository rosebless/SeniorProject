import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Scanning_Selection from './Scanning_Selection';
import Scanner from './Scanner';
import ByPassToDashboard from './ByPassToDashboard'
import ManualAttendance from './ManualAttendance'

const SNScanning = createStackNavigator({
  Scanning_Selection,
  Scanner,
  ByPassToDashboard,
  ManualAttendance
}, {
    headerMode: 'none',
    headerVisible: false,
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default class NavigatorLogin extends React.Component {
  static router = SNScanning.router
  static navigationOptions = ({ navigation }) => ({
    title: 'เช็คชื่อ',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',

    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../pics/temp4.png')}
        style={styles.icon}
      />
    ),

  })
  render() {
    const { deviceSize, professorKey } = this.props.screenProps
    const { openDrawer } = this.props.navigation
    // @FIX step 1
    // add screenProps
    return (
      <SNScanning navigation={this.props.navigation}
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