import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation' ;
import NavigatorMain from '../NavigatorMain';
import SubjectManage_SelectionPage from './SubjectManage_Selection';
import ManagerPage from './Manager'

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
    const { deviceSize, professorID } = this.props.screenProps 
    const drawerNavigate = this.props.navigation.navigate
    // @FIX step 1
    // add screenProps
    // alert('test ->', JSON.stringify(this.props))
    return (
      <SNSubject /*screenProps={{ rootNavigation: this.props.navigation }}*/ screenProps={{ deviceSize, professorID, drawerNavigate }} />
    );
  }
}

const SNSubject = StackNavigator({
    SubjectManage_Selection: { screen: SubjectManage_SelectionPage } , 
    Manager: { screen: ManagerPage }
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