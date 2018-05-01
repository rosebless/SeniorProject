import React from 'react';
import { Dimensions } from 'react-native';
import NavigatorLogin from './src/layout/NavigatorLogin';

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
    );
  }
}

