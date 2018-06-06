
import React from 'react';
import { Alert, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity, Image, Animated, ActivityIndicator } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import firebase from '../../config/firebase'
import CustomButton from '../CustomButton'

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    lastScannedCode: null,
    students: {},
    studentsInClass: [],
    studentsOld: {},
    timeIn: '',
    timeLate: '',
    timeOut: '',
    date: '',
    weekDay: '',
    classKey: '',
    statusColor: 'white',
    statusOutput: 'eiei',
    offsetY: new Animated.Value(0),
    enabledBackButton: true,
    uploading: false
  }

  static navigationOptions = ({ navigation }) => ({
    header: false,
  });

  componentDidMount() {
    this.setState({ uploading: true }, () => {
      this._requestCameraPermission();
      this.getStudentFormFirebase()
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/Subject').child(this.props.screenProps.focus.id).off('value')
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedCode) {
      LayoutAnimation.spring();
      this.setState({ lastScannedCode: result.data });
      this.attendance(result.data, this.checkSuccess, this.checkWarning, this.checkFail, this.finishingOutput)
    };
  }

  getStudentFormFirebase = () => {
    const { focus: { id }, userLogOn: { professorID } } = this.props.screenProps
    firebase.database().ref('/Subject').child(id).on('value', snapshot => {
      const objSubject = snapshot.val()
      const studentsInClass = Object.keys(objSubject.students)
      this.setState({ studentsInClass })
      const currentProfessorKey = Object.keys(objSubject.professors).find(key => objSubject.professors[key].professorID == professorID)
      this.getTimeForAttendance(objSubject.attendance, objSubject.professors[currentProfessorKey].timeIn, objSubject.professors[currentProfessorKey].timeLate, objSubject.professors[currentProfessorKey].timeOut, objSubject.professors[currentProfessorKey].weekDay)
      // this.genData()
    })
  }

  genData = () => {
    const { students, studentsInClass } = this.state
    studentsInClass.forEach(student => {
      const rand = Math.random()
      const status = rand < 0.7
        ? 'atten'
        : rand < 0.9
          ? 'late'
          : 'absent'
      students[student] = {
        status,
        time: 'this is create by generator',
        timeIn: 'this is create by generator',
        timeLate: 'this is create by generator',
        timeOut: 'this is create by generator'
      }
    })
  }

  getTimeForAttendance = (attendance = [], timeIn = '', timeLate = '', timeOut = '', weekDay = '') => {
    const option = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' } // วันพฤหัสบดี day/month/year hh:mm
    const todayArr = (new Date().toLocaleDateString('th-TH', option)).split(' ')
    const weekDayOfToDay = todayArr[0]
    const today = todayArr[1].split('/').join('-')
    const [hour, minute] = todayArr[2].split(':')
    const [hourIn, minuteIn] = timeIn.split(':')
    const [hourOut, minuteOut] = timeOut.split(':')

    if (timeIn === '' || timeLate === '' || timeOut === '' || weekDay === '') {
      Alert.alert(
        'ยังไม่ได้ตั้งค่าเวลา',
        'กรุณาตรวจสอบการตั้งค่าเวลา \n ไปยังหน้าตั้งค่าเวลา',
        [
          {
            text: 'ตกลง', onPress: () => {
              this.props.screenProps.setDescriptionForSelector('รายวิชา', require('../../pics/manageSubjectPage.png'), 'Manager')
              this.props.screenProps.changeActivateStatus(2)
              this.props.navigation.navigate('Manager')
            }
          },
          { text: 'ยกเลิก', onPress: () => { this.props.navigation.navigate('Selector') } },
        ],
        { cancellable: false }
      )
    } else if (weekDay === weekDayOfToDay
      && (parseInt(hourIn, 10) < parseInt(hour, 10) || (hourIn === hour && parseInt(minuteIn, 10) <= parseInt(minute, 10)))
      && (parseInt(hour, 10) < parseInt(hourOut, 10) || (hour === hourOut && parseInt(minute, 10) <= parseInt(minuteOut, 10)))
    ) {
      const classKey = Object.keys(attendance).find(key => {
        const [hourInLastModify, minuteInLastModify] = attendance[key].timeInLastModify ? attendance[key].timeInLastModify.split(':') : '00:00'
        const [hourOutLastModify, minuteOutLastModify] = attendance[key].timeOutLastModify ? attendance[key].timeOutLastModify.split(':') : '00:01'
        return (attendance[key].date === today &&
          !(
            parseInt(hourOut, 10) < parseInt(hourInLastModify, 10) || (hourOut === hourInLastModify && parseInt(minuteOut, 10) <= parseInt(minuteInLastModify, 10)) || // timeOut <= attendance[key].timeIn 
            parseInt(hourOutLastModify, 10) < parseInt(hourIn, 10) || (hourOutLastModify === hourIn && parseInt(minuteOutLastModify, 10) <= parseInt(minuteIn, 10)) // attendance[key].timeOut <= timeIn
          ))
      })
      // const classKey = undefined
      classKey
        ? this.setState({ classKey, studentsOld: attendance[classKey].students || {} })
        : this.setState({ classKey: ['week', Object.keys(attendance).length + 1].join('-') })
      this.setState({ uploading: false, timeIn, timeLate, timeOut, date: today, weekDay: weekDayOfToDay })
    } else {
      Alert.alert(
        'เวลาไม่ถูกต้อง',
        'กรุณาตรวจสอบการตั้งค่าเวลา \n ไปยังหน้าตั้งค่าเวลา',
        [
          {
            text: 'ตกลง', onPress: () => {
              this.props.screenProps.setDescriptionForSelector('รายวิชา', require('../../pics/manageSubjectPage.png'), 'Manager')
              this.props.screenProps.changeActivateStatus(2)
              this.props.navigation.navigate('Manager')
            }
          },
          { text: 'ยกเลิก', onPress: () => { this.props.navigation.navigate('Selector') } },
        ],
        { cancellable: false }
      )
    }
  }

  attendance = (student, checkSuccess, checkWarning, checkFail, finishingOutput) => {
    console.log(this.isInClass(student))
    if (this.isInClass(student) && !this.isDuplicate(student)) { //ตรวจสอบรายชื่อ  
      this.updateStudens(student, checkSuccess, checkWarning, checkFail)
    } else if (this.isDuplicate(student)) { // เคยเช็คไปแล้ว 
      checkWarning('ข้อมูลซ้ำ')
    } else { // ไม่มีอยู่ในรายชื่อ
      checkFail('ไม่สำเร็จ')
    }
    // Animation output 
    finishingOutput()
  }

  checkSuccess = (text) => {
    this.setState({
      statusColor: '#3eee26',
      statusOutput: text
      //studentsText
    })
  }

  checkWarning = (text) => {
    this.setState({
      statusColor: '#ffc000',
      statusOutput: text
    })
  }

  checkFail = (text) => {
    this.setState({
      statusColor: '#ff0000',
      statusOutput: text
    })
  }

  finishingOutput = () => {
    this.setState({ enabledBackButton: false })
    const { deviceHeight } = this.props.screenProps.deviceSize
    Animated.sequence([
      Animated.timing(this.state.offsetY, {
        toValue: 1 / 10 * deviceHeight,
        duration: 1000
      }),
      Animated.timing(this.state.offsetY, {
        toValue: 0,
        duration: 1000,
        delay: 1000
      })
    ]).start(() => {
      this.setState({ enabledBackButton: true })
    });

  }

  updateStudens = (student, checkSuccess, checkWarning, checkFail) => {
    const { timeIn, timeLate, timeOut } = this.state
    const date = new Date()
    const [hour, minute, second] = [date.getHours().toLocaleString('th-TH'), date.getMinutes().toLocaleString('th-TH'), date.getSeconds().toLocaleString('th-TH')]
    console.log('test', minute, hour)
    const [hourIn, minuteIn] = parseInt(timeIn.split(':')[1]) - 30 < 0
      ? [parseInt(timeIn.split(':')[0]) - 1, parseInt(timeIn.split(':')[1]) + 30]
      : [parseInt(timeIn.split(':')[0]), parseInt(timeIn.split(':')[1]) - 30]
    const hourLate = parseInt(timeLate.split(':')[0])
    const minuteLate = parseInt(timeLate.split(':')[1])
    const hourOut = parseInt(timeOut.split(':')[0])
    const minuteOut = parseInt(timeOut.split(':')[1])
    // const [hourOut, minuteOut] = parseInt(timeOut.split(':')[1]) + 30 > 60
    //   ? [parseInt(timeOut.split(':')[0]) + 1, parseInt(timeOut.split(':')[1]) - 30]
    //   : [parseInt(timeOut.split(':')[0]), parseInt(timeOut.split(':')[1]) + 30]
    if (hour < hourIn || (hour === hourIn && minute < minuteIn)) { // hour > hourOut || (hour == hourOut && minute > minuteOut)
      checkFail('เวลาไม่ถูกต้อง')
    } else {
      const [status, output, textOutput]
        = hour < hourLate || (hour === hourLate && minute <= minuteLate)
          ? ['atten', checkSuccess, 'สำเร็จ']
          : hour < hourOut || (hour === hourOut && minute <= minuteOut)
            ? ['late', checkWarning, 'มาสาย']
            : ['absent', checkFail, 'ขาดเรียน']
      output(textOutput)
      // const { students } = this.state
      // students[student] = {
      //   status,
      //   time: [hour, minute, second].join(':'),
      //   timeIn,
      //   timeLate,
      //   timeOut
      // } 
      this.setState((prevState) => {
        students = prevState.students
        students[student] = {
          status,
          time: [hour, minute, second].join(':'),
          timeIn: prevState.timeIn,
          timeLate: prevState.timeLate,
          timeOut: prevState.timeOut
        }
        return { students }
      })
    }
  }

  isInClass = (student) => {
    const { studentsInClass } = this.state
    return studentsInClass.some(studentInClass => {
      return student === studentInClass
    })
  }

  isDuplicate = (student) => (
    Object.keys(this.state.students).some(studentChecking => student === studentChecking)
    || Object.keys(this.state.studentsOld).some(studentChecking => student === studentChecking)
  )

  manualButton = () => {
    this.props.navigation.navigate('ManualAttendance', { attendance: this.attendance })
  }

  summitButton = () => {
    let result = ''
    const { students } = this.state
    Object.keys(students).forEach(s => {
      result = result + s + '\n'
    });
    const date = this.getDay()
    const title = `วันที่ ${date} จำนวนนักศึกษาที่เรียน ${Object.keys(students).length} คน`
    result = result.substring(0, result.length - 1)
    const { deviceSize, focus } = this.props.screenProps
    console.log('Scanner focus', focus)
    Alert.alert(
      title,
      result,
      [
        {
          text: 'ใช่', onPress: () => {
            console.log('start upload')
            this.upload()
            console.log('finish upload')
            this.byPassToDashboard()
          }
        },
        { text: 'ไม่ใช่', onPress: () => { } },
      ],
      { cancellable: false }
    )
  };

  upload = () => {
    const { id } = this.props.screenProps.focus
    const { classKey, students, studentsOld, date, weekDay, timeIn, timeLate, timeOut } = this.state
    console.log('start set firebase')
    firebase.database().ref('/Subject').child(id).child('attendance').child(classKey).set({
      students: { ...studentsOld, ...students },
      date,
      weekDay,
      timeInLastModify: timeIn,
      timeLateLastModify: timeLate,
      timeOutLastModify: timeOut
    })
    console.log('end set firebase')
  }

  byPassToDashboard = () => {
    this.props.screenProps.setDescriptionForSelector('สรุปผล', require('../../pics/dashboardPage.png'), 'Dashboard')
    this.props.screenProps.changeActivateStatus(4)
    this.props.navigation.navigate('Dashboard')
  }

  getDay = () => {
    var options = { year: '2-digit', month: 'short', day: 'numeric' } // year: 'numeric'
    return new Date().toLocaleDateString('th-TH', options)
  }

  getTime = () => {
    var dateAll, date, month, year, TimeType, hour, minutes, seconds, fullTime;
    dateAll = new Date();
    date = dateAll.getDate();
    month = dateAll.getMonth();
    year = dateAll.getFullYear();
    hour = dateAll.getHours();
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      TimeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    minutes = dateAll.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    seconds = dateAll.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    fullTime = date.toString() + '/' + month.toString() + '/' + year.toString()
      + hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

    return fullTime
  }

  _handleShowStudentList = () => {
    this.state.students.forEach(student => { this.studentsText = this.studentsText + student + '\n' })
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedCode: null });
  };

  _handleChangeBackgroundColorOutput = () => {
    this.setState({ lastScannedCode: null });
  };
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
    const { hasCameraPermission, lastScannedCode, students, statusColor, statusOutput } = this.state
    let animeteStyle = { transform: [{ translateY: this.state.offsetY }] }
    return (
      <View style={styles.container}>

        {hasCameraPermission === null
          ? <Text>กำลังขออนุญาตจากกล้อง</Text>
          : hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
              ไม่ได้รับอนุญาตจากกล้อง
                    </Text>
            :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: deviceHeight,
                width: deviceWidth,
                marginTop: 0
              }}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]}
            >

              <View style={styles.backgroundTop} />
              <View style={styles.backgroundCenter} >
              </View>
              <View style={styles.backgroundBot} />

              <Animated.View style={[styles.topBar, animeteStyle, {
                height: 1 / 10 * deviceHeight,
                top: -1 / 10 * deviceHeight,
                backgroundColor: statusColor
              }]}>
                <Text numberOfLines={1} style={[styles.codeText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight, paddingVertical: 3 / 100 * deviceHeight }]}>
                  {lastScannedCode}
                </Text>
                <Text style={[styles.successText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight, paddingVertical: 3 / 100 * deviceHeight }]}>
                  {statusOutput}
                </Text>
              </Animated.View>

              {
                this.state.enabledBackButton &&
                (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Selector')}
                    style={{
                      position: 'absolute',
                      top: 1 / 10 * 0.1 * deviceHeight + 25,
                      left: 1 / 10 * 0.2 * deviceHeight,
                    }} >
                    <Image
                      source={require('../../pics/backButton.png')}
                      style={{
                        width: 1 / 10 * 0.6 * deviceHeight,
                        height: 1 / 10 * 0.6 * deviceHeight,
                      }} />
                  </TouchableOpacity >
                )
              }

              <View style={[styles.countStudents, {
                height: 1 / 10 * deviceHeight,
                left: 1 / 10 * deviceWidth,
                bottom: 2 / 10 * deviceHeight
              }]} >
                <Text style={[styles.countStudentsText, {
                  fontSize: 1 / 20 * deviceHeight,
                  paddingVertical: 1 / 60 * deviceHeight
                }]} >
                  จำนวน {Object.keys(students).length} คน
                </Text>
              </View>
              <CustomButton onPress={() => { this.manualButton() }}
                style={{
                  height: 1 / 10 * deviceHeight,
                  width: 2 / 3 * deviceWidth - 3 / 20 * deviceWidth,
                  left: 1 / 20 * deviceWidth,
                  bottom: 1.5 / 20 * deviceHeight,
                  position: 'absolute'
                }}
                text={'กรอกรหัส'}
              />
              <CustomButton onPress={() => { this.summitButton() }}
                style={{
                  height: 1 / 10 * deviceHeight,
                  width: 1 / 3 * deviceWidth,
                  right: 1 / 20 * deviceWidth,
                  bottom: 1.5 / 20 * deviceHeight,
                  position: 'absolute'
                }}
                text={'ยืนยัน'}
              />
            </BarCodeScanner>

        }
        {this._maybeRenderUploadingOverlay()}
        {/* <StatusBar hidden /> ปิดตรงแถบสัญญาณโทรสับข้างบน */}
      </View>
    );
  }
}

const backgroundScanerColor = 'rgba(0,0,0,0.7)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
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
    textAlign: 'center',
  },
  successText: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  countStudents: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  countStudentsText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  summitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#0070C0'
  },
  summitButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  backgroundTop: {
    flex: 6,
    backgroundColor: backgroundScanerColor,
  },
  backgroundCenter: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  backgroundBot: {
    flex: 9,
    backgroundColor: backgroundScanerColor,
  }
});
