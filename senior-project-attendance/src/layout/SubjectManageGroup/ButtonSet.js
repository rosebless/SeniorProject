import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class ButtonSet extends React.Component {
  render() {
    const { deviceSize: { deviceHeight, deviceWidth }, btext, text, navigate, updateTimeOnFirebase } = this.props
    return (
      <View style={[styles.container, {
        width: 0.75 * deviceWidth
      }]} >
        <View style={{
          height: 1 / 15 * deviceHeight,
          justifyContent: 'center'
        }} >
          <Text style={{
            fontSize: 1 / 20 * deviceHeight,
            paddingVertical: 1 / 60 * deviceHeight
          }} >
            {text + ' : '}
          </Text>
        </View >
        <TouchableOpacity onPress={() => { navigate('TimePicker', { timeText: text, btext, updateTimeOnFirebase }) }} style={[styles.button, {
          height: 1 / 15 * deviceHeight,
          width: 0.5 * deviceWidth,
          borderRadius: 1 / 3 * 1 / 15 * deviceHeight
        }]} >
          <Image
            source={require('../../pics/clock.png')}
            style={{
              left: 1 / 15 * 0.3 * deviceHeight,
              height: 1 / 15 * 0.8 * deviceHeight,
              width: 1 / 15 * 0.8 * deviceHeight,
              marginVertical: 1 / 15 * 0.1 * deviceHeight
            }} />
          <Text style={[styles.buttonText, {
            flex: 1, justifyContent: 'center',
            fontSize: 1 / 20 * deviceHeight,
            paddingVertical: 1 / 60 * deviceHeight
          }]} >
            {btext}
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
    alignItems: 'center',
    backgroundColor: '#EDEDED'
  },
  buttonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});


