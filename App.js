import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorLogin from './layout/NavigatorLogin';
import NavigatorMain from './layout/mainNavigator/MainPage';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorLogin />
    );
  }
}