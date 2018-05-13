import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class ButtonSet extends React.Component {
  render() {
    const { deviceSize: { deviceHeight, deviceWidth }, text, navigate, updateTimeOnFirebase } = this.props
    return (
      <View style={[styles.container, {
        width: 0.75 * deviceWidth
      }]} >
        <View style={{
          height: 1 / 15 * deviceHeight,
          // right: 1 / 20 * deviceWidth,
          // bottom: 1.5 / 20 * deviceHeight
        }} >
          <Text style={{
            fontSize: 1 / 30 * deviceHeight
          }} >
            {text + ' : '}
          </Text>
        </View >
        <TouchableOpacity onPress={() => { navigate('TimePicker', { timeText: text, updateTimeOnFirebase }) }} style={[styles.button, {
          height: 1 / 15 * deviceHeight,
          width: 0.5 * deviceWidth,
          // right: 1 / 20 * deviceWidth,
          // bottom: 1.5 / 20 * deviceHeight,
          borderRadius: 1 / 3 * 1 / 15 * deviceHeight
        }]} >
          <Image
            source={require('../../../pics/temp6.png')}
            style={{
              left: 1 / 15 * 0.3 * deviceHeight,
              height: 1 / 15 * 0.8 * deviceHeight,
              width: 1 / 15 * 0.8 * deviceHeight,
              marginVertical: 1 / 15 * 0.1 * deviceHeight
            }} />
          <Text style={[styles.buttonText, {
            flex: 1, justifyContent: 'center',
            fontSize: 1 / 30 * deviceHeight
          }]} >
            เลือกเวลา
                </Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#0070C0' #EDEDED
    backgroundColor: '#EDEDED'
  },
  buttonText: {
    //flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    // color: '#FFFFFF', 
  },
  icon: {
    width: 24,
    height: 24,
  },
});


