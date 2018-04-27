import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation' ;

import Scanning_SelectionPage from  './Scanning_Selection' ;
import ScannerPage from './Scanner' ;
import ByPassToDashboardPage from './ByPassToDashboard' 

export default class NavigatorLogin extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'เช็คชื่อ',
        //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        //drawerLabel: 'Notification',
        
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../pics/temp4.png')}
            style={styles.icon}
          />
        ),
        
      })
  render() {

    // @FIX step 1
    // add screenProps
    return (
        < SNScanning /*screenProps={{ rootNavigation: this.props.navigation }}*/ />
    ); 
  }
}

const SNScanning = StackNavigator({
    Scanning_Selection: { screen: Scanning_SelectionPage } ,
    Scanner: { screen: ScannerPage } , 
    ByPassToDashboard: { screen: ByPassToDashboardPage }
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