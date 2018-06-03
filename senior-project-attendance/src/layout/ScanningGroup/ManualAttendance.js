import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, DeviceEventEmitter, Dimensions } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
//port { Icon } from 'native-base'
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import Keyboard from 'react-native-keyboard';
import CustomButton from '../CustomButton'

// var KeyboardEvents = require('react-native-keyboardevents');
// var KeyboardEventEmitter = KeyboardEvents.Emitter;

export default class ManualAttendance extends React.Component {

    state = {
        student: '000000',
        textOutput: 'รอกรอกข้อมูล',
        textOutputColor: 'black',
        // visibleHeight: Dimensions.get('window').height,
        // keyboardSpace: 0
    }

    // updateKeyboardSpace(frames) {
    //     this.setState({keyboardSpace: frames.end.height});
    //   }

    //   resetKeyboardSpace() {
    //     this.setState({keyboardSpace: 0});
    //   }

    //   componentDidMount() {
    //     KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    //     KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
    //   }

    //   componentWillUnmount() {
    //     KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    //     KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
    //   }

    // componentDidMount() {
    //     model.onChange((model) => {
    //         this.setState({student: model.getKeys().join('')});
    //     });
    // }

    // _handleClear() {
    //     model.clearAll();
    // }

    // _handleDelete() {
    //     model.delKey();
    // }

    // _handleKeyPress(key) {
    //     model.addKey(key);
    // }

    checkSuccess = (text) => {
        this.setState({
            textOutput: text,
            textOutputColor: '#3eee26'
        })
    }

    checkWarning = (text) => {
        this.setState({
            textOutput: text,
            textOutputColor: '#ffc000'
        })
    }

    checkFail = (text) => {
        this.setState({
            textOutput: text,
            textOutputColor: '#ff0000'
        })
    }

    finishingOutput = () => {
        setTimeout(() => {
            this.setState({
                textOutput: 'รอกรอกข้อมูล',
                textOutputColor: 'black'
            })
        }, 3000)
    }

    render() {
        console.log('Manual Props.navigation', this.props.navigation)
        const { deviceSize: { deviceHeight, deviceWidth }, focus } = this.props.screenProps
        const { attendance } = this.props.navigation.state.params
        const { student, textOutput, textOutputColor } = this.state
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
                <ScrollView style={{ height: deviceHeight, width: deviceWidth }} >
                    <View style={[styles.top, {
                        marginTop: 1 / 20 * deviceHeight + 25
                    }]}>
                        <Image
                            source={require('../../pics/sacnningManualPage.png')}
                            style={{
                                height: 3 / 20 * deviceHeight,
                                width: 3 / 20 * deviceHeight,
                                marginLeft: 0.05 * deviceWidth
                            }} />
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: 0.5 / 10 * deviceWidth,
                            width: (1 - 4 / 10 / 3 - 0.5 / 10) * deviceWidth,
                            flexWrap: "wrap"
                        }}>
                            <Text style={[styles.itemName, {
                                fontSize: 1 / 25 * deviceHeight
                            }]}>
                                {focus.code}
                            </Text>
                            <Text style={[styles.itemDetail, {
                                fontSize: 1 / 25 * deviceHeight
                            }]}>
                                {focus.name}
                            </Text>
                            { // condition && expression => if(conditon) expression it is short if without else 
                                focus.section
                                && (
                                    <Text style={[styles.itemCode, {
                                        fontSize: 1 / 25 * deviceHeight
                                    }]}>
                                        ( Sec {focus.section} )
                             </Text>
                                )
                            }
                        </View>
                    </View>
                    <View style={[styles.center, {
                        width: deviceWidth,
                        marginTop: 1 / 20 * deviceHeight
                    }]} >
                        <View style={[styles.text, {
                            height: 1 / 20 * deviceHeight,
                            width: 0.8 * deviceWidth
                        }]} >
                            <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                รหัสนักศึกษา :
                        </Text>
                        </View>
                        <TextInput
                            style={{
                                height: 1.5 / 20 * deviceHeight,
                                width: 0.8 * deviceWidth,
                                fontSize: 1 / 30 * deviceHeight,
                                paddingVertical: 1 / 120 * deviceHeight
                            }}
                            underlineColorAndroid='#0070C0'
                            placeholder='กรุณากรอกรหัสนักศึกษา'
                            keyboardType='numeric'
                            maxLength={8}
                            onChangeText={(Text) => { this.setState({ student: Text }) }} />

                        <View style={[styles.text, {
                            height: 1 / 0 * deviceHeight,
                            width: 0.8 * deviceWidth
                        }]} >
                            <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                สถานะ :
                        </Text>
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 50 * deviceHeight, color: textOutputColor }} >
                                {textOutput}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.bot, {
                        height: 3 / 20 * deviceHeight,
                        width: deviceWidth,
                        marginTop: 6 / 20 * deviceHeight
                    }]} >
                        <CustomButton onPress={() => { this.props.navigation.goBack() }}
                            style={{
                                height: 1 / 10 * deviceHeight,
                                width: 4 / 10 * deviceWidth,
                                marginLeft: 2 / 10 / 3 * deviceWidth,
                            }}
                            text={'ย้อนกลับ'}
                        />
                        <CustomButton onPress={() => { attendance(student, this.checkSuccess, this.checkWarning, this.checkFail, this.finishingOutput) }}
                            style={{
                                height: 1 / 10 * deviceHeight,
                                width: 4 / 10 * deviceWidth,
                                marginLeft: 2 / 10 / 3 * deviceWidth,
                                // bottom: 1.5 / 20 * deviceHeight,
                                // position: 'absolute'
                            }}
                            text={'ยืนยัน'}
                        />
                    </View>
                    {/* </KeyboardAvoidingView> */}
                    {/* <TouchableOpacity onPress={() => { attendance(student, this.checkSuccess, this.checkWarning, this.checkFail, this.finishingOutput) }} style={[styles.botButton, {
                    height: 1 / 10 * deviceHeight,
                    width: 4 / 10 * deviceWidth,
                    left: 2 / 10 / 3 * deviceWidth,
                    bottom: 1.5 / 20 * deviceHeight,
                    borderRadius: 1 / 3 * 1 / 10 * deviceHeight
                }]} >
                    <Text style={[styles.botButtonText, {
                        fontSize: 1 / 15 * deviceHeight,
                        paddingVertical: 1 / 60 * deviceHeight
                    }]} >
                        ย้อนกลับ
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { attendance(student, this.checkSuccess, this.checkWarning, this.checkFail, this.finishingOutput) }} style={[styles.botButton, {
                    height: 1 / 10 * deviceHeight,
                    width: 4 / 10 * deviceWidth,
                    right: 2 / 10 / 3 * deviceWidth,
                    bottom: 1.5 / 20 * deviceHeight,
                    borderRadius: 1 / 3 * 1 / 10 * deviceHeight
                }]} >
                    <Text style={[styles.botButtonText, {
                        fontSize: 1 / 15 * deviceHeight,
                        paddingVertical: 1 / 60 * deviceHeight
                    }]} >
                        ยืนยัน
                </Text>
                </TouchableOpacity> */}

                    {/* <Keyboard
                    keyboardType="decimal-pad"
                    // onClear={this._handleClear.bind(this)}
                    // onDelete={this._handleDelete.bind(this)}
                    // onKeyPress={this._handleKeyPress.bind(this)}
                /> */}

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // position: 'relative',
        marginTop: 25
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bot: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center'
    },
    botButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0070C0'
    },
    botButtonText: {
        //flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
