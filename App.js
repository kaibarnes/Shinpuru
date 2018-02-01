import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import SavedVocabulary from './components/SavedVocabulary';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  SavedVocabulary: {
    screen: SavedVocabulary,
    navigationOptions: {
      headerTitle: 'Saved Vocabulary'
    }
  }
});

export default RootNavigator;
