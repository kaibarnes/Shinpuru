import React from 'react';
import { Text, View } from 'react-native';

const Translation = props => {
  const { kanji, reading } = props;
  const { container, kanjiStyle, readingStyle } = styles;
  return (
    <View style={container}>
      <Text style={readingStyle}>{reading}</Text>
      <Text style={kanjiStyle}>{kanji}</Text>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center'
  },
  kanjiStyle: {
    fontSize: 100
  },
  readingStyle: {
    fontSize: 30
  }
};

export default Translation;
