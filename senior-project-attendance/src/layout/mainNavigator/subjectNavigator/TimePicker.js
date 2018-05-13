import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Constants } from 'expo';

export default class TimePicker extends React.Component {

    constructor(props) {
        super(props)
        const hours = []
        for (let i = 0; i < 24; i++) {
            // const item = i.toString().length == 1
            //     ? [0, i].join('')
            //     : i.toString()
            hours.push(<Picker.Item key={i.toString()} label={i.toString()} value={i.toString()} />)
        }
        const minutes = []
        for (let i = 0; i < 60 * 100; i++) {
            const j = i % 60
            minutes.push(<Picker.Item key={i.toString()} label={j.toString()} value={i.toString()} />)
        }
        this.state = {
            state: 'Java',
            hours,
            minutes,
            hour: '',
            minute: '',
            selectedMinute: '3000'
        }
    }

    minuteValueChange = (value) => {
        if (value == '0' || value == '5999') {
            this.setState({ selectedMinute: '3000' })
        } else {
            this.setState({ selectedMinute: value, minute: value%60 })
        }
    }

    summitButton = () => {
        const { updateTimeOnFirebase } = this.props.navigation.state.params
        const { minute, hour } = this.state
        updateTimeOnFirebase([hour, minute].join(':')) 
        this.props.navigation.goBack()
    }

    render() {
        const { minutes, hours } = this.state
        const { deviceHeight, deviceWidth } = this.props.screenProps.deviceSize
        const { timeText } = this.props.navigation.state.params
        return (
            <View style={styles.container} >

                <View style={{
                    height: 1 / 10 * deviceHeight,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#00CED1',
                }}>
                    <TouchableOpacity style={{ margin: 1 / 10 * 0.2 * deviceHeight }}
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            style={{ width: 1 / 10 * 0.6 * deviceHeight, height: 1 / 10 * 0.6 * deviceHeight }}
                            source={require('../../../pics/temp3.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.top}>
                    <Text style={{ fontSize: 1.5 / 40 * deviceHeight }} > {`กรุณากรอกเวลา ${timeText} `} </Text>
                </View>

                <View style={styles.center} >
                    <Picker
                        style={{ width: 1 / 2 * deviceWidth }}
                        selectedValue={this.state.hour}
                        onValueChange={(value) => this.setState({ hour: value })}
                    >
                        {
                            hours
                        }
                    </Picker>
                    <Picker
                        style={{ width: 1 / 2 * deviceWidth }}
                        selectedValue={this.state.selectedMinute}
                        onValueChange={(value) => this.minuteValueChange(value)}
                    >
                        {
                            minutes
                        }
                    </Picker>
                </View>

                <View style={styles.bot} >
                    <TouchableOpacity onPress={() => { this.summitButton() }} style={[styles.summitButton, {
                        height: 1 / 10 * deviceHeight,
                        width: 0.6 * deviceWidth,
                        // bottom: 1 / 20 * deviceHeight,
                        borderRadius: 1 / 3 * 1 / 10 * deviceHeight
                    }]} >
                        <Text style={[styles.summitButtonText, {
                            fontSize: 1 / 20 * deviceHeight
                        }]} >
                            ยืนยัน
                            </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#fff',
        // justifyContent: 'center',
        marginTop: 25
    },
    top: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bot: {
        flex: 6,
justifyContent: 'center',
        alignItems: 'center'
    },
    summitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        backgroundColor: '#0070C0'
    },
    summitButtonText: {
        //flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    }
});
