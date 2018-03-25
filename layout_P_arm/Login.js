import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';

export default class Login extends React.Component {
  
  static navigationOptions = ({navigation}) => ({
      title: 'Login'
    })
    
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
            <Image source={require('../icon/logo.png')}  style={{ height: 8/21*deviceHeight, width: 320/367*8/21*deviceHeight }} />
        </View>

        <View style={styles.form}>
          <Text>asdsadas{deviceWidth}</Text>
          <Button title='Log in' onPress={() => navigate('NM')} />
        </View>
      </View>
    );
  }
}

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  logo: {
    flex: 10,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
  },
  form: {
    flex: 11,
    justifyContent: 'center',
    backgroundColor: '#ffb',
  }
});


