import React from 'react';
import { View } from 'react-native';

export default class Scanning_Selection extends React.Component {
  componentWillMount = () => {
    this.props.screenProps.setDescriptionForSelector('เช็คชื่อ', require('../../pics/scanningPage.png'), 'ScannerNavigator')
    this.props.navigation.navigate('Selector')
  }
  render() {
    return (
      <View />
    );
  }
}
