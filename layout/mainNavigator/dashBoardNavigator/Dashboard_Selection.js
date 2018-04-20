import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
import DrawerHeader from '../Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base'; 
import AppVarible from '../../../Model/AppVarible'
import SelectionPage from '../Selection'

export default class ScanningPage extends React.Component { 
  
  render() {
    
   const { navigate } = this.props.navigation;
    
   if (!AppVarible.appVarible.navigationSaved.dashboard.status) {
    AppVarible.setNavigation('dashboard',{
      status: true,
      navigate 
    })
  }

    return (
      <SelectionPage 
      screenProps={{ 
          namePage: 'สรุป' , 
          customNavigate: navigate , 
          screenNavigate: 'Dashboard' , 
          focusVarible: (subjectCode) => { 
            AppVarible.setNavigationFocus( 'dashboard', subjectCode )
          }
        }} />
    );
  }
}
