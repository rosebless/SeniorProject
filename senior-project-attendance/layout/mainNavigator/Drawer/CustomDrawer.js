/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Content, Icon, Header, Body } from 'native-base'
import { NavigationActions, DrawerItems } from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import AppVarible from '../../../Model/AppVarible'

export default class CustomDrawer extends React.Component {

  constructor(props) {
    super(props)
    const { deviceHeight, deviceWidth } = AppVarible.appVarible.deviceSize
    if (deviceHeight < deviceWidth) {
      var profile_height = 3 / 20 * deviceHeight
      var profile_width = 3 / 20 * deviceHeight
    } else {
      var profile_height = 1.5 / 4 * deviceWidth
      var profile_width = 1.5 / 4 * deviceWidth
    }
    this.state = {
      deviceHeight,
      deviceWidth,
      profile_height,
      profile_width
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Custom',
  })

  logOut = () => {
    const { navigate } = AppVarible.appVarible.navigationSaved.login
    AppVarible.setAppVarible('navigationSaved', {
      login: { status: false, navigate: '' },
      main: { status: false, navigate: '' },
      subject: { status: false, navigate: '', focus: '' },
      scanning: { status: false, navigate: '', focus: '' },
      dashboard: { status: false, navigate: '', focus: '' }
    })
    navigate('Login')
  }

  render() {
    const { screenProps: { drawerProps }, screenProps: { drawerProps: { items } }, screenProps: { drawerWidth } } = this.props
    const { deviceHeight, deviceWidth, profile_height, profile_width } = this.state
    const { picUrl, name } = AppVarible.appVarible.logOn
    //const itemsmain
    return (
      <View style={styles.container}>
        <View style={[styles.profileHeader, {
          height: 3 / 10 * deviceHeight,
          width: drawerWidth,
        }]}>
          <Image
            source={require('../../../pics/background1.png')}
            style={{
              height: 3 / 10 * deviceHeight,
              width: drawerWidth,
            }}
          />
          <View style={[styles.popUp, {
            height: 3 / 10 * deviceHeight,
            width: drawerWidth,
            top: 0
          }]}>
            <Image
              source={{ uri: picUrl }}
              style={{
                height: profile_height,
                width: profile_width,
                borderRadius: 1 / 2 * profile_height,
                borderWidth: 1 / 75 * profile_height,
                borderColor: '#0070C0', 
                backgroundColor: '#0070C0'
              }}
            />
            <Text style={{ marginTop: 1 / 60 * deviceHeight, fontSize: 1 / 40 * deviceHeight }} > {name} </Text>
          </View>
        </View>
        <ScrollView
          style={[styles.scrollView, {
            height: 11 / 20 * deviceHeight,
            width: drawerWidth
          }]}>
          <DrawerItems {...drawerProps} />
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
            <Text
              style={[styles.logOutText, {
                fontSize: 1.5 / 40 * deviceHeight
              }]}>
              Log Out
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// CustomDrawer.propTypes = {
//   navigation: PropTypes.object
// };

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

//AppRegistry.registerComponent('customDrawer', () => customDrawer)