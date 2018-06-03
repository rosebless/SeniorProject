import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class CustomButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[this.props.style, {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0070C0',
                borderRadius: 1 / 3 * this.props.style.height
            }]} >
                <Text style={{
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 10 / 15 * this.props.style.height,
                    paddingTop: 10 / 40 * this.props.style.height,
                    paddingBottom: 10 / 60 * this.props.style.height
                }} >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

