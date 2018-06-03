import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
// import { StackNavigator } from 'react-navigation';

import DashboardPage from '../DashBoardGroup/Dashboard';
// import AppVarible from '../../../Model/AppVarible'

export default class ByPassToDashboard extends React.Component {
  constructor(props) {
    super(props)

  }

  componentWillMount = () => {
    // this.props.navigation.dangerouslyGetParent().setParams({ activeItemKey: 'NDashBoard' })
    // console.log('Bypass this.props', this.props)
    // console.log('this.props.navigation.dangerouslyGetParent()', this.props.navigation.dangerouslyGetParent())
    // const { activeItemKey } = this.props.navigation.dangerouslyGetParent().state.params
    // console.log('activeItemKey', activeItemKey)
    // const { focus } = this.props.navigation.state.params
    // console.log('byPass focus', focus)
    // AsyncStorage.setItem('byPassFocus', JSON.stringify(focus.id))
    // console.log('byPass focus.id ',focus.id, JSON.stringify(focus.id))
    // this.props.navigation.navigate('Dashboard_Selection') 
    
  }

  render() {
    return (
      // <DashboardPage />
      <View />
    );
  }
}
