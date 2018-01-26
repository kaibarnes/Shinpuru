import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const Translation = props => {
  const { kanji, reading } = props;
  const { container, kanjiStyle, readingStyle } = styles;
  return (
    <View style={container}>
      <Text style={kanjiStyle}>{kanji}</Text>
      <Text style={readingStyle}>{reading}</Text>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center'
  },
  kanjiStyle: {
    color: '#f5f5f5',
    fontSize: 50
  },
  readingStyle: {
    color: '#f5f5f5',
    fontSize: 20
  }
};

export default Translation;
