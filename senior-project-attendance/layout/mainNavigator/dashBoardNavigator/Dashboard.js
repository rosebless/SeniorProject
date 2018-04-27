import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../../Model/AppVarible'

export default class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'สรุป',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../pics/temp5.png')}
        style={styles.icon}
      />
    ),
    
  })
  render() { 
    let focusSubject = AppVarible.appVarible.navigationSaved.dashboard.focus 
    return (
      
      <View style={styles.container} >
        <Text >Hey I'm DashBoard Page najaaaa !!!</Text>
        <Text >The focus is {focusSubject} </Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    flex: 1 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});


