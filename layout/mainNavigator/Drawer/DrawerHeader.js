import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {  } from 'react-navigation'

export default class DrawerHeader extends Component {
    render() {

        // @FIX step 3
        // genarate function fnNavigate detech by rootNavigation props
        // Now.
        // Main and Profile Screen => this.props.rootNavigation is undifine
        // subjectNavigate Screen =>  this.props.rootNavigation is object
        // your can see with log in XDE

        console.log('DrawerHeader:all props', this.props);
        console.log(
            'DrawerHeader:rootNavigation props',
            this.props.rootNavigation
        );
        console.log(
            'DrawerHeader:navigation props',
            this.props.navigation
        );

        const fnNavigate = this.props.rootNavigation
            ? this.props.rootNavigation.navigate
            : this.props.navigation.navigate;
        const { navigate } = this.props.navigation;
        return (<View style={{
            height: 60,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#00CED1',
        }}>
            <TouchableOpacity style={{ margin:10 }}
                onPress={() => {
                    // @FIX step 4
                    // call fnNavigate function
                    fnNavigate('DrawerOpen');
                    // navigate('DrawerOpen');
                    // alert(5555);
                    // alert(JSON.stringify(this.props.navigation))
                }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require('../../../pics/iconDrawerHeader.png')}
                />
            </TouchableOpacity>
        </View>);
    }
}