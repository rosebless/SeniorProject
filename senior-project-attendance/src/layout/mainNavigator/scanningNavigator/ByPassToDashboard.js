import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import DashboardPage from '../dashBoardNavigator/Dashboard';
import AppVarible from '../../../Model/AppVarible'

export default class ByPassToDashboard extends React.Component { 
  constructor(props){
    super(props) 
    const { setActiveItemKey } = this.props.screenProps.configActiveItemKey 
    setActiveItemKey('NDashBoard')
  }
  render() { 
    const { diviceSize, focus } = this.props.navigation.state.params 
    const { setActiveItemKey, removeActiveItemKey } = this.props.screenProps.configActiveItemKey 
    console.log(this.props)
    return (
      <DashboardPage diviceSize={diviceSize} focus={focus}  />
    );
  }
}
