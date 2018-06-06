import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import DrawerHeader from './DrawerGroup/DrawerHeader';
import firebase from '../config/firebase'
import CustomButton from './CustomButton'

export default class ProfilePage extends React.Component {
  state = {
    name: '',
    phone: ''
  }
  submitButton = () => {
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
      Alert.alert(
        'ยืนยันการเปลี่ยนแปลง',
        'ต้องการเปลี่ยนชื่อ และเบอร์โทรศัพท์ หรือไม่',
        [
          {
            text: 'ใช่', onPress: () => {
              this.submitChangeProfile()
            }
          },
          { text: 'ไม่ใช่', onPress: () => { } }
        ],
        { cancellable: false }
      )
    }
  }
  submitChangeProfile = () => {
    const { name, phone } = this.state
    const { setUserLogOn, userLogOn, changeActivateStatus } = this.props.screenProps
    // set on firebase 
    firebase.database().ref('Professor').child(userLogOn.professorKey).child('name').set(name)
    firebase.database().ref('Professor').child(userLogOn.professorKey).child('phone').set(phone)
    // set on local 
    userLogOn['name'] = name
    setUserLogOn(userLogOn)
    // notification 
    Alert.alert('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว', '', [{ text: 'ตกลง' }])
    changeActivateStatus(0)
    this.props.navigation.navigate('Main')
  }
  render() {
    const { openDrawer } = this.props.navigation
    const { deviceSize: { deviceHeight, deviceWidth }, userLogOn: { photoUrl } } = this.props.screenProps
    if (deviceHeight < deviceWidth) {
      var profile_height = 7 / 20 * deviceHeight
      var profile_width = 7 / 20 * deviceHeight
    } else {
      var profile_height = 1 / 2 * deviceWidth
      var profile_width = 1 / 2 * deviceWidth
    }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
        <View style={styles.container} >
          <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
          <ScrollView style={{ height: 0.9 * deviceHeight - 25 }} >
            <View style={{ height: 1.5 / 20 * deviceHeight }} />
            <View style={[styles.photo, { width: deviceWidth }]}>
              <Image
                source={{ uri: photoUrl }}
                style={{
                  height: profile_height,
                  width: profile_width,
                  borderRadius: 1 / 2 * profile_height,
                  borderWidth: 1 / 75 * profile_height,
                  borderColor: '#0070C0',
                  backgroundColor: '#0070C0'
                }}
              />
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
              <CustomButton onPress={() => { this.submitButton() }}
                style={{
                  height: 1 / 10 * deviceHeight,
                  width: 0.6 * deviceWidth,
                }}
                text={'ยืนยัน'}
              />
            </View>
          </ScrollView >
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 25
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  inputBox: {
    flex: 1,
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
    color: '#FFFFFF',
  },
  bot: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  }
});


