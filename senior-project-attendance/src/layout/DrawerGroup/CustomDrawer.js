import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from '../../config/firebase'
import CustomDrawerItem from './CustomDrawerItem'

export default class sCustomDrawer extends React.Component {
  logOut = () => {
    Alert.alert(
      'ต้องการออกจากระบบหรือไม่',
      '',
      [
        {
          text: 'ใช่', onPress: () => {
            firebase.database().ref('/Professor').off()
            changeActivateStatus(0)
            this.props.drawerProps.navigation.navigate('Login')
          }
        },
        { text: 'ไม่ใช่', onPress: () => { } }
      ],
      { cancellable: false }
    )
  }
  render() {
    const { navigation, drawerWidth, screenProps: { deviceSize: { deviceHeight, deviceWidth }, userLogOn: { name, photoUrl }, status, changeActivateStatus } } = this.props.drawerProps
    if (deviceHeight < deviceWidth) {
      var profile_height = 3 / 20 * deviceHeight
      var profile_width = 3 / 20 * deviceHeight
    } else {
      var profile_height = 1.5 / 4 * deviceWidth
      var profile_width = 1.5 / 4 * deviceWidth
    }
    return (
      <View style={styles.container}>
        <View style={[styles.profileHeader, {
          height: 3 / 10 * deviceHeight,
          width: drawerWidth,
        }]}>
          <Image
            source={require('../../pics/background.png')}
            style={{
              height: 3 / 10 * deviceHeight,
              width: drawerWidth,
            }}
          />
          <View style={[styles.popUp, {
            height: 3 / 10 * deviceHeight,
            width: drawerWidth,
            top: 1 / 100 * deviceHeight,
          }]}>
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
            <Text style={{ fontSize: 1 / 20 * deviceHeight, paddingVertical: 1 / 60 * deviceHeight }} > {name} </Text>
          </View>
        </View>
        <ScrollView
          style={[styles.scrollView, {
            height: 11 / 20 * deviceHeight,
            width: drawerWidth,
            paddingTop: 0.5 / 20 * deviceHeight
          }]}
        >
          <CustomDrawerItem label={'หน้าหลัก'} page={'Main'} photo={require('../../pics/mainMenu.png')} status={status[0]} navigation={navigation} drawerWidth={drawerWidth} deviceHeight={deviceHeight} changeActivateStatus={() => changeActivateStatus(0)} />
          <CustomDrawerItem label={'โปรไฟล์'} page={'Profile'} photo={require('../../pics/profileMenu.png')} status={status[1]} navigation={navigation} drawerWidth={drawerWidth} deviceHeight={deviceHeight} changeActivateStatus={() => changeActivateStatus(1)} />
          <CustomDrawerItem label={'รายวิชา'} page={'SubjectManage_Selection'} photo={require('../../pics/manageSubjectMenu.png')} status={status[2]} navigation={navigation} drawerWidth={drawerWidth} deviceHeight={deviceHeight} changeActivateStatus={() => changeActivateStatus(2)} />
          <CustomDrawerItem label={'เช็คชื่อ'} page={'Scanning_Selection'} photo={require('../../pics/scanningMenu.png')} status={status[3]} navigation={navigation} drawerWidth={drawerWidth} deviceHeight={deviceHeight} changeActivateStatus={() => changeActivateStatus(3)} />
          <CustomDrawerItem label={'สรุปผล'} page={'Dashboard_Selection'} photo={require('../../pics/dashboardMenu.png')} status={status[4]} navigation={navigation} drawerWidth={drawerWidth} deviceHeight={deviceHeight} changeActivateStatus={() => changeActivateStatus(4)} />
        </ScrollView>
        <View style={[styles.bottomFixed, {
          height: 3 / 20 * deviceHeight,
          width: drawerWidth
        }]} >
          <TouchableOpacity
            onPress={() => this.logOut()}
            style={[styles.logOutButton, {
              height: 1.5 / 20 * deviceHeight,
              width: 0.6 * drawerWidth,
              borderRadius: 1 / 2 * 1.5 / 10 * deviceHeight
            }]}>
            <Image
              source={require('../../pics/logoutMenu.png')}
              style={{
                height: 1.5 / 20 * 0.8 * deviceHeight,
                width: 1.5 / 20 * 0.8 * deviceHeight,
                marginVertical: 1.5 / 20 * 0.1 * deviceHeight
              }} />
            <Text
              style={[styles.logOutText, {
                marginLeft: 1.5 / 20 * 0.1 * deviceHeight,
                fontSize: 1.5 / 40 * deviceHeight,
                paddingVertical: 1.5 / 160 * deviceHeight
              }]}>
              ออกจากระบบ
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    backgroundColor: '#FFFFFF'
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  bottomFixed: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070C0'
  },
  logOutText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  }
});