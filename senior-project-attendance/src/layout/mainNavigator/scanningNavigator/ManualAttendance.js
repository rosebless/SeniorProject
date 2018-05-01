import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
//port { Icon } from 'native-base'
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class ManualAttendance extends React.Component {

    state = {
        student: '000000'
    }

    render() {
        const { deviceSize: { deviceHeight, deviceWidth }, focus, attendance } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }} />
                <View style={styles.top}>
                    <Image
                        source={focus.ImageProduct}
                        style={{
                            height: 1 / 10 * deviceHeight,
                            width: 1 / 10 * deviceHeight,
                            marginLeft: 2 / 10 / 3 * deviceWidth
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
                            fontSize: 1 / 40 * deviceHeight
                        }]}>
                            {focus.subjectCode}
                        </Text>
                        <Text style={[styles.itemDetail, {
                            fontSize: 1 / 40 * deviceHeight
                        }]}>
                            {focus.subjectName}
                        </Text>
                        { // condition && expression => if(conditon) expression it is short if without else 
                            focus.section
                            && (
                                <Text style={[styles.itemCode, {
                                    fontSize: 1 / 40 * deviceHeight
                                }]}>
                                    ( Sec {focus.section} )
                             </Text>
                            )
                        }
                    </View>
                </View>
                <View style={styles.center} >
                    <View style={[styles.text, {
                        height: 1 / 20 * deviceHeight,
                        width: 0.8 * deviceWidth
                    }]} >
                        <Text style={{ fontSize: 1 / 40 * deviceHeight }} > รหัสนักศึกษา : </Text>
                    </View>
                    <TextInput
                        style={{
                            height: 1.5 / 20 * deviceHeight,
                            width: 0.8 * deviceWidth,
                            fontSize: 1 / 30 * deviceHeight
                        }}
                        underlineColorAndroid='#0070C0'
                        placeholder='กรุณากรอกรหัสนักศึกษา'
                        onChangeText={(Text) => { this.setState({ student: Text }) }} />
                    <Text>

                    </Text>

                </View>

                <View style={styles.bot} />

                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={[styles.botButton, {
                    height: 1 / 10 * deviceHeight,
                    width: 4 / 10 * deviceWidth,
                    left: 2 / 10 / 3 * deviceWidth,
                    bottom: 1.5 / 20 * deviceHeight,
                    borderRadius: 1 / 3 * 1 / 10 * deviceHeight
                }]} >
                    <Text style={[styles.botButtonText, {
                        fontSize: 1 / 20 * deviceHeight
                    }]} >
                        ย้อนกลับ
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { attendance(this.state.student) }} style={[styles.botButton, {
                    height: 1 / 10 * deviceHeight,
                    width: 4 / 10 * deviceWidth,
                    right: 2 / 10 / 3 * deviceWidth,
                    bottom: 1.5 / 20 * deviceHeight,
                    borderRadius: 1 / 3 * 1 / 10 * deviceHeight
                }]} >
                    <Text style={[styles.botButtonText, {
                        fontSize: 1 / 20 * deviceHeight
                    }]} >
                        ยืนยัน
                </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 25
    },
    top: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    center: {
        flex: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bot: {
        flex: 7,
    },
    botButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#0070C0'
    },
    botButtonText: {
        //flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    text: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
