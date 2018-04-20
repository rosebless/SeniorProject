import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import DashboardPage from '../dashBoardNavigator/Dashboard';
import AppVarible from '../../../Model/AppVarible'

export default class ByPassToDashboard extends React.Component {
  render() {

    AppVarible.setNavigationFocus( 'dashboard', AppVarible.appVarible.navigationSaved.scanning.focus )

    return (
      <DashboardPage /*screenProps={{ rootNavigation: this.props.navigation }}*/ />
    );
  }
}
