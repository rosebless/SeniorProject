import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from '../config/firebase'
import CustomButton from './CustomButton'

export default class Register extends React.Component {
  state = {
    name: '',
    phone: '',
    uploading: false
  }
  submitRegister = () => {
    const { name, phone } = this.state
    const { setUserLogOn, userLogOn, changeActivateStatus } = this.props.screenProps
    if (name.trim() === '') {
      Alert.alert(
        'กรุณากรอกชื่อ',
        '',
        [
          {
            text: 'ตกลง', onPress: () => { }
          },
        ],
        { cancellable: false }
      )
    } else {
      firebase.database().ref('Professor').child(userLogOn.professorKey).child('name').set(name)
      firebase.database().ref('Professor').child(userLogOn.professorKey).child('phone').set(phone)
      setUserLogOn({
        ...userLogOn,
        name
      })
      this.setState({ uploading: false })
      this.props.navigation.navigate('DrawerNavigator')
    }
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
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
        <ScrollView style={{ height: deviceHeight - 25, width: deviceWidth }} >
          <View style={[styles.header, {
            height: 1 / 10 * deviceHeight,
            width: deviceWidth,
            marginTop: 2.5 / 10 * deviceHeight
          }]} >
            <Text style={{ fontSize: 1 / 15 * deviceHeight, paddingVertical: 1 / 40 * deviceHeight }} > สร้างบัญชีผู้ใช้ </Text>
          </View>
          <View style={styles.inputBox} >
            <View style={[styles.text, {
              height: 1 / 20 * deviceHeight,
              width: 0.8 * deviceWidth,
              marginTop: 1 / 20 * deviceHeight
            }]} >
              <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} > ชื่อ : </Text>
            </View>
            <TextInput
              style={{
                height: 1.5 / 20 * deviceHeight,
                width: 0.8 * deviceWidth,
                fontSize: 1 / 30 * deviceHeight,
                paddingVertical: 1 / 120 * deviceHeight
              }}
              underlineColorAndroid='#0070C0'
              placeholder='กรุณากรอก ชื่อ-นามสกุล'
              maxLength={60}
              onChangeText={(Text) => { this.setState({ name: Text }) }} />
            <View style={[styles.text, {
              height: 1 / 20 * deviceHeight,
              width: 0.8 * deviceWidth
            }]} >
              <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} > เบอร์โทรศัพท์ : </Text>
            </View>
            <TextInput
              style={{
                height: 1.5 / 20 * deviceHeight,
                width: 0.8 * deviceWidth,
                fontSize: 1 / 30 * deviceHeight,
                paddingVertical: 1 / 80 * deviceHeight
              }}
              keyboardType='numeric'
              maxLength={10}
              underlineColorAndroid='#0070C0'
              placeholder='กรุณากรอก เบอร์โทรศัพท์'
              onChangeText={(Text) => { this.setState({ phone: Text }) }} />
          </View>
          <View style={[styles.bot, { height: 3 / 20 * deviceHeight, width: deviceWidth, marginTop: 1 / 20 * deviceHeight }]} >
            <CustomButton onPress={() => { this.setState({ uploading: true }, () => this.submitRegister()) }}
              style={{
                height: 1 / 10 * deviceHeight,
                width: 0.6 * deviceWidth
              }}
              text={'ยืนยัน'}
            />
          </View>
          {this._maybeRenderUploadingOverlay()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 25
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
  },
  summitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070C0'
  },
  bot: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  summitButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});


