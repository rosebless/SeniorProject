import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation' ;
//port { Icon } from 'native-base'
import DrawerHeader from '../Drawer/DrawerHeader' ;
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class ScanningPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'เช็คชื่อ',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../icon/temp4.png')}
        style={styles.icon}
      />
    ),
    
  })
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <View style={styles.container}>
        <View style={{
            height: 90,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#00CED1',
        }}>
            <TouchableHighlight style={{ margin:10 }}
                onPress={() => {
                    navigate('DrawerOpen');
                }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require('../../../icon/iconDrawerHeader.png')}
                />
            </TouchableHighlight>
        </View>
        <Text style={styles.temp}>Hey I'm Scanning Page najaaaa !!!</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffa', 
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


