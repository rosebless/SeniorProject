import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class CustomDrawerItem extends React.Component {
    render() {
        const { label, page, photo, status, navigation: { navigate }, drawerWidth, deviceHeight, changeActivateStatus } = this.props
        return (
            <View style={[styles.container, {
                width: drawerWidth,
                marginVertical: 1 / 15 * 0.1 * deviceHeight
            }]} >
                <TouchableOpacity onPress={() => { changeActivateStatus(); navigate(page) }} style={[styles.button, {
                    height: 1 / 15 * deviceHeight,
                    width: drawerWidth,
                    // right: 1 / 20 * deviceWidth,
                    // bottom: 1.5 / 20 * deviceHeight,
                }]} >
                    <Image
                        source={photo}
                        style={{
                            marginLeft: 1 / 15 * 0.5 * deviceHeight,
                            height: 1 / 15 * 0.8 * deviceHeight,
                            width: 1 / 15 * 0.8 * deviceHeight,
                            marginVertical: 1 / 15 * 0.1 * deviceHeight
                        }} />
                    <Text style={[styles.buttonText, {
                        marginLeft: 1 / 15 * 0.3 * deviceHeight,
                        fontSize: 1 / 25 * deviceHeight,
                        padding: 1 / 70 * deviceHeight, 
                        color: status ? 'red' : 'black'
                    }]}  >
                        {label}
                    </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#0070C0' #EDEDED
        // backgroundColor: '#EDEDED'
    },
    buttonText: {
        //flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    icon: {
        width: 24,
        height: 24,
    },
});


