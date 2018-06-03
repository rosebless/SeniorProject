import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Picker, Keyboard, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native';
import firebase from '../../config/firebase'
import CustomButton from '../CustomButton'
import { Dropdown } from 'react-native-material-dropdown'

export default class EditPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            week: [],
            status: [],
            time: [],
            weekOrigin: [],
            currentIndex: '',
            currentStatus: '',
            comment: '',
            statusChange: '',
            uploading: false
        }
    }

    dataStatus = [
        { id: 'atten', value: 'เข้าเรียน' },
        { id: 'late', value: 'มาสาย' },
        { id: 'absent', value: 'ขาดเรียน' }
        // { id: 'atten', value: ['เข้าเรียน','(',time[currentIndex],')'].join(' ') },
        // { id: 'late', value: ['มาสาย','(',time[currentIndex],')'].join(' ') },
        // { id: 'absert', value: ['ขาดเรียน','(',time[currentIndex],')'].join(' ') }
    ]

    componentDidMount = () => {
        this.setState({ uploading: true }, () => {
            this.getAttenOfStudent()
            this.keyboardDidHideListener()
        })
    }
    componentWillUnmount = () => {
        this.keyboardDidHideListener.remove();
    }
    keyboardDidHideListener() {
        this.keyboardDidHideListener =
            Keyboard
                .addListener('keyboardDidHide', this._keyboardDidHide);
    }
    _keyboardDidHide() {
        Keyboard.dismiss();
    }
    getAttenOfStudent = () => {
        const { student, attendance } = this.props.navigation.state.params
        const week = []
        const weekOrigin = []
        const status = []
        const time = []
        Object.keys(attendance).sort((a, b) => (a.split('-')[1] - b.split('-')[1])).forEach(weekKey => {
            objStudents = attendance[weekKey].students
            sudentAtten = objStudents[Object.keys(objStudents).find(key => key == student)]
            if (sudentAtten) {
                const weekText = []
                weekText.push(attendance[weekKey].date.split('-').filter((d, i) => i !== 0).reverse().join(' / '))
                weekText.push(this.readSession(attendance[weekKey].session))
                week.push({ value: weekText.join('  ') })
                weekOrigin.push(weekKey)
                status.push(sudentAtten.status)
                time.push(sudentAtten.time)
            }
        })
        this.setState({ week, weekOrigin, status, time, uploading: false })
    }
    readSession = (session) => (
        session === 'midnight'
            ? 'คาบ เช้าตรู่'
            : session === 'morning'
                ? 'คาบ เช้า'
                : session === 'afternoon'
                    ? 'คาบ บ่าย'
                    : session === 'evening'
                        ? 'คาบ เย็น'
                        : 'คาบ กลางคืน' //'night'
    )
    submitButton = () => {
        if (this.state.currentIndex !== '') {
            Alert.alert(
                'ยืนยันการเปลี่ยนแปลง',
                'ต้องการเปลี่ยนข้อมูล หรือไม่',
                [
                    {
                        text: 'ใช่', onPress: () => {
                            this.updateData()
                        }
                    },
                    { text: 'ไม่ใช่', onPress: () => { } }
                ],
                { cancellable: false }
            )
        }
    }
    updateData = () => {
        const { focus: { id }, userLogOn: { professorID } } = this.props.screenProps
        const { student, attendance } = this.props.navigation.state.params
        const { weekOrigin, status, currentIndex, statusChange, comment } = this.state
        console.log(` upload to /Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}/`)
        firebase.database().ref(`/Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}/status`).set(this.dataStatus.find(d => d.value === statusChange).id)
        firebase.database().ref(`/Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}/comment`).set(comment)

        // log 
        const option = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' } // day/month/year 
        const dateArr = new Date().toLocaleDateString('th-TH', option).split(' ')
        const date = [dateArr[0].split('/').join('-'), '(', 'dd-mm-yyyy', ')'].join(' ')
        const time = [dateArr[1].split(':').join('-'), '(', 'hh-mm-ss', ')'].join(' ')
        const log = {
            date,
            time,
            week: weekOrigin[currentIndex],
            professorID,
            student,
            change: [status[currentIndex], 'to', this.dataStatus.find(d => d.value === statusChange).id].join(' '),
            comment
        }
        firebase.database().ref(`/Subject/${id}/log/attendance/`).push(log)
        this.props.navigation.goBack()
    }
    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };
    render() {
        const { deviceHeight, deviceWidth } = this.props.screenProps.deviceSize
        const { week, status, time, currentIndex, statusChange } = this.state
        // console.log(week)
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
                <ScrollView style={{ backgroundColor: '#fff', height: deviceHeight, width: deviceWidth }} >
                    <View style={[styles.top, {
                        marginTop: 1 / 20 * deviceHeight + 25
                    }]}>
                        <Image
                            source={require('../../pics/editPage.png')}
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
                                fontSize: 1 / 25 * deviceHeight,
                                paddingVertical: 1 / 60 * deviceHeight
                            }]}>
                                {['รหัสนักศึกษา : ', this.props.navigation.state.params.student].join('')}
                            </Text>
                            {/* <Text style={[styles.itemDetail, {
                            fontSize: 1 / 25 * deviceHeight
                        }]}>
                            {focus.name}
                        </Text> */}
                        </View>
                    </View>
                    <View style={[styles.center, {
                        width: deviceWidth,
                        // marginTop: 1 / 20 * deviceHeight
                    }]} >
                        <View style={[styles.picker, {
                            width: deviceWidth,
                            // backgroundColor: 'red'
                            // marginTop: 1 / 20 * deviceHeight
                        }]} >
                            {/* <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                {'วันที่ : '}
                            </Text> */}
                            <Dropdown
                                label='วันเรียน : '
                                // itemColor='#0070C0'
                                // selectedItemColor='red'
                                containerStyle={{ width: 0.8 * deviceWidth }}
                                itemTextStyle={{ paddingVertical: 1 / 60 * deviceHeight }}
                                animationDuration={100}
                                data={week}
                                onChangeText={(item, i) => {
                                    this.setState({
                                        currentIndex: i,
                                        statusChange: this.dataStatus.find(d => d.id === status[i]).value
                                    })
                                }}
                            />
                            {/* <Picker
                                style={{ width: 1 / 2 * deviceWidth, backgroundColor: 'blue' }}
                                selectedValue={week[currentIndex]}
                                aspectRatio={1 / 20 * deviceHeight}
                                onValueChange={(value) => {
                                    const index = week.findIndex(item => item === value)
                                    this.setState({
                                        currentIndex: index,
                                        statusChange: status[index]
                                    })
                                }}
                            >
                                {
                                    week.map(item => (
                                        <Picker.Item style={{ fontSize: 1 / 10 * deviceHeight }} key={item} label={item} value={item} />
                                    ))
                                }
                            </Picker> */}
                        </View>
                        <View style={[styles.picker, {
                            width: deviceWidth,
                            // marginTop: 1 / 20 * deviceHeight
                        }]} >
                            {/* <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                {'สถานะ : '}
                            </Text> */}
                            <Dropdown
                                label='สถานะ : '
                                textColor={
                                    statusChange === 'เข้าเรียน'
                                        ? '#3eee26'
                                        : statusChange === 'มาสาย'
                                            ? '#ffc000'
                                            : '#ff0000'
                                }
                                // fontSize = {1 / 20 * deviceHeight}
                                // labelFontSize= {1 / 20 * deviceHeight}
                                containerStyle={{ width: 0.8 * deviceWidth }}
                                itemTextStyle={{ paddingVertical: 1 / 60 * deviceHeight }}
                                animationDuration={100}
                                data={this.dataStatus}
                                value={statusChange}
                                onChangeText={(value) => this.setState({ statusChange: value })}
                            />
                            {/* <Picker
                                style={{ height: 3 / 20 * deviceHeight, width: 1 / 2 * deviceWidth }}
                                selectedValue={this.state.statusChange}
                                onValueChange={(value) => this.setState({ statusChange: value })}
                            >
                                <Picker.Item style={{ fontSize: 1 / 10 * deviceHeight }} key={1} label={'เข้าเรียน'} value={'atten'} />
                                <Picker.Item style={{ fontSize: 1 / 10 * deviceHeight }} key={2} label={'มาสาย'} value={'late'} />
                                <Picker.Item style={{ fontSize: 1 / 10 * deviceHeight }} key={3} label={'ขาดเรียน'} value={'absent'} />
                            </Picker> */}
                        </View>
                        <View style={[styles.text, {
                            // height: 1 / 20 * deviceHeight,
                            width: 0.8 * deviceWidth,
                            marginTop: 1 / 30 * deviceHeight
                        }]} >
                            <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                {'หมายเหตุ : '}
                            </Text>
                        </View>
                        <TextInput
                            style={{
                                height: 3 / 20 * deviceHeight,
                                width: 0.8 * deviceWidth,
                                borderColor: 'black',
                                borderWidth: 2,
                                fontSize: 1 / 30 * deviceHeight,
                                paddingVertical: 1 / 80 * deviceHeight,
                            }}
                            underlineColorAndroid='#0070C0'
                            // placeholder='กรุณากรอกรหัสนักศึกษา'
                            multiline
                            maxLength={200}
                            onChangeText={(Text) => { this.setState({ comment: Text }) }} />
                        {/* <View style={[styles.text, { 
                            height: 1 / 20 * deviceHeight, 
                            width: 0.8 * deviceWidth
                            }]} >
                            <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} >
                                {['เวลา : ', time[currentIndex] ].join('')}
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
                        </View> */}
                    </View>
                    <View style={[styles.bot, {
                        height: 3 / 20 * deviceHeight,
                        width: deviceWidth,
                        marginTop: 1 / 20 * deviceHeight
                    }]} >
                        <CustomButton onPress={() => { this.props.navigation.goBack() }}
                            style={{
                                height: 1 / 10 * deviceHeight,
                                width: 4 / 10 * deviceWidth,
                                marginLeft: 2 / 10 / 3 * deviceWidth,
                            }}
                            text={'ย้อนกลับ'}
                        />
                        <CustomButton onPress={() => { this.submitButton() }}
                            style={{
                                height: 1 / 10 * deviceHeight,
                                width: 4 / 10 * deviceWidth,
                                marginLeft: 2 / 10 / 3 * deviceWidth
                            }}
                            text={'ยืนยัน'}
                        />
                    </View>
                </ScrollView>
                {this._maybeRenderUploadingOverlay()}
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
    picker: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
