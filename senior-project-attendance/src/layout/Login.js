import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import AppVarible from '../Model/AppVarible'
//import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import Expo from 'expo';
import _ from 'lodash'
import firebase from '../config/firebase'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    // const { deviceSize: { deviceHeight, deviceWidth } } = AppVarible.appVarible
    this.state = {
      // deviceHeight,
      // deviceWidth,
      // userLogOn: {
      //   email: '',
      //   picUrl: ''
      // }
    }
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login'
  })

  testGoogleSignIn = () => {
    // GoogleSignin.signIn()
    //   .then((data) => {
    //     // Create a new Firebase credential with the token
    //     const credential = AppVarible.appVarible.firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    //     // Login with the credential
    //     return AppVarible.appVarible.firebase.auth().signInWithCredential(credential);
    //   })
    //   .then((user) => {
    //     // If you need to do anything with the user, do it here
    //     // The user will be logged in automatically by the
    //     // `onAuthStateChanged` listener we set up in App.js earlier
    //   })
    //   .catch((error) => {
    //     const { code, message } = error;
    //     // For details of error codes, see the docs
    //     // The message contains the default Firebase string
    //     // representation of the error
    //   });
  }

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
    console.log(this.props)
    const { navigate } = this.props.navigation
    navigate('NM', {
      professorID: '' ,
      photoUrl: '' ,
      name:  '' ,
      phone: ''
    })
    // const professorID = email
    // console.log('professorID', professorID)
    // const currentUser = await this.getCurrentUser(professorID)
    // // this.getCurrentUser(professorID)
    // console.log('currentUser', currentUser)
    // console.log('currentUser', currentUser)
    // const { navigate } = this.props.navigation
    // if (currentUser) { // มี user นี้ในระบบรึยัง 
    //   console.log('currentUser true')
      // const subjects = this.getData(currentUser.subjects) 
      // navigate('NM', {
      //   professorID: '' ,
      //   photoUrl: '' ,
      //   name:  '' ,
      //   phone: ''
      // })
    //   this.props.navigation.push('NM', {
    //       professorID: '' ,
    //       photoUrl: '' ,
    //       name:  '' ,
    //       phone: ''
    //     })
    // } else {
    // //   console.log('currentUser flase')
    // //   firebase.database().ref('User').push({
    // //     photoUrl,
    // //     professorID
    // //   })
    // //   // AppVarible.setLogOn('picUrl', picUrl)
    // //   // AppVarible.setLogOn('email', email)
    // //   navigate('NM', {
    // //     professorID,
    // //     photoUrl
    // //   })
    // }
  }

  getCurrentUser(professorID){
   return new Promise((resolve, reject) => {
    console.log('professorID', professorID)

    firebase.database().ref('/Professor').once('value', snapshot => {
      console.log('result', snapshot.val()) 
      const result = snapshot.val()
      console.log('professor', result) 
      const user = result && Object.keys(result).map( key => result[key] ).filter( user => user.professorID == professorID )[0] 
      resolve(user); 
    }).catch((e)=> console.log(e) )
  })
}

  getData(values) { // { [] } => [{}]
    let dataVal = values;
    // ไม่ค่อยเข้าใจ (ที่พี่ลัชสอนในห้อง)
    let data = _(dataVal)
      .keys()
      .map(dataKey => {
        let cloned = _.clone(dataVal[dataKey]);
        cloned.key = dataKey;
        return cloned;
      }).value();
    return data
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
          navigate('NM', {
            professorID: 'swthanisorn2@gmailcom',
            photoUrl: 'https://lh3.googleusercontent.com/-xu7Nwou87BY/AAAAAAAAAAI/AAAAAAAAHT4/HvL_EeTHvss/photo.jpg',
            name: 'ธนิสรณ์ ค้าผลดี',
            phone: '0804515666',
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

