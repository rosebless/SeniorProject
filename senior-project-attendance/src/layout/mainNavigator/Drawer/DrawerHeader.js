import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, TouchableOpacity, Alert
} from 'react-native';
import { } from 'react-navigation'
import AppVarible from '../../../Model/AppVarible';

export default class DrawerHeader extends Component {
    render() {

        // @FIX step 3
        // genarate function fnNavigate detech by rootNavigation props
        // Now.
        // Main and Profile Screen => this.props.rootNavigation is undifine
        // subjectNavigate Screen =>  this.props.rootNavigation is object
        // your can see with log in XDE

        // console.log('DrawerHeader:all props', this.props);
        // console.log(
        //     'DrawerHeader:rootNavigation props',
        //     this.props.rootNavigation
        // );
        // console.log(
        //     'DrawerHeader:navigation props',
        //     this.props.navigation
        // );

        // const fnNavigate = this.props.screenProps.drawerNavigation
        //     ? this.props.screenProps.drawerNavigation.navigate            // navigate from sub-navigator of drawer
        //     : this.props.navigation.navigate;               // navigate from drawer 

        // let mainNavigate = (screen) => Alert.alert(
        //     'Error', ` status = ${AppVarible.appVarible.navigationSaved.main.status} 
        //     navigate = ${AppVarible.appVarible.navigationSaved.main.navigate} 
        //     navigationSaved = ${AppVarible.appVarible.navigationSaved}
        //     `
        // )
        // if (AppVarible.appVarible.navigationSaved.main.status) {
        //     mainNavigate = AppVarible.appVarible.navigationSaved.main.navigate
        // }

        const { deviceHeight, drawerNavigate } = this.props

        return (<View style={{
            height: 1 / 10 * deviceHeight,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#00CED1',
        }}>
            <TouchableOpacity style={{ margin: 1 / 10 * 0.2 * deviceHeight }}
                onPress={() => {
                    // @FIX step 4
                    // call fnNavigate function
                    drawerNavigate('DrawerOpen')       //fnNavigate('DrawerOpen');
                    // navigate('DrawerOpen');
                    // alert(5555);
                    // alert(JSON.stringify(this.props.navigation))
                }}>
                <Image
                    style={{ width: 1 / 10 * 0.6 * deviceHeight, height: 1 / 10 * 0.6 * deviceHeight }}
                    source={require('../../../pics/iconDrawerHeader.png')}
                />
            </TouchableOpacity>
        </View>);
    }
}