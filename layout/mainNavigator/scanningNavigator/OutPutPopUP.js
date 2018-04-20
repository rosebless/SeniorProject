import React from 'react';
import { LayoutAnimation, Text, View, StyleSheet, TouchableOpacity, Button, Image, Animated } from 'react-native';

class OutPutPopUP extends React.Component {
    constructor(props) {
        super(props)
        const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
        this.state = {
            deviceHeight,
            deviceWidth,
            yPosition: new Animated.Value(1 / 10 * deviceHeight)
        }
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.yPosition, {
                toValue: 0,
                duration: 500
            }),
            Animated.timing(this.state.yPosition, {
                toValue: 1 / 10 * this.state.deviceHeight,
                duration: 500
            })
        ])
            .start();       // many event use Animated.parallel([event1,event2])

    }

    render() {
        let animetionStyle = {
            transform: [{ transparentY: this.state.yPosition }]
        }
        const { deviceHeight, deviceWidth } = this.state
        return (
            <Animated.View style={[styles.topBar, animetionStyle, { height: 1 / 10 * deviceHeight }]}>
                <Image
                    source={this.props.icon}
                    style={[styles.statusIcon, {
                        height: 1 / 10 * 7 / 10 * deviceHeight,
                        width: 1 / 10 * 7 / 10 * deviceHeight,
                    }]}
                />
                <Text numberOfLines={1} style={[styles.codeText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                    {this.props.key}
                </Text>
                <Text style={[styles.successText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                    {this.props.text}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({

    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        //backgroundColor: rgb(255,255,255,0.3),
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIcon: {
        marginLeft: 10,
    },
    codeText: {
        flex: 1,
        color: '#000',
        textAlignVertical: "center",
        textAlign: 'center',
    },
    successText: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
    },

});
