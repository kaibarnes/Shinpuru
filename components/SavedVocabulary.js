import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  Text,
  FlatList,
  Dimensions
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
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <Card style={styles.cardStyles}>
                <CardSection style={styles.englishContainer}>
                  <Text style={styles.englishStyle}>{item.wordSearched}</Text>
                </CardSection>
                <CardSection style={styles.japaneseContainer}>
                  <Text style={styles.japaneseStyle}>{item.kanji}</Text>
                </CardSection>
                <CardSection style={styles.japaneseContainer}>
                  <Text style={styles.japaneseStyle}>{item.reading}</Text>
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

const deviceWidth = Dimensions.get('window').width;
const cardMargin = deviceWidth / 80;
const cardWidth = (deviceWidth - cardMargin * 6) / 3;

const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: '#334d5c',
    flex: 1
  },
  cardStyles: {
    width: cardWidth,
    marginHorizontal: cardMargin
  },
  englishContainer: {
    justifyContent: 'center'
  },
  englishStyle: {
    fontSize: 18
  },
  japaneseContainer: {
    justifyContent: 'center'
  },
  japaneseStyle: {
    fontSize: 15
  }
});

export default SavedVocabulary;
