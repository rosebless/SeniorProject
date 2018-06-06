import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, Keyboard, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native';
import firebase from '../../config/firebase'
import CustomButton from '../CustomButton'
import { Dropdown } from 'react-native-material-dropdown'

export default class EditPage extends React.Component {
    state = {
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
            objStudents = attendance[weekKey].students || {}
            sudentAtten = objStudents[Object.keys(objStudents).find(key => key == student)]
            const weekText = []
            weekText.push(attendance[weekKey].date.split('-').join(' / '))
            weekText.push(['(','คาบที่',weekKey.split('-')[1],')'].join(' '))
            week.push({ value: weekText.join('  ') })
            weekOrigin.push(weekKey)
            if (sudentAtten) {
                status.push(sudentAtten.status)
                time.push(sudentAtten.time)
            } else {
                status.push('absent')
                time.push('')
            }
        })
        this.setState({ week, weekOrigin, status, time, uploading: false })
    }
    submitButton = () => {
        if (this.state.currentIndex === '') {
            Alert.alert(
                'กรุณาเลือกคาบเรียน',
                '',
                [
                    {
                        text: 'ตกลง', onPress: () => { }
                    } 
                ],
                { cancellable: false }
            )
        }else{
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
        const statusToSet = this.dataStatus.find(d => d.value === statusChange).id
        firebase.database().ref(`/Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}`).update({ status: statusToSet, comment })
        // firebase.database().ref(`/Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}/status`).set(statusToSet)
        // firebase.database().ref(`/Subject/${id}/attendance/${weekOrigin[currentIndex]}/students/${student}/comment`).set(comment)

        // log 
        const option = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' } // day/month/year hh:mm:ss
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
                        </View>
                    </View>
                    <View style={[styles.center, { width: deviceWidth }]} >
                        <View style={[styles.picker, { width: deviceWidth }]} >
                            <Dropdown
                                label='คาบเรียน : '
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
                        </View>
                        <View style={[styles.picker, { width: deviceWidth }]} >
                            <Dropdown
                                label='สถานะ : '
                                textColor={
                                    statusChange === 'เข้าเรียน'
                                        ? '#3eee26'
                                        : statusChange === 'มาสาย'
                                            ? '#ffc000'
                                            : '#ff0000'
                                }
                                containerStyle={{ width: 0.8 * deviceWidth }}
                                itemTextStyle={{ paddingVertical: 1 / 60 * deviceHeight }}
                                animationDuration={100}
                                data={this.dataStatus}
                                value={statusChange}
                                onChangeText={(value) => this.setState({ statusChange: value })}
                            />
                        </View>
                        <View style={[styles.text, {
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
                            multiline
                            maxLength={200}
                            onChangeText={(Text) => { this.setState({ comment: Text }) }} />
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
