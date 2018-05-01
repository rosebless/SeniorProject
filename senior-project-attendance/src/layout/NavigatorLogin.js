import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginPage from './Login';
import RegisterPage from './Register';
import NavigatorMain from './mainNavigator/NavigatorMain';

export default class NavigatorLogin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { deviceSize } = this.props
        return (
            <SNLogin screenProps={{ deviceSize }} />
        );
    }
}

const SNLogin = StackNavigator({
    Login: { screen: LoginPage },
    Register: { screen: RegisterPage },
    NM: { screen: NavigatorMain }
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    });