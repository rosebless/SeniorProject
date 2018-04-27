import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import NavigatorLogin from './layout/NavigatorLogin';
import NavigatorMain from './layout/mainNavigator/MainPage';
import AppVarible from './Model/AppVarible' 
import Test from './Test/Test'

export default class App extends React.Component {
  render() {
    AppVarible.setDeviceSize()
    AppVarible.setFirebase()
    return (
      <NavigatorLogin />
    );
  }
}

