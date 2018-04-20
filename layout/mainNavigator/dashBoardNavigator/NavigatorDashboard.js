import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation' 
import Dashboard_SelectionPage from './Dashboard_Selection'
import DashboardPage from './Dashboard'

export default class NavigatorDashboard extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'สรุป' ,
        drawerIcon: ({ tintColor }) => (
          <Image
        source={require('../../../pics/temp5.png')}
        style={styles.icon} 
      />
        ),
        
      })
    
  render() {
    // @FIX step 1
    // add screenProps
    // alert('test ->', JSON.stringify(this.props))
    return (
      <SNDashboard /*screenProps={{ rootNavigation: this.props.navigation }}*/ />
    );
  }
}

const SNDashboard = StackNavigator({
    Dashboard_Selection: { screen: Dashboard_SelectionPage } ,
    Dashboard: { screen: DashboardPage } 
},{
    headerMode: 'none', 
    headerVisible: false   
});

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  }); 