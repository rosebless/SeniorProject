import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class Register extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
  })
  /*
  static navigationOptions = ({navigation}) => ({
      title: 'Main',
      headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
     
  })
  */
  render() {
    return (
      
      <View style={styles.container}>
        <DrawerHeader {...this.props} />
        <Text style={styles.temp}>Hey I'm Register Page najaaaa !!!</Text>
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


