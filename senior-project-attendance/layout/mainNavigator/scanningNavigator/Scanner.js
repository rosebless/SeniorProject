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
import AppVarible from '../../../Model/AppVarible' 

export default class Scanner extends React.Component {
  constructor(props) {
    super(props)
    const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
    this.state = {
      deviceHeight,
      deviceWidth,
      hasCameraPermission: null,
      lastScannedCode: null,
      students: [],
      studentsText: '',
      statusIcon: require('../../../pics/temp5.png') ,
      statusOutput: 'eiei' ,
      offsetY: new Animated.Value(0) 
    }
  }
  static navigationOptions = ({ navigation }) => ({
    header: false,
  });

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

      if (true) { //ตรวจสอบรายชื่อ 
        let students = this.state.students 
        students.push(result.data) 
        this.setState({
          statusIcon: require('../../../pics/temp5.png'),
          statusOutput: 'สำเร็จ',
          students,
          //studentsText
        })
      } else {
        this.setState({
          statusIcon: require('../../../pics/temp4.png'),
          statusOutput: 'ไม่สำเร็จ'
        })
      }

      Animated.sequence([
        Animated.timing(this.state.offsetY, {
          toValue: 1 / 10 * this.state.deviceHeight,
          duration: 1000
        }),
        Animated.timing(this.state.offsetY, {
          toValue: 0,
          duration: 1000,
          delay: 1000
        })
      ]).start();
    }
  };
  
  _handlePressSummit = () => {
    let result = '' 
    // for(let i = 1 ; i < this.state.students.length ; i++){
    //   if(i!=this.state.students.length-1) {
    //     result = result + this.state.students[i] + '\n'
    //   } else {
    //     result = result + this.state.students[i] 
    //   }
    // }
    this.state.students.forEach(s => {
      result = result + s + '\n'
    });
    result = result.substring(0,result.length-1)
    Alert.alert(
      'ยืนยันการเช็คชื่อ ?' , 
      result ,
      [
        { text: 'ใช่', onPress: () => { AppVarible.appVarible.navigationSaved.scanning.navigate('ByPassToDashboard') } },
        { text: 'ไม่ใช่', onPress: () => { } },
      ] ,
      { cancellable: false } 
    )
 
  };

  _handleShowStudentList = () => {
    this.state.students.forEach(student => {this.studentsText = this.studentsText + student + '\n'})
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedCode: null });
  };

  _handleChangeBackgroundColorOutput = () => {
    this.setState({ lastScannedCode: null });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { deviceHeight, deviceWidth } = this.state
    let animeteStyle = { transform: [{ translateY: this.state.offsetY }] }
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
              style={{
                height: deviceHeight,
                width: deviceWidth,
                marginTop: 0
              }} 
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.code39]} 
            >

              <View style={styles.backgroundTop} />
              <View style={styles.backgroundTCenter} > 
                {/* <View style={styles.backgroundTCenterLeft} /> 
                <View style={[styles.backgroundScanBox, { height: 3/20 * deviceHeight }]} />
                <View style={styles.backgroundTCenterRight} />  */}
              </View>
              <View style={styles.backgroundBot} /> 

              <Animated.View style={[styles.topBar, animeteStyle, { height: 1 / 10 * deviceHeight, top: -1 / 10 * deviceHeight }]}>
                <Image
                  source={this.state.statusIcon}
                  style={[styles.statusIcon, {
                    height: 1 / 10 * 7 / 10 * deviceHeight,
                    width: 1 / 10 * 7 / 10 * deviceHeight,
                  }]}
                />
                <Text numberOfLines={1} style={[styles.codeText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                  {this.state.lastScannedCode}
                </Text>
                <Text style={[styles.successText, { fontSize: 1 / 10 * 3 / 10 * deviceHeight }]}>
                  {this.state.statusOutput}
                </Text>
              </Animated.View> 

              <View style={[styles.countStudents, {
                height: 1 / 10 * deviceHeight,
                width: 2 / 3 * deviceWidth - ( 3 / 10 * deviceWidth ) ,
                left: 1 / 10 * deviceWidth,
                bottom: 1 / 10 * deviceHeight
              }]} >
                <Text style={[styles.countStudentsText, { 
                  fontSize: 1 / 30 * deviceHeight
                }]} >
                  จำนวน {this.state.students.length} คน
                </Text>
              </View>

              <TouchableOpacity onPress={() => { this._handlePressSummit() }} style={[styles.summitButton, {
                height: 1 / 10 * deviceHeight,
                width: 1 / 3 * deviceWidth,
                right: 1 / 10 * deviceWidth,
                bottom: 1 / 10 * deviceHeight,
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

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedCode) {
      return;
    }
    
    if (this.state.lastScannedCode) { //ตรวจสอบรายชื่อ 
      this.setState({
        statusIcon: '../../../pics/temp5.png',
        statusOutput: 'สำเร็จ',
        students: [...this.state.students, this.state.lastScannedCode]

      })
    } else {
      this.setState({
        statusIcon: '../../../pics/temp4.png',
        statusOutput: 'ไม่สำเร็จ'
      })
    }
    
    Animated.sequence([
      Animated.timing(this.state.offsetY, {
        toValue: 1 / 10 * this.state.deviceHeight,
        duration: 500
      }),
      Animated.timing(this.state.offsetY, {
        toValue: 0,
        duration: 500,
        delay: 500
      })
    ]).start(); 

  };
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
    backgroundColor:  backgroundScanerColor, 
  },
  backgroundTCenter: {
    flex: 5, 
    flexDirection: 'row',
    //backgroundColor:  'transparent', 
    justifyContent: 'center', 
    alignItems: 'center' ,
    borderWidth: 1,
    borderColor: '#fff',
  },
  backgroundTCenterLeft: {
    flex: 1,
    backgroundColor:  'blue',
  },
  backgroundScanBox: {
    flex: 8,
    //backgroundColor: 'transparent', 
    //borderWidth: 1,
    //borderColor: '#fff',
  },
  backgroundTCenterRight: {
    flex: 1,
    backgroundColor:  backgroundScanerColor,
  },
  backgroundBot: {
    flex: 9, 
    backgroundColor:  backgroundScanerColor, 
  }
});
