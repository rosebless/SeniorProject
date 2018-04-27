import React from 'react';
//import { StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation' ;

import LoginPage from './Login';
import RegisterPage from './Register';
import NavigatorMain from './mainNavigator/NavigatorMain';
import { Drawer } from 'native-base'; 

export default class NavigatorLogin extends React.Component {
  render() {
    return (
        < SNLogin />
    );
  }
}

const SNLogin = StackNavigator({
    Login: { screen: LoginPage } ,
    Register : { screen: RegisterPage } ,
    NM: { screen: NavigatorMain }
},{
    headerMode: 'none',
    headerVisible: false,
    //header: null
    navigationOptions: {
        gesturesEnabled: false
    }
});