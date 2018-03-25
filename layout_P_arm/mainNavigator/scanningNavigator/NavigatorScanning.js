import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation' ;

import ScanningPage from  './ScanningPage' ;

export default class NavigatorLogin extends React.Component {
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
    return (
        < SNScanning />
    ); 
  }
}

const SNScanning = StackNavigator({
    ScanningPage: { screen: ScanningPage } ,
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