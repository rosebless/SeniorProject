import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import DrawerHeader from './DrawerGroup/DrawerHeader';
import firebase from '../config/firebase'

export default class MainPage extends React.Component {
  render() {
    const { openDrawer } = this.props.navigation
    const { deviceSize: { deviceHeight, deviceWidth }, userLogOn: { photoUrl, name } } = this.props.screenProps
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
        <View style={[styles.top, { height: 0.4 * deviceHeight - 25, width: deviceWidth }]} >
          <Image source={require('../pics/background.png')}
            style={{
              flex: 1,
              width: deviceWidth
            }}
          />
        </View>
        <View style={[styles.popUp, { marginTop: 25, height: deviceHeight - 25, width: deviceWidth }]}>
          <Image
            source={{ uri: photoUrl }}
            style={{
              height: profile_height,
              width: profile_width,
              borderRadius: 1 / 2 * profile_height
            }}
          />
          <Text style={{
            marginTop: 1 / 20 * deviceHeight,
            fontSize: 1 / 15 * deviceHeight,
            paddingVertical: 1 / 40 * deviceHeight
          }} >
            {name}
          </Text>
        </View>
        {/*{JSON.stringify(this.props.screenProps)}*/}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    position: 'relative',
    marginTop: 25,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  icon: {
    width: 24,
    height: 24,
  },
  top: {
    justifyContent: 'center',
  },
  popUp: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  }
});



