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

    return (
      <SelectionPage 
      screenProps={{ 
        ...this.props.screenProps, // deviceSize , userID, drawerNavigate
          namePage: 'สรุป' , 
          customNavigate: navigate , 
          screenNavigate: 'Dashboard' 
        }} />
    );
  }
}
