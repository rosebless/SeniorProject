import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import DrawerHeader from './Drawer/DrawerHeader';
import { Icon, Container, Header, Content, Left } from 'native-base'; 
import firebase from '../../config/firebase'

import AppVarible from '../../Model/AppVarible'

export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'หน้าหลัก',
    //headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    //drawerLabel: 'Notification',

    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../pics/temp1.png')}
        style={styles.icon}
      />
    ),

  })
  /*
  static navigationOptions = ({navigation}) => ({
      title: 'Main',
      headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
     
  })
  */

  render() {
    const { navigate } = this.props.navigation;
    const { deviceSize:{deviceHeight, deviceWidth}, photoUrl, name } = this.props.screenProps
    if (deviceHeight < deviceWidth) {
      var profile_height = 7 / 20 * deviceHeight
      var profile_width = 7 / 20 * deviceHeight
    } else {
      var profile_height = 1 / 2 * deviceWidth
      var profile_width = 1 / 2 * deviceWidth
    }
    return (
      <View style={styles.container}>
        <DrawerHeader drawerNavigate={navigate} deviceHeight={deviceHeight} />
        <View style={styles.page}>

          <View style={[styles.top, { width: deviceWidth, }]} >
            <Image source={require('../../pics/background1.png')}
              style={{
                flex: 1,
                width: deviceWidth
              }}
            />
          </View>

          <View style={styles.bot} />

          <View style={[styles.popUp, { width: deviceWidth }]}>
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
            <Text style={{ marginTop: 1 / 20 * deviceHeight, fontSize: 1 / 20 * deviceHeight }} > {name} </Text>
          </View>

          {/*{JSON.stringify(this.props.screenProps)}*/}
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
    position: 'relative',
    marginTop: 25
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1
  },
  icon: {
    width: 24,
    height: 24,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2
  },
  bot: {
    flex: 1
  },
  popUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10
  }
});



