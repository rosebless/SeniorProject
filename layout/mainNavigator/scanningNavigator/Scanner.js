import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
//import { Button } from 'native-base';

import sIconSuccess from '../../../pics/temp5.png'
import sIconFail from '../../../pics/temp4.png'

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
            { text: 'ใช่', /*onPress: () => Linking.openURL(this.state.lastScannedUrl),*/ onPress: ()=> {} },
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
    /*this.setState({backgroundColorOutput:'rgba(255,255,255,0.3)'}) */ //backgroundColorOutput = 'rgba(255,255,255,0)'
    return (
      <View style={styles.topBar}> 
        <Image
        source={statusIcon}
        style={styles.statusIcon} 
        />
        {/*<TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>*/}
          <Text numberOfLines={1} style={styles.codeText}>
            {this.state.lastScannedCode}
          </Text>
        {/*</TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelButton}
        onPress={this._handlePressCancel}>*/} 
          <Text style={styles.successText}> {outputText} </Text> 
        {/*</TouchableOpacity>*/}
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