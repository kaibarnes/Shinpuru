import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, title, style }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    height: 40,
    backgroundColor: '#5cb85c',
    justifyContent: 'center',
    marginVertical: 10,
    width: 160,
    alignSelf: 'center',
    borderRadius: 20
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
};

export default Button;
