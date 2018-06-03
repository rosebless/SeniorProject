import React from 'react';
import { View, Image, AsyncStorage } from 'react-native';
// import AppVarible from '../../../Model/AppVarible'
import SelectorPage from '../Selector'

export default class Dashboard_Selection extends React.Component {

  // static navigationOptions = ({ navigation }) => ({
  //   title: 'สรุป',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../../pics/temp5.png')}
  //       style={{
  //         width: 24,
  //         height: 24,
  //       }}
  //     />
  //   )
  // })

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
    this.props.screenProps.setDescriptionForSelector('สรุปผล',require('../../pics/dashboardPage.png'), 'Dashboard') 
    this.props.navigation.navigate('Selector')
  
  }

  render() {
    console.log('Dashboard_Selection', this.props.screenProps)
    return (
      <View />
    );
  }
}
