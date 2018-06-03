import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import DrawerNavigator from './DrawerNavigator';

// class NavigatorLogin extends React.Component {
//     render() {
//         const { deviceSize } = this.props
//         return (
//             <SNLogin screenProps={{ deviceSize }} />
//         );
//     }
// }

export default createStackNavigator({
    Login,
    Register,
    DrawerNavigator
}, {
        headerMode: 'none',
        headerVisible: false,
        //header: null
        navigationOptions: {
            gesturesEnabled: false
        }
    });