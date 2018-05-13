import React from 'react';
import { View, Dimensions } from 'react-native';
import NavigatorLogin from './src/layout/NavigatorLogin'; 
import TimePicker from './src/layout/mainNavigator/subjectNavigator/TimePicker'

export default class App extends React.Component {
  state = {
    deviceSize: {
      deviceHeight: Dimensions.get('window').height,
      deviceWidth: Dimensions.get('window').width
    }
  }
  render() {
    return (
      <NavigatorLogin deviceSize={this.state.deviceSize} />
      // <View>
      // <TimePicker deviceSize={this.state.deviceSize} /> 
      // </View>
    );
  }
}

