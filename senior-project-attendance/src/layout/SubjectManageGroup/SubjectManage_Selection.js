import React from 'react';
import { View } from 'react-native';

export default class subjectManage_Selection extends React.Component {
  componentDidMount = () => {
    this.props.screenProps.setDescriptionForSelector('รายวิชา', require('../../pics/manageSubjectPage.png'), 'Manager')
    this.props.navigation.navigate('Selector')
  }
  render() {
    console.log('subjectManage_Selection', this.props)
    return (
      <View />
    );
  }
}
