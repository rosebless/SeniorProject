import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import DrawerHeader from './Drawer/DrawerHeader';
import firebase from '../../config/firebase'

export default class ProfilePage extends React.Component {
  state = {
    name: '',
    phone: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'โปรไฟล์',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../pics/temp2.png')}
        style={styles.icon}
      />
    ),
  })
  submitChangeProfile = () => {
    const { name, phone } = this.state
    const { professorKey } = this.props.screenProps
    // set on firebase 
    firebase.database().ref('Professor').child(professorKey).child('name').set(name)
    firebase.database().ref('Professor').child(professorKey).child('phone').set(phone) 
    // set on local 
    this.props.screenProps.setNameInScreenProps(name)
    // notification 
    Alert.alert('ยืนยันการเปลี่ยนแปลง')
    this.props.navigation.navigate('Main')
  }
  render() {
    const { openDrawer } = this.props.navigation
    const { deviceSize: { deviceHeight, deviceWidth }, photoUrl } = this.props.screenProps
    if (deviceHeight < deviceWidth) {
      var profile_height = 7 / 20 * deviceHeight
      var profile_width = 7 / 20 * deviceHeight
    } else {
      var profile_height = 1 / 2 * deviceWidth
      var profile_width = 1 / 2 * deviceWidth
    }
    return (
      <View style={styles.container}>
        <DrawerHeader openDrawer={openDrawer} deviceHeight={deviceHeight} />
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
        <View style={[styles.bot, { height: 3 / 20 * deviceHeight, width: deviceWidth }]} >
          <TouchableOpacity onPress={() => this.submitChangeProfile()}
            style={[styles.summitButton, {
              height: 1 / 10 * deviceHeight,
              width: 0.6 * deviceWidth,
              borderRadius: 1 / 3 * 1 / 10 * deviceHeight
            }]} >
            <Text style={[styles.summitButtonText, { fontSize: 1 / 20 * deviceHeight }]} > ยืนยัน </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    //flex: 1,
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


