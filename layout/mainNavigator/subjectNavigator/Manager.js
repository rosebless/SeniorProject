import React, { Component } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import AppVarible from '../../../Model/AppVarible'

export default class Manager extends React.Component {
  render() {
    let focusSubject = AppVarible.appVarible.navigationSaved.subject.focus   
    return (
      
      <View style={styles.container} >
        <Text >Hey I'm Manager Page najaaaa !!!</Text>
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


