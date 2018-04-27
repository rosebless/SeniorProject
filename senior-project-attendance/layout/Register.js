import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AppVarible from '../Model/AppVarible'

export default class Register extends React.Component {

  constructor(props) {
    super(props)
    const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
    this.state = {
      deviceHeight,
      deviceWidth,
      name: '',
      phone: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
  })
  /*
  static navigationOptions = ({navigation}) => ({
      title: 'Main',
      headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
     
  })
  */

  submitRegister = () => {
    const { name, phone } = this.state 
    AppVarible.setLogOn('name',name) 
    AppVarible.setLogOn('phone',phone) 
    const { firebase, logOn: { userID } } = AppVarible.appVarible 
    firebase.database().ref('User').child(userID).child('name').set(name)  
    firebase.database().ref('User').child(userID).child('phone').set(phone) 
    this.props.navigation.navigate('NM')
  }

  render() {
    const { deviceHeight, deviceWidth } = this.state
    return (
      <View style={styles.container} >
        <View style={[styles.header, {
          height: 1 / 10 * deviceHeight,
          width: deviceWidth,
          top: 1 / 10 * deviceHeight
        }]} >
          <Text style={{ fontSize: 1 / 20 * deviceHeight }} > สร้างบัญชีผู้ใช้ </Text>
        </View>
        <View style={styles.inputBox} >
          <View style={[styles.text, {
            height: 1 / 20 * deviceHeight,
            width: 0.8 * deviceWidth
          }]} >
            <Text style={{ fontSize: 1 / 40 * deviceHeight }} > ชื่อ : </Text>
          </View>
          <TextInput
            style={{
              height: 1.5 / 20 * deviceHeight,
              width: 0.8 * deviceWidth,
              fontSize: 1 / 30 * deviceHeight
            }}
            underlineColorAndroid='#0070C0'
            placeholder='กรุณากรอก ชื่อ-นามสกุล'
            onChangeText={(Text) => { this.setState({ name: Text }) }} />
          <View style={[styles.text, {
            height: 1 / 20 * deviceHeight,
            width: 0.8 * deviceWidth
          }]} >
            <Text style={{ fontSize: 1 / 40 * deviceHeight }} > เบอร์โทรศัพท์ : </Text>
          </View>
          <TextInput
            style={{
              height: 1.5 / 20 * deviceHeight,
              width: 0.8 * deviceWidth,
              fontSize: 1 / 30 * deviceHeight
            }}
            underlineColorAndroid='#0070C0'
            placeholder='กรุณากรอก เบอร์โทรศัพท์'
            onChangeText={(Text) => { this.setState({ phone: Text }) }} />
        </View>
        <TouchableOpacity onPress={() => this.submitRegister()}
          style={[styles.summitButton, {
            height: 1 / 10 * deviceHeight,
            width: 0.6*deviceWidth,
            bottom: 1 / 20 * deviceHeight,
            borderRadius: 1 / 3 * 1 / 10 * deviceHeight
          }]} >
          <Text style={[styles.summitButtonText,{ fontSize: 1 / 20 * deviceHeight }]} > ยืนยัน </Text>
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
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
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
});


