import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, Image } from 'react-native';
import CustomButton from '../CustomButton'
import { Constants } from 'expo';

export default class TimePicker extends React.Component {
    constructor(props) {
        super(props)
        const hours = []
        const { deviceHeight, deviceWidth } = this.props.screenProps.deviceSize
        for (let i = 0; i < 24; i++) {
            const i_2digit = i.toString().length == 1
                ? [0, i].join('')
                : i.toString()
            hours.push(<Picker.Item style={{ fontSize: 1 / 10 * deviceHeight }} key={i.toString()} label={i.toString()} value={i_2digit.toString()} />)
        }
        const minutes = []
        for (let i = 0; i < 60 * 100; i++) {
            const j = i % 60
            minutes.push(<Picker.Item key={i.toString()} label={j.toString()} value={i.toString()} />)
        }
        const { btext } = this.props.navigation.state.params
        const [initHour, initMinute] = btext == 'เลือกเวลา' ? ['00', '00'] : btext.split(':')
        this.state = {
            state: 'Java',
            hours,
            minutes,
            hour: initHour,
            minute: initMinute,
            selectedMinute: initMinute == '00' ? '3000' : ['30', initMinute].join('')
        }
    }
    minuteValueChange = (value) => {
        if (value == '0' || value == '5999') {
            this.setState({ selectedMinute: '3000' })
        } else {
            const v = parseInt(value % 60)
            this.setState({ selectedMinute: value, minute: v.toString().length == 1 ? [0, v.toString()].join('') : v.toString() })
        }
    }

    summitButton = () => {
        const { updateTimeOnFirebase } = this.props.navigation.state.params
        const { minute, hour } = this.state
        // console.log('               ', updateTimeOnFirebase([hour, minute].join(':')))
        updateTimeOnFirebase([hour, minute].join(':'), () => {
            this.props.navigation.navigate('Manager')
        })
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
                        onPress={() => { this.props.navigation.navigate('Manager') }}>
                        <Image
                            style={{ width: 1 / 10 * 0.6 * deviceHeight, height: 1 / 10 * 0.6 * deviceHeight }}
                            source={require('../../pics/backButton.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.top}>
                    <Text style={{ fontSize: 1 / 15 * deviceHeight, paddingVertical: 1 / 50 * deviceHeight }} > {`กรุณากรอกเวลา ${timeText} `} </Text>
                </View>
                <View style={styles.center} >

                    <View style={{ position: 'absolute', height: 45, width: deviceWidth, borderWidth: 2, borderColor: '#0070C0', backgroundColor: 'transparent' }} />

                    <Picker
                        style={{
                            width: 1 / 2 * deviceWidth
                        }}
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
                    <View style={[styles.semi_top, { top: - 1 / 20 * deviceHeight, width: deviceWidth }]}>
                        <Text style={{
                            fontSize: 1 / 20 * deviceHeight,
                            paddingVertical: 1 / 60 * deviceHeight,
                        }} >
                            ชั่วโมง
                        </Text>
                        <Text style={{
                            fontSize: 1 / 20 * deviceHeight,
                            paddingVertical: 1 / 60 * deviceHeight,
                        }} >
                            นาที
                        </Text>
                    </View>
                </View>
                <View style={styles.bot} >
                    <CustomButton onPress={() => { this.summitButton() }}
                        style={{
                            height: 1 / 10 * deviceHeight,
                            width: 0.6 * deviceWidth,
                        }}
                        text={'ยืนยัน'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 25
    },
    top: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    semi_top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute'
    },
    center: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bot: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    summitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0070C0'
    },
    summitButtonText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#FFFFFF'
    }
});
