import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  Text,
  FlatList
} from 'react-native';
import { Card } from './Card';
import { CardSection } from './CardSection';

class SavedVocabulary extends Component {
  constructor() {
    super();
    this.state = { vocabularyList: null };

    this.renderVocabulary = this.renderVocabulary.bind(this);
  }
  componentDidMount() {
    const { vocabularyList } = this.props.navigation.state.params;
    if (vocabularyList !== this.state.vocabularyList) {
      this.setState({ vocabularyList: JSON.parse(vocabularyList) });
    }
  }
  renderVocabulary() {
    if (this.state.vocabularyList) {
      const vocabularyList = this.state.vocabularyList;
      return (
        <FlatList
          data={vocabularyList}
          keyExtractor={item => item.reading}
          renderItem={({ item }) => {
            return (
              <Card>
                <CardSection>
                  <Text>{item.wordSearched}</Text>
                </CardSection>
                <CardSection>
                  <Text>{item.kanji}</Text>
                </CardSection>
                <CardSection>
                  <Text>{item.reading}</Text>
                </CardSection>
              </Card>
            );
          }}
        />
      );
    }
  }

  render() {
    return <View style={styles.appStyle}>{this.renderVocabulary()}</View>;
  }
}

const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: '#334d5c',
    flex: 1
  }
});

export default SavedVocabulary;
