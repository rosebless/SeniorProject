import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import DrawerHeader from './Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class DashBoard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'สรุป',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../pics/temp5.png')}
        style={styles.icon}
      />
    ),
    
  })
  render() {
    return (
      
      <View style={styles.container} >
        <DrawerHeader {...this.props} />
        <Text style={styles.temp} >Hey I'm DashBoard Page najaaaa !!!</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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


