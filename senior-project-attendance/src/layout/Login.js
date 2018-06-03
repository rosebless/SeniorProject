import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Expo from 'expo';
import firebase from '../config/firebase'
import CustomButton from './CustomButton'

export default class Login extends React.Component {
  state = {
    uploading: false
  }
  async signInWithGoogleAsync() {
    this.setState({ uploading: true }, async () => {
      try {
        await Expo.Google.logInAsync({
          androidClientId: '243837215464-0ub9tf8fnmi1906bjdptu7r5186st296.apps.googleusercontent.com',
          iosClientId: '243837215464-nhmsscljmnsrgpo2ln8fp0sgn75vnf5b.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        }).then((result) => {
          console.log('result.type', result.type)
          if (result.type === 'success') {
            // const credential =  firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken); 
            const { email, photoUrl } = result.user
            // this.setState({ uploading: true }, () => {
            this.checkToSignIn(email, photoUrl)
            console.log(result.accessToken)
            return result.accessToken;
            // })
            //return firebase.auth().signInWithCredential(credential)
          } else {
            return { cancelled: true };
          }
        }
        ).catch(() => this.setState({ uploading: false }))
      } catch (e) {
        return { error: true };
      }
    })
  }
  checkToSignIn = async (email, photoUrl) => {
    // console.log(this.props)
    const professorID = email
    console.log('professorID', professorID)
    firebase.database().ref('/Professor').on('value', snapshot => {
      const result = snapshot.val()
      const professorKey = Object.keys(result).filter(key => result[key].professorID == professorID)[0]
      const currentUser = professorKey ? (result[professorKey].name ? result[professorKey] : { name: '' }) : { name: '' }
      console.log('professorKey', professorKey)
      console.log('currentUser', currentUser)
      const { navigate } = this.props.navigation
      const { setUserLogOn, changeActivateStatus } = this.props.screenProps
      if (currentUser.name.trim() !== '') { // มี user นี้ในระบบรึยัง 
        console.log('currentUser true')
        setUserLogOn({
          professorKey,
          photoUrl,
          name: currentUser.name,
          professorID: currentUser.professorID
        })
        changeActivateStatus(0)
        navigate('DrawerNavigator')
      } else {
        console.log('currentUser flase')
        const { key } = professorKey ? { key: professorKey } : firebase.database().ref('/Professor').push({ photoUrl, professorID })
        console.log('key', key)
        setUserLogOn({
          professorKey: key,
          photoUrl,
          professorID
        })
        navigate('Register')
      }
      this.setState({ uploading: false })
    })
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
    const { navigate } = this.props.navigation;
    const { deviceHeight, deviceWidth } = this.props.screenProps.deviceSize
    return (
      <View style={styles.container}>
        <View style={[styles.logo, {
          height: 0.5 * deviceHeight,
          width: deviceWidth,
          marginTop: 1 / 20 * deviceHeight
        }]}>
          <Image source={require('../pics/logo.png')} style={{ height: 8 / 21 * deviceHeight, width: 8 / 21 * deviceHeight }} />
        </View>
        {/*<Text> {Dimensions.get('window').height} {Dimensions.get('window').width} </Text>
        <Text> {deviceHeight} {deviceWidth} </Text>*/}
        <View style={[styles.form, {
          height: 3 / 20 * deviceHeight,
          width: deviceWidth,
          marginTop: 1 / 20 * deviceHeight
        }]}>
          <CustomButton onPress={() => { this.signInWithGoogleAsync() }}
            style={{
              height: 1 / 10 * deviceHeight,
              width: 0.6 * deviceWidth,
            }}
            text={'เข้าสู่ระบบ'}
          />
          {/* <TouchableOpacity  style={[styles.loginButton, {
            height: 1 / 10 * deviceHeight,
            width: 0.6 * deviceWidth,
            borderRadius: 1 / 3 * 1 / 10 * deviceHeight
          }]} >
            <Text style={[styles.loginButtonText, {
              fontSize: 1 / 15 * deviceHeight,
              paddingVertical: 1 / 50 * deviceHeight
            }]} >
              เข้าสู่ระบบ
                </Text>
          </TouchableOpacity> */}
        </View>
        {/* <Button title='By Pass' onPress={() => {
          console.log('login', this.props.navigation)
          this.props.screenProps.setUserLogOn({
            professorKey: 'efyhgwbkjnew',
            photoUrl: 'https://lh3.googleusercontent.com/-xu7Nwou87BY/AAAAAAAAAAI/AAAAAAAAHT4/HvL_EeTHvss/photo.jpg',
            name: 'ธนิสรณ์ ค้าผลดี',
            professorID: 'sw.thanisorn2@gmail.com'
          })
          navigate('DrawerNavigator')
        }} /> */}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 25
  },
  logo: {
    //backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: '#ffb',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#0070C0'
  },
  loginButtonText: {
    //flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

