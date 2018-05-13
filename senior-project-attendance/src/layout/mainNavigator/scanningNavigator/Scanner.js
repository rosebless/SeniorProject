/*
import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
//import { Button } from 'native-base';

import sIconSuccess from '../../../pics/temp5.png'
import sIconFail from '../../../pics/temp4.png'
import AppVarible from '../../../Model/AppVarible'

export default class Scanner extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: false,
  });
  state = {
    hasCameraPermission: null,
    lastScannedCode: null,
    students: '',
    studentList: [],
    //backgroundColorOutput: 'rgba(255,255,255,0.3)' 
  };

  componentDidMount() {
    this._requestCameraPermission();
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
    }
  };

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>กำลังขออนุญาตจากกล้อง</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
              ไม่ได้รับอนุญาตจากกล้อง
                    </Text>
            : 
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              //style={{ height: 300, width: 300 }}
              style={{
                height: deviceHeight - 25,
                width: deviceWidth,
                //justifyContent: 'center',
                //backgroundColor: 'transparent'
                marginTop: 25
              }}
            >
            <View style={{flex:4, backgroundColor: 'transparent'}} />
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', width: deviceWidth, backgroundColor: 'rgba(255,255,255,0.3)' }} >
            <TouchableOpacity onPress={this._handlePressSummit} >
              <Text style={styles.summitButtonText} > เสร็จสิ้น </Text>
            </TouchableOpacity>
            </View>
            </BarCodeScanner>
            
          }

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressSummit = () => {
    
       Alert.alert(
          'ยืนยันการเช็คชื่อ ?',
          studentss,
          [
            { text: 'ใช่', /*onPress: () => Linking.openURL(this.state.lastScannedUrl),*//* onPress: ()=> {AppVarible.navigationSaved.scanning.navigate('ByPassToDashboard') } },
{ text: 'ไม่ใช่', onPress: () => {} },
],
{ cancellable: false }
);
};

_handleShowStudentList = () => {
this.setState({students: 'รหัสนักศึกษา'})
this.state.studentList.forEach(student => this.setState({students: this.state.students + '\n' + student}) )
};

_handlePressCancel = () => {
this.setState({ lastScannedCode: null });
};

_handleChangeBackgroundColorOutput = () => {
this.setState({ lastScannedCode: null });
};

_maybeRenderUrl = () => {
if (!this.state.lastScannedCode) {
//this.setState({backgroundColorOutput:'rgba(255,255,255,0)'})
return;
}

if (this.state.lastScannedCode) { //ตรวจสอบรายชื่อ
var statusIcon = require('../../../pics/temp5.png')
//studentss = studentss  + this.state.lastScannedCode + '\n'
//this.setState({students: 'รหัสนักศึกษา'})
//studentList = [...studentList, this.state.lastScannedCode]
var outputText = 'สำเร็จ' 
} else {
var statusIcon = require('../../../pics/temp4.png')
var outputText = 'ไม่สำเร็จ' 
}
/*this.setState({backgroundColorOutput:'rgba(255,255,255,0.3)'}) */ /* //backgroundColorOutput = 'rgba(255,255,255,0)'
return (
  <View style={styles.topBar}> 
    <Image
    source={statusIcon}
    style={styles.statusIcon} 
    />
    {/*<TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>*/ /*}
<Text numberOfLines={1} style={styles.codeText}>
{this.state.lastScannedCode}
</Text>
{/*</TouchableOpacity>
<TouchableOpacity 
style={styles.cancelButton}
onPress={this._handlePressCancel}>*/ /*} 
  <Text style={styles.successText}> {outputText} </Text> 
{/*</TouchableOpacity>*/ /*}
</View>
);
//setTimeout(() => {
//  backgroundColorOutput = 'rgba(255,255,255,0)'
//}, 2000);
};
}

//let backgroundColorOutput = 'rgba(255,255,255,0.3)'
let studentss = ''
let studentList = [] 
//let statusIcon = sIconSuccess
let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#000',
},
topBar: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
//backgroundColor: this.state.backgroundColorOutput,
padding: 15,
flexDirection: 'row',
height: 1/10*deviceHeight,
alignItems: 'center',
justifyContent: 'center',
},
statusIcon: {
marginLeft: 10 ,
height: 1/10*7/10*deviceHeight,
width: 1/10*7/10*deviceHeight
},
codeText: {
flex: 1,
color: '#000',
fontSize: 1/10*3/10*deviceHeight,
textAlignVertical: "center",
textAlign: 'center',
},
successText: {
marginLeft: 10,
alignItems: 'center',
justifyContent: 'center',
color: '#000',
fontSize: 1/10*3/10*deviceHeight
},
summitButtonText: {
//flex: 1,
textAlignVertical: 'bottom',
textAlign: 'center',
height: 1/10*deviceHeight,
width: 3/4*deviceWidth,
backgroundColor: '#0070C0',
color: '#FFFFFF',
fontSize: 1/20*deviceHeight,
borderRadius: 1/2*1/10*deviceHeight,
}
});
*/


import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button, Image, Animated } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
// import AppVarible from '../../../Model/AppVarible'
import firebase from '../../../config/firebase'

export default class Scanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      lastScannedCode: null,
      students: [],
      studentsInClass: [],
      studentsOld: [],
      timeIn: '',
      timeLate: '',
      timeOut: '',
      session: '',
      date: '',
      classKey: '',
      statusIcon: require('../../../pics/temp5.png'),
      statusColor: 'white',
      statusOutput: 'eiei',
      offsetY: new Animated.Value(0)
    }
  }
  static navigationOptions = ({ navigation }) => ({
    header: false,
  });

  componentWillMount = () => {
    this.getStudentFormFirebase()
  }

  componentDidMount() {
    this._requestCameraPermission();
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
    const { focus: { id } } = this.props.navigation.state.params
    firebase.database().ref('/Subject').child(id).once('value', snapshot => {
      // console.log(snapshot.val()) 
      const objSubject = snapshot.val()
      const studentsInClass = Object.keys(objSubject.students)
      // console.log(studentsInClass)
      this.setState({ studentsInClass })
      this.getTimeForAttendance(objSubject.attendance, objSubject.timeIn, objSubject.timeLate, objSubject.timeOut)
    })
  }

  getTimeForAttendance = (attendance = [], timeIn = '', timeLate = '', timeOut = '') => {
    const option = { year: 'numeric', month: 'numeric', day: 'numeric' } // day/month/year 
    const today = (new Date().toLocaleDateString('th-TH', option)).split('/').reverse().join('-')
    console.log('today', today)
    const hourCheck = timeIn.split(':')
    const session
      = hourCheck < 6 ? 'midnight'
        : hourCheck < 13 ? 'morning'
          : hourCheck < 17 ? 'afternoon'
            : hourCheck < 21 ? 'evening'
              : 'night'
    const classKey = Object.keys(attendance).find(key => attendance[key].date == today && attendance[key].session == session)
    classKey
      ? this.setState({ classKey, studentsOld: Object.keys(attendance[classKey].students) })
      : this.setState({ classKey: ['week', Object.keys(attendance).length + 1].join('-'), date: today, session })
    this.setState({ timeIn, timeLate, timeOut })
  }

  attendance = (student, checkSuccess, checkWarning, checkFail, finishingOutput) => {
    console.log(this.isInClass(student))
    if (this.isInClass(student) && !this.isDuplicate(student)) { //ตรวจสอบรายชื่อ  
      // console.log('true')
      this.updateStudens(student, checkSuccess, checkWarning, checkFail)
    } else if (this.isDuplicate(student)) { // เคยเช็คไปแล้ว 
      checkWarning('ข้อมูลซ้ำ')
    } else { // ไม่มีอยู่ในรายชื่อ
      // console.log('false')
      checkFail('ไม่สำเร็จ')
    }
    // Animation output 
    finishingOutput()
  }

  checkSuccess = (text) => {
    this.setState({
      // statusIcon: require('../../../pics/temp5.png'), 
      statusColor: '#3eee26',
      statusOutput: text
      //studentsText
    })
  }

  checkWarning = (text) => {
    this.setState({
      // statusIcon: require('../../../pics/temp4.png'), 
      statusColor: '#ffc000',
      statusOutput: text
    })
  }

  checkFail = (text) => {
    this.setState({
      // statusIcon: require('../../../pics/temp4.png'),
      statusColor: '#ff0000',
      statusOutput: text
    })
  }

  finishingOutput = () => {
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
    ]).start();
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
    const [hourOut, minuteOut] = parseInt(timeOut.split(':')[1]) + 30 > 60
      ? [parseInt(timeOut.split(':')[0]) + 1, parseInt(timeOut.split(':')[1]) - 30]
      : [parseInt(timeOut.split(':')[0]), parseInt(timeOut.split(':')[1]) + 30]
    if (hour < hourIn || hour > hourOut || (hour == hourIn && minute < minuteIn) || (hour == hourOut && minute > minuteOut)) {
      checkFail('เวลาไม่ถูกต้อง')
    } else {
      const [status, output, textOutput]
        = hour < hourLate || (hour == hourLate && minute < minuteLate)
          ? ['atten', checkSuccess, 'สำเร็จ']
          : hour < hourOut || (hour == hourOut && minute < minuteOut)
            ? ['late', checkWarning, 'มาสาย']
            : ['absert', checkFail, 'ขาดเรียน']
      output(textOutput)
      const { students } = this.state
      students[student] = {
        status,
        time: [hour, minute, second].join(':'),
        timeIn,
        timeLate,
        timeOut
      }
      this.setState({ students })
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
    || this.state.studentsOld.some(studentChecking => student === studentChecking)
  )

  manualButton = () => {
    const { navigate, state: { params: { focus } } } = this.props.navigation
    navigate('ManualAttendance',
      { focus, attendance: this.attendance })
  }

  summitButton = () => {
    // for(let i = 1 ; i < this.state.students.length ; i++){
    //   if(i!=this.state.students.length-1) {
    //     result = result + this.state.students[i] + '\n'
    //   } else {
    //     result = result + this.state.students[i] 
    //   } 
    // }
    let result = ''
    const { students } = this.state
    Object.keys(students).forEach(s => {
      result = result + s + '\n'
    });
    const date = this.getDay()
    const title = `วันที่ ${date} จำนวนนักศึกษาที่เรียน ${Object.keys(students).length} คน`
    result = result.substring(0, result.length - 1)
    const { screenProps: { deviceSize }, navigation: { navigate, state: { params: { focus } } } } = this.props
    console.log('Scanner focus', focus)
    Alert.alert(
      title,
      result,
      [
        { text: 'ใช่', onPress: () => { this.upload(); navigate('ByPassToDashboard', { focus }) } },
        { text: 'ไม่ใช่', onPress: () => { } },
      ],
      { cancellable: false }
    )
  };

  upload = () => {
    const { focus: { id } } = this.props.navigation.state.params
    const { classKey, students, session, date } = this.state
    firebase.database().ref('/Subject').child(id).child('attendance').child(classKey).set({
      students,
      session,
      date,
    })
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
                {/* <View style={styles.backgroundCenterLeft} /> 
                <View style={[styles.backgroundScanBox, { height: 3/20 * deviceHeight }]} />
                <View style={styles.backgroundCenterRight} />  */}
              </View>
              <View style={styles.backgroundBot} />

              <Animated.View style={[styles.topBar, animeteStyle, {
                height: 1 / 10 * deviceHeight,
                top: -1 / 10 * deviceHeight,
                backgroundColor: statusColor
              }]}>
                {/* <Image
                  source={this.state.statusIcon}
                  style={[styles.statusIcon, {
                    height: 1 / 10 * 7 / 10 * deviceHeight,
                    width: 1 / 10 * 7 / 10 * deviceHeight,
                  }]}
                /> */}
                <Text numberOfLines={1} style={[styles.codeText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                  {lastScannedCode}
                </Text>
                <Text style={[styles.successText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                  {statusOutput}
                </Text>
              </Animated.View>

              <View style={[styles.countStudents, {
                height: 1 / 10 * deviceHeight,
                width: 2 / 3 * deviceWidth - (3 / 10 * deviceWidth),
                left: 1 / 10 * deviceWidth,
                bottom: 2 / 10 * deviceHeight
              }]} >
                <Text style={[styles.countStudentsText, {
                  fontSize: 1 / 30 * deviceHeight
                }]} >
                  จำนวน {Object.keys(students).length} คน
                </Text>
              </View>

              <TouchableOpacity onPress={() => { this.manualButton() }} style={[styles.summitButton, {
                height: 1 / 10 * deviceHeight,
                width: 2 / 3 * deviceWidth - 3 / 20 * deviceWidth,
                left: 1 / 20 * deviceWidth,
                bottom: 1.5 / 20 * deviceHeight,
                borderRadius: 1 / 3 * 1 / 10 * deviceHeight
              }]} >
                <Text style={[styles.summitButtonText, {
                  fontSize: 1 / 20 * deviceHeight
                }]} >
                  กรอกรหัส
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.summitButton() }} style={[styles.summitButton, {
                height: 1 / 10 * deviceHeight,
                width: 1 / 3 * deviceWidth,
                right: 1 / 20 * deviceWidth,
                bottom: 1.5 / 20 * deviceHeight,
                borderRadius: 1 / 3 * 1 / 10 * deviceHeight
              }]} >
                <Text style={[styles.summitButtonText, {
                  fontSize: 1 / 20 * deviceHeight
                }]} >
                  ยืนยัน
                </Text>
              </TouchableOpacity>



              {/* <View style={{ flex: 4, backgroundColor: 'transparent' }} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: deviceWidth, backgroundColor: 'rgba(255,255,255,0.3)' }} >
                <Text>{this.state.lastScannedCode}</Text>
                <Text>{this.state.students}</Text>
                <TouchableOpacity onPress={() => { this._handlePressSummit() }} >
                  <Text style={[styles.summitButtonText, {
                    height: 1 / 10 * deviceHeight,
                    width: 3 / 4 * deviceWidth,
                    fontSize: 1 / 20 * deviceHeight,
                    borderRadius: 1 / 3 * 1 / 10 * deviceHeight,
                  }]} >
                    เสร็จสิ้น {this.studentsText}
                </Text>
                </TouchableOpacity>
              </View> */}
            </BarCodeScanner>

        }

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
    textAlignVertical: "center",
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
    //flex: 1,
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
    //backgroundColor:  'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  backgroundCenterLeft: {
    flex: 1,
    backgroundColor: 'blue',
  },
  backgroundScanBox: {
    flex: 8,
    //backgroundColor: 'transparent', 
    //borderWidth: 1,
    //borderColor: '#fff',
  },
  backgroundCenterRight: {
    flex: 1,
    backgroundColor: backgroundScanerColor,
  },
  backgroundBot: {
    flex: 9,
    backgroundColor: backgroundScanerColor,
  }
});
