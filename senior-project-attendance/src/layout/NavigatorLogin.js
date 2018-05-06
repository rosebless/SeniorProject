import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import NMain from './mainNavigator/NavigatorMain';

export default class NavigatorLogin extends React.Component {
    render() {
        const { deviceSize } = this.props
        return (
            <SNLogin screenProps={{ deviceSize }} />
        );
    }
}

const SNLogin = createStackNavigator({
    Login,
    Register,
    NMain
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    });