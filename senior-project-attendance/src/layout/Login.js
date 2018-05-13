import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Expo from 'expo';
import firebase from '../config/firebase'

export default class Login extends React.Component {
  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '243837215464-0ub9tf8fnmi1906bjdptu7r5186st296.apps.googleusercontent.com',
        iosClientId: '243837215464-nhmsscljmnsrgpo2ln8fp0sgn75vnf5b.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log('result.type', result.type)
      if (result.type === 'success') {
        // const credential =  firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken); 
        const { email, photoUrl } = result.user
        this.checkToSignIn(email, photoUrl)
        return result.accessToken;
        //return firebase.auth().signInWithCredential(credential)
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  checkToSignIn = async (email, photoUrl) => {
    // console.log(this.props)
    const professorID = email
    console.log('professorID', professorID)
    firebase.database().ref('/Professor').once('value', snapshot => {
      const result = snapshot.val()
      const professorKey = Object.keys(result).filter(key => result[key].professorID == professorID)[0]
      const currentUser = professorKey ? (result[professorKey].name ? result[professorKey] : { name: '' }) : { name: '' }
      console.log('professorKey', professorKey)
      console.log('currentUser', currentUser)
      const { navigate } = this.props.navigation
      if (currentUser.name.trim() !== '') { // มี user นี้ในระบบรึยัง 
        console.log('currentUser true')
        navigate('NMain', {
          professorKey,
          photoUrl,
          name: currentUser.name
        })
      } else {
        console.log('currentUser flase')
        const { key } = professorKey ? { key: professorKey } : firebase.database().ref('/Professor').push({ photoUrl, professorID })
        console.log('key', key)
        navigate('Register', {
          professorKey: key,
          photoUrl
        })
      }
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    const { deviceHeight, deviceWidth } = this.props.screenProps.deviceSize 
    return (
      <View style={styles.container}>
        <View style={[styles.logo, {
          height: 0.5 * deviceHeight,
          width: deviceWidth
        }]}>
          <Image source={require('../pics/logo.png')} style={{ height: 8 / 21 * deviceHeight, width: 320 / 367 * 8 / 21 * deviceHeight }} />
        </View>
        {/*<Text> {Dimensions.get('window').height} {Dimensions.get('window').width} </Text>
        <Text> {deviceHeight} {deviceWidth} </Text>*/}
        <View style={styles.form}>
          <TouchableOpacity onPress={() => { this.signInWithGoogleAsync() }} style={[styles.loginButton, {
            height: 1 / 10 * deviceHeight,
            width: 0.6 * deviceWidth,
            borderRadius: 1 / 3 * 1 / 10 * deviceHeight
          }]} >
            <Text style={[styles.loginButtonText, {
              fontSize: 1 / 20 * deviceHeight
            }]} >
              เข้าสู่ระบบ
                </Text>
          </TouchableOpacity>
        </View>
        <Button title='By Pass' onPress={() => {
          console.log('login', this.props.navigation)
          navigate('NMain', {
            professorKey: 'efyhgwbkjnew',
            photoUrl: 'https://lh3.googleusercontent.com/-xu7Nwou87BY/AAAAAAAAAAI/AAAAAAAAHT4/HvL_EeTHvss/photo.jpg',
            name: 'ธนิสรณ์ ค้าผลดี'
          })
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  logo: {
    //backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
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

