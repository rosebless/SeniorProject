import React from 'react';
import { View, } from 'react-native';

export default class Dashboard_Selection extends React.Component {

  componentWillMount = () => {
    // const { focus, byPass } = this.props.screenProps
    // console.log('Dashboard_Selection', byPass, focus)
    // byPass && this.props.navigation.navigate('Dashboard', { focus }) 
    // const focus = await AsyncStorage.getItem('byPassFocus')
    // AsyncStorage.removeItem('byPassFocus')
    // console.log('Dashboard_Selection', focus)
    // focus ? console.log('true') : console.log('false')
    // focus && this.props.navigation.navigate('Dashboard', { focus }) 
    // this.props.screenProps.byPass
    //   ? this.props.navigation.navigate('Dashboard') && this.props.screenProps.switchByPass()
    //   : 
    this.props.screenProps.setDescriptionForSelector('สรุปผล', require('../../pics/dashboardPage.png'), 'Dashboard')
    this.props.navigation.navigate('Selector')
  }

  render() {
    return (
      <View />
    );
  }
}
