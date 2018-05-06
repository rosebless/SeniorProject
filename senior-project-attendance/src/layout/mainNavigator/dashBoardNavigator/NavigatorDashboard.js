import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Dashboard_Selection from './Dashboard_Selection'
import Dashboard from './Dashboard'

const SNDashboard = createStackNavigator({
  Dashboard_Selection,
  Dashboard
}, {
    headerMode: 'none',
    headerVisible: false,
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default class NavigatorDashboard extends React.Component {

  static router = SNDashboard.router

  static navigationOptions = ({ navigation }) => ({
    title: 'สรุป',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../pics/temp5.png')}
        style={styles.icon}
      />
    ),
  })

  render() {
    const { deviceSize, professorKey } = this.props.screenProps
    const { openDrawer } = this.props.navigation
    const { ...params } = this.props.navigation.state.params
    console.log('NavigatorDashboard this.props', this.props)
    console.log('this.props.navigation.state.params', this.props.navigation.state.paramsrams)
    // @FIX step 1
    // add screenProps
    // alert('test ->', JSON.stringify(this.props))
    return (
      <SNDashboard navigation={this.props.navigation} /*screenProps={{ rootNavigation: this.props.navigation }}*/
        screenProps={{ deviceSize, professorKey, openDrawer, ...params }} />
    );
  }
}



const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
}); 