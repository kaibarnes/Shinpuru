import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, title }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    height: 40,
    backgroundColor: '#5cb85c',
    justifyContent: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
};

export { Button };
