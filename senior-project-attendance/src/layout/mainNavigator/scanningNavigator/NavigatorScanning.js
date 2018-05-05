import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation' ;

import Scanning_SelectionPage from  './Scanning_Selection' ;
import ScannerPage from './Scanner' ;
import ByPassToDashboardPage from './ByPassToDashboard' 
import ManualAttendancePage from './ManualAttendance'

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
    const { deviceSize, professorID, configActiveItemKey } = this.props.screenProps 
    const drawerNavigate = this.props.navigation.navigate
    // @FIX step 1
    // add screenProps
    return (
        <SNScanning screenProps={{ deviceSize, professorID, drawerNavigate, configActiveItemKey }} />
    ); 
  }
}

const SNScanning = StackNavigator({
    Scanning_Selection: { screen: Scanning_SelectionPage } ,
    Scanner: { screen: ScannerPage } , 
    ByPassToDashboard: { screen: ByPassToDashboardPage },  
    ManualAttendance: { screen: ManualAttendancePage}
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