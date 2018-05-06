import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, AsyncStorage } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import DrawerHeader from '../Drawer/DrawerHeader';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
// import AppVarible from '../../../Model/AppVarible'
import SelectionPage from '../Selection'
import Dashboard from './Dashboard'

export default class Dashboard_Selection extends React.Component {

  componentWillMount = async () => {
    // const { focus, byPass } = this.props.screenProps
    // console.log('Dashboard_Selection', byPass, focus)
    // byPass && this.props.navigation.navigate('Dashboard', { focus }) 
    const focus = await AsyncStorage.getItem('byPassFocus')
    AsyncStorage.removeItem('byPassFocus')
    console.log('Dashboard_Selection', focus)
    // focus ? console.log('true') : console.log('false')
    focus && this.props.navigation.navigate('Dashboard', { focus })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { focus, byPass, ...props } = this.props.screenProps // deviceSize , openDrawer, professorKey 
    console.log('Dashboard_Selection', this.props.screenProps)
    return (
      <SelectionPage
        {...props}
        namePage={'สรุป'}
        customNavigate={navigate}
        screenNavigate={'Dashboard'} />
    );
  }
}
