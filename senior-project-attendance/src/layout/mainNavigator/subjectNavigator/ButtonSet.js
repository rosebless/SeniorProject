import React, { Component } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';

export default class ButtonSet extends React.Component {
  render() {
    const { text } = this.props
    return (
          <View style={styles.container} >
            <Text style={{
              fontSize: 1 / 20 * deviceHeight
            }} >
              {text}
            </Text>
            <TouchableOpacity onPress={() => { }} style={[styles.summitButton, {
              height: 1 / 20 * deviceHeight,
              width: 1 / 3 * deviceWidth,
              right: 1 / 20 * deviceWidth,
              bottom: 1.5 / 20 * deviceHeight,
              borderRadius: 1 / 3 * 1 / 10 * deviceHeight
            }]} >
              <Text style={[styles.summitButtonText, {
                fontSize: 1 / 30 * deviceHeight
              }]} >
                เลือกเวลาเรียน
                </Text>
            </TouchableOpacity>
          </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070C0'
  },
  buttonText: {
    //flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
});


