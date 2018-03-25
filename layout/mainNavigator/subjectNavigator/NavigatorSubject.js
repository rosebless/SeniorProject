import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation' ;
import NavigatorMain from '../NavigatorMain';
import SubjectManagePage from './SubjectManage';

export default class NavigatorSubject extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'รายวิชา' ,
        drawerIcon: ({ tintColor }) => (
          <Image
        source={require('../../../pics/temp3.png')}
        style={styles.icon}
      />
        ),
        
      })
    
  render() {
    // @FIX step 1
    // add screenProps
    // alert('test ->', JSON.stringify(this.props))
    return (
        <SNSubject screenProps={{ rootNavigation: this.props.navigation }} />
    );
  }
}

const SNSubject = StackNavigator({
    SubjectManage: { screen: SubjectManagePage } ,
},{
    headerMode: 'none', 
    headerVisible: false,
});

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });