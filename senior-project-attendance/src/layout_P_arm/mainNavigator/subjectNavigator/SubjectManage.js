import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import DrawerHeader from '../Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
export default class SubjectManage extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'รายวิชา' ,
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../icon/temp3.png')}
        style={styles.icon}
      />
    ),
    
  })

  render() {
    // @FIX step 2
    // add pass rootNavigation in screenProps to DrawerHeader Component

    const {
      screenProps: { rootNavigation },
      ...props
    } = this.props;
    return (
      <View style={styles.container}>
        <DrawerHeader {...this.props} rootNavigation={rootNavigation} />
        <Text style={styles.temp}>Hey I'm SubjectManage Page najaaaa !!!  {JSON.stringify(this.props)} ghjjh</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    //alignItems: 'center', 
    justifyContent: 'center',
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


